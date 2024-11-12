<?php

namespace App\Http\Controllers;

use App\Models\Deliverable;
use App\Models\Project;
use Illuminate\Http\Request;

class DeliverableController extends Controller
{
    public function store(Request $request, Project $project) {
        // TODO: Email project owner
    }

    public function destroy(Request $request, Deliverable $deliverable) {

    }
}
