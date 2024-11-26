<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Project;
use App\Models\User;
use App\Notifications\NewSprint;
use App\Traits\HasOrganizationAuthorization;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    use HasOrganizationAuthorization;

    public function index(Request $request){

        if($request->has('session_id')) {
            $sessionId = $request->query('session_id');
            $existingProject = Project::where(['stripe_session_id' => $sessionId])->first();

            if($existingProject) {
                $existingProject->update([
                    'stripe_status' => 'complete'
                ]);

                $admin = User::where('email', 'markusgray@syncwaretech.com')->first();
                $admin->notify(new NewSprint($existingProject->organization, $existingProject));

                return to_route('project.index');
            }
        }


        $user = $request->user();
        $organization = $user->organization;

        $projects = $organization->projects()->where('stripe_status', 'complete')->get();
        $categories = ProductCategory::with('products')->get();

        return Inertia::render('Project/Projects', $this->share($request, [
            'projects' => $projects,
            'categories' => $categories
        ]));
    }

    public function show(Request $request, Project $project) {
        return Inertia::render('Project/ViewProject', $this->share($request, [
            'project' => $project->load(['product.questions', 'attachments', 'deliverables', 'comments', 'responses.question'])
        ]));
    }

    public function checkout(Request $request, Product $product) {
        $organization = $request->user()->organization;

        $session = $organization->checkout($product->stripe_price_id, [
            'success_url' => route('project.index').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('project.index')
        ]);

        if($session) {
            $organization->projects()->create([
                'title' => 'Sprint Project',
                'product_id' => $product->id,
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
        ], [
            'responses.*.response.required' => 'The response is required.',
            'title.required' => 'The project title is required.',
        ]);

        try {
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
        catch(\Exception $e) {
            return redirect()
                ->back()
                ->withErrors(['error' => 'An error occurred while saving your responses.'])
                ->withInput();
        }
    }
}
