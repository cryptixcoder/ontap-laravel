<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request){
        $organization = $request->user()->organization;
        $plan = $organization->plan;
        $isSubscribed = $organization->subscribed('default');
        $isPaused = $organization->subscribed() && $organization->subscription('default')->paused();
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
        $result = collect($groupedTasks)->map(function ($tasks, $status) {
            return [
                'id' => $status,
                'title' => $status,
                'tasks' => $tasks
            ];
        })->values()->toArray();

        return Inertia::render('Task/Tasks', [
            'tasks' => $result,
            'isSubscribed' => $isSubscribed,
            'isPaused' => $isPaused,
            'plan' => $plan
        ]);
    }

    public function edit(Task $task) {
        return Inertia::render('Task/ViewTask', [
            'task' => $task->load('comments.user', 'attachments')
        ]);
    }

    public function store(Request $request) {
        $user = $request->user();

        $organization = $user->organization;

        $lastTask = $organization->tasks()->orderBy('position', 'asc')->first();

        $position = $lastTask ? $lastTask->position + 1 : 1;

        $task = $organization->tasks()->create([
            'user_id' => $user->id,
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status,
            'position' => $position,
        ]);

        // TODO: send slack notification

        return to_route('task.index');
    }

    public function updatePosition(Task $task, Request $request) {
        $task->update([
            'status' => $request->status,
            'position' => $request->position
        ]);

        if($request->admin) {
            return to_route('admin.customer.task.show',[
                'organization' => $task->organization_id,
                'task' => $task->id
            ]);
        }

        return to_route('task.index');
    }

    public function update(Task $task, Request $request) {
        $task->update([
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status ? $request->status : $task->status
        ]);

        return to_route('task.edit', ['task' => $task]);
    }

    public function delete(Task $task) {
        $task->delete();

        return to_route('task.index');
    }
}
