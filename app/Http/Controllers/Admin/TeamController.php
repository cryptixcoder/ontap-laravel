<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index() {
        $users = User::whereIn('role', ['admin', 'contractor'])->get();

        return Inertia::render('Admin/Team/Team', [
            'users' => $users
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'role' => 'required'
        ]);

        $validated['password'] = Hash::make($validated['password']);


        $user = User::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'nullable|min:6',
            'role' => 'required'
        ]);

        if(isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return redirect()->back();
    }

    public function destroy(Request $request, User $user) {
        $user->delete();
    }
}
