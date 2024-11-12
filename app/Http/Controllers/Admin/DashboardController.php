<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::where('assigned_user_id', auth()->user()->id)->get();

        return Inertia::render('Admin/Dashboard', [
            'projects' => $projects
        ]);
    }

    public function getMRRData(Request $request) {
        $days = $request->input('days', 30);
        $endDate = Carbon::now();
        $startDate = Carbon::now()->subDays($days);

        // Get daily MRR by joining subscriptions with organizations and plans
        $mrrData = Subscription::query()
            ->join('organizations', 'subscriptions.organization_id', '=', 'organizations.id')
            ->join('plans', 'organizations.plan_id', '=', 'plans.id')
            ->where('subscriptions.stripe_status', 'active')
            ->whereBetween('subscriptions.created_at', [$startDate, $endDate])
            ->select(
                DB::raw('DATE(subscriptions.created_at) as date'),
                DB::raw('SUM(plans.price) as mrr')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                // Convert cents to dollars
                $item->mrr = $item->mrr;
                return $item;
            });

        // Fill in missing dates with previous MRR value or 0
        $filledData = [];
        $currentDate = $startDate->copy();
        $lastMRR = 0;

        // Get initial MRR from subscriptions created before start date
        $initialMRR = Subscription::query()
            ->join('organizations', 'subscriptions.organization_id', '=', 'organizations.id')
            ->join('plans', 'organizations.plan_id', '=', 'plans.id')
            ->where('subscriptions.stripe_status', 'active')
            ->where('subscriptions.created_at', '<', $startDate)
            ->select(
                DB::raw('SUM(plans.price) as mrr')
            )
            ->first()
            ->mrr ?? 0;

        $lastMRR = $initialMRR;

        while ($currentDate <= $endDate) {
            $dateStr = $currentDate->format('Y-m-d');
            $dayData = $mrrData->firstWhere('date', $dateStr);

            // If we have new subscriptions for this day, add them to the running total
            if ($dayData) {
                $lastMRR += $dayData->mrr;
            }

            $filledData[] = [
                'date' => $dateStr,
                'mrr' => round($lastMRR, 2)
            ];

            $currentDate->addDay();
        }

        return response()->json($filledData);
    }
}
