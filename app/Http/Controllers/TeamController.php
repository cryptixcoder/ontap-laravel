<?php

namespace App\Http\Controllers;

use App\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index(Request $request) {
        $user = $request->user();
        $organization = $user->organization;
        $members = $organization->users()->get();
        $invites = $organization->invites()->get();

        return Inertia::render('Team/Team', [
            'members' => $members,
            'invites' => $invites
        ]);
    }

    public function invite(Request $request) {
        $user = $request->user();
        $organization = $user->organization;

        $organization->invites()->create([
            'email' => $request->email,
            'role' => $request->role
        ]);

        return redirect()->back();
    }

    public function acceptInvite(Request $request, $token) {
        $invite = Invite::where('token', $token)->first();

        $organization = $invite->organization;

        $organization->users()->create([
            'name' => $request->name,
            'email' => $invite->email,
            'password' => Hash::make($request->password),
        ]);

        $invite->delete();

        return to_route('login');
    }

    public function removeInvite(Request $request, Invite $invite) {
        $invite->delete();

        return redirect()->back();
    }

    public function removeTeam() {

    }
}
