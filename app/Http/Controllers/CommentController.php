<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request) {
        if($request->type === "task") {
            $task = Task::find($request->id);

            $task->comments()->create([
                'user_id' => $request->user()->id,
                'organization_id' => $request->user()->organization->id,
                'content' => $request->comment
            ]);

            // TODO: Email task owner

            return to_route('task.edit', ['task' => $task]);
        }
        else if ($request->type === "project") {
            $project = Project::find($request->id);

            $project->comments()->create([
                'user_id' => $request->user()->id,
                'organization_id' => $request->user()->organization->id,
                'content' => $request->comment
            ]);

            // TODO: Email project owner

            return to_route('project.show', ['project' => $project]);
        }
    }
}
