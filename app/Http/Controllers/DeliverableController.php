<?php

namespace App\Http\Controllers;

use App\Models\Deliverable;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeliverableController extends Controller
{
    public function store(Request $request, Project $project) {

        if ($request->hasFile('deliverable')) {
            $file = $request->file('deliverable');
            $filename = $file->getClientOriginalName();

            $path = $file->storePublicly('deliverables', 's3');

            $project->deliverables()->create([
                'name' => $filename,
                'url' => Storage::disk('s3')->url($path),
                'storage_url' => $path
            ]);

            to_route('admin.customer.project.show', [
                'project' => $project->id,
                'organization' => $project->organization_id
            ]);
        }

        // TODO: Email project owner
    }

    public function destroy(Request $request, Deliverable $deliverable) {
        $project = $deliverable->deliverable;

        $deliverable->delete();

        to_route('admin.customer.project.show', [
            'project' => $project->id,
            'organization' => $project->organization_id
        ]);
    }
}
