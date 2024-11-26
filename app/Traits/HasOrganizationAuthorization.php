<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait HasOrganizationAuthorization {
    public function share(Request $request, $with = []) {
        $user = auth()->user();
        $organization = $user->organization;

        return array_merge($with, [
            'isAdmin' => $user->isAdminOf($organization),
            'isCollaborator' => $user->isCollaboratorOf($organization)
        ]);
    }
}
