<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ImpersonateController extends Controller
{
    public function impersonate(Request $request, User $user) {
        if(!$request->user()->can('impersonate-users')) {
            abort(403);
        }

        $request->session()->put('impersonate', $user->id);

        return redirect()->route('task.index');
    }

    public function stopImpersonation(Request $request) {
        $request->session()->forget('impersonate');

        return redirect()->route('admin.dashboard.index');
    }
}
