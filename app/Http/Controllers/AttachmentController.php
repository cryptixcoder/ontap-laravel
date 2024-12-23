<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    public function store(Request $request) {
        if($request->type === "task") {
            $task = Task::find($request->id);

            if($request->hasFile('attachment')) {
                $file = $request->file('attachment');
                $filename = $file->getClientOriginalName();

                $path = $file->storePublicly('attachments', 's3');

                $task->attachments()->create([
                    'name' => $filename,
                    'url' => Storage::disk('s3')->url($path),
                    'storage_url' => $path
                ]);

                // TODO: add email to task

                to_route('task.edit', ['task' => $task]);
            }

        }
        else if ($request->type === "project") {
            $project = Project::find($request->id);

            if($request->hasFile('attachment')) {
                $file = $request->file('attachment');
                $filename = $file->getClientOriginalName();

                $path = $file->storePublicly('attachments', 's3');

                $project->attachments()->create([
                    'name' => $filename,
                    'url' => Storage::disk('s3')->url($path),
                    'storage_url' => $path
                ]);

                // TODO: add email to project

                to_route('project.show', ['project' => $project]);
            }
        }
    }

    public function destroy(Attachment $attachment) {
        if($attachment->attachable_type === "App\Models\Task") {
            $task = $attachment->attachable;

            $attachment->delete();

            to_route('task.edit', ['task' => $task]);
        }
        else if ($attachment->attachable_type === "App\Models\Project") {
            $project = $attachment->attachable;

            $attachment->delete();

            to_route('project.show', ['project' => $project]);
        }
    }
}
