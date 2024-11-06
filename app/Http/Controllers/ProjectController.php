<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request){

        if($request->has('session_id')) {
            $sessionId = $request->query('session_id');
            $existingProject = Project::where(['stripe_session_id' => $sessionId])->first();

            if($existingProject) {
                $existingProject->update([
                    'stripe_status' => 'complete'
                ]);

                return to_route('project.index');
            }
        }


        $user = $request->user();
        $organization = $user->organization;

        $projects = $organization->projects()->where('stripe_status', 'complete')->get();


        return Inertia::render('Project/Projects', [
            'projects' => $projects
        ]);
    }

    public function show(Project $project) {
        return Inertia::render('Project/ViewProject', [
            'project' => $project->load(['product.questions', 'attachments', 'deliverables', 'comments', 'responses.question'])
        ]);
    }

    public function checkout(Request $request) {
        $organization = $request->user()->organization;

        $session = $organization->checkout('price_0PVIu2SMqd8bI2qaCbyluxaW', [
            'success_url' => route('project.index').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('project.index')
        ]);

        if($session) {
            $project = $organization->projects()->create([
                'title' => 'Sprint Project',
                'stripe_session_id' => $session->id
            ]);
        }

        return Inertia::location($session->url);
    }

    public function onboard(Request $request, Project $project) {
        $validated = $request->validate([
            'title' => 'required',
            'responses' => 'required|array',
            'responses.*.questionId' => 'required|integer',
            'responses.*.response' => 'required',
        ]);

        foreach ($validated['responses'] as $responseData) {
            $project->responses()->create([
                'product_question_id' => $responseData['questionId'],
                'response' => $responseData['response'],
            ]);
        }

        $project->update([
            'title' => $validated['title'],
            'status' => 'In Progress',
        ]);

        return redirect()->back();
    }
}
