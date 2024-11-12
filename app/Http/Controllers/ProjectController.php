<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Project;
use Carbon\Carbon;
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

                // TODO: Email admin

                return to_route('project.index');
            }
        }


        $user = $request->user();
        $organization = $user->organization;

        $projects = $organization->projects()->where('stripe_status', 'complete')->get();
        $categories = ProductCategory::with('products')->get();

        return Inertia::render('Project/Projects', [
            'projects' => $projects,
            'categories' => $categories
        ]);
    }

    public function show(Project $project) {
        return Inertia::render('Project/ViewProject', [
            'project' => $project->load(['product.questions', 'attachments', 'deliverables', 'comments', 'responses.question'])
        ]);
    }

    public function checkout(Request $request) {
        $organization = $request->user()->organization;

        $session = $organization->checkout($request->priceId, [
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

        $now = Carbon::now();
        $deliveryDate = $now->addWeeks(2);

        $project->update([
            'title' => $validated['title'],
            'status' => 'In Progress',
            'delivery_at' => $deliveryDate
        ]);

        return redirect()->back();
    }
}
