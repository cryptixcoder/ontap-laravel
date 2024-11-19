<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Customer/Customers', [
            'organizations' => Organization::all()->load(['plan', 'owner'])
        ]);
    }
    public function show(Request $request, Organization $organization)
    {
        $subscription = $organization->subscription();
        $isSubscribed = $organization->subscribed();
        $isPaused = $subscription ? $subscription->paused : false;
        $daysUntilEnd = $subscription ? $organization->subscription('default')->remainingDays : 0;
        $projects = $organization->projects()->where('stripe_status', 'complete')->get();

        return Inertia::render('Admin/Customer/ViewCustomer', [
            'organization' => $organization->load([
                'plan',
                'owner',
                'users',
                'projects',
            ]),
            'projects' => $projects,
            'isSubscribed' => $isSubscribed,
            'isPaused' => $isPaused,
            'daysUntilEnd' => $daysUntilEnd,
            'subscription' => $subscription
        ]);
    }

    public function tasks(Request $request, Organization $organization) {
        $tasks = $organization->tasks()->orderBy('position', 'asc')->get();
        $initialStatuses = ["Not Started", "To Do", "Awaiting Feedback", "Revisions Needed", "Done"];

        // Create an empty array grouped by statuses
        $groupedTasks = collect($initialStatuses)->mapWithKeys(function ($status) {
            return [$status => []];
        })->toArray();

        // Group tasks by their status
        foreach ($tasks as $task) {
            if (!isset($groupedTasks[$task->status])) {
                $groupedTasks[$task->status] = [];
            }
            $groupedTasks[$task->status][] = $task;
        }

        // Convert grouped tasks into the required structure
        $results = collect($groupedTasks)->map(function ($tasks, $status) {
            return [
                'id' => $status,
                'title' => $status,
                'tasks' => $tasks
            ];
        })->values()->toArray();


        return Inertia::render('Admin/Customer/Tasks', [
            'tasks' => $results,
            'organization' => $organization->load([
                'plan',
            ]),
        ]);
    }

    public function viewTask(Request $request, Organization $organization, Task $task)
    {
        return Inertia::render('Admin/Customer/ViewTask', [
            'task' => $task->load([
                'attachments',
                'comments.user',
            ]),
            'organization' => $organization->load([
                'plan',
            ]),
        ]);
    }

    public function project(Request $request, Organization $organization, Project $project)
    {
        $users = User::where('role', 'admin')->orWhere('role', 'contractor')->get();

        return Inertia::render('Admin/Customer/ViewProject', [
            'organization' => $organization->load([
                'plan',
                'owner',
                'users',
                'projects',
                'subscriptions'
            ]),
            'project' => $project->load(['product.questions', 'attachments', 'deliverables', 'comments', 'responses.question', 'assignedUser']),
            'users' => $users
        ]);
    }

    public function assigUser(Request $request, Organization $organization, Project $project) {
        $validated = $request->validate([
            'user_id' => 'required|string'
        ]);

        $project->update([
            'assigned_user_id' => $validated['user_id']
        ]);

        return redirect()->back();
    }
}
