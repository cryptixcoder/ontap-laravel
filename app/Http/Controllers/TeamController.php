<?php

namespace App\Http\Controllers;

use App\Mail\TeamInvite;
use App\Models\Invite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
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

        $invite = $organization->invites()->create([
            'email' => $request->email,
            'role' => $request->role
        ]);

        Mail::to($request->email)
            ->send(new TeamInvite($organization, $organization->owner, route('team.accept-invite', $invite->token)));

        return redirect()->back();
    }

    public function viewInvite(Request $request, Invite $invite) {
        return Inertia::render('Team/ViewInvite', [
            'invite' => $invite->load('organization')
        ]);
    }


    public function acceptInvite(Request $request, Invite $invite) {
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $organization = $invite->organization;

        $newUser = $organization->users()->create([
            'name' => $request->name,
            'email' => $invite->email,
            'password' => Hash::make($request->password),
        ]);

        $organization->users()->updatePivot($newUser->id, ['role' => $invite->role]);

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
