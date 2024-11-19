<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;

class SubscriptionController extends Controller
{
    public function index(Request $request){
        $organization = $request->user()->organization;
        $subscription = $organization->subscription();
        $plan = $organization->plan;
        $isSubscribed = $organization->subscribed();
        $isPaused = $organization->subscribed() && $subscription->paused;
        $daysUntilEnd = $subscription ? $subscription->remainingDays : 0;
        $expires = $subscription && $subscription->ends_at ? $organization->subscription('default')->ends_at->format('M d, Y') : 0;
        $plans = Plan::all();

        return Inertia::render('Subscription/Subscription', [
            'organization' => $organization->load(['plan']),
            'subscription' => $subscription,
            'isSubscribed' => $isSubscribed,
            'isPaused' => $isPaused,
            'plan' => $plan,
            'daysUntilEnd' => $daysUntilEnd,
            'expires' => $expires,
            'plans' => $plans
        ]);
    }

    public function pause(Request $request) {
        $organization = $request->user()->organization;

        $subscription = $organization->subscription('default');

        if(!$subscription) {
            return redirect()->back()->withErrors([
                'message' => 'No subscription found.'
            ]);
        }

        if($subscription->paused()){
            return redirect()->back()->withErrors([
                'message' => 'Subscription is already paused.'
            ]);
        }

        $subscription->storeRemainingDays();

        $organization->stripe()->subscriptions->update(
            $subscription->stripe_id,
            [
                'pause_collection' => [
                    'behavior' => 'mark_uncollectible'
                ]
            ]
        );

        // TODO: Email admin

        $subscription->fill([
            'paused_on' => now()
        ])->save();

    }

    public function resume(Request $request) {
        try {
            $organization = $request->user()->organization;
            $subscription = $organization->subscription('default');

            if(!$subscription) {
                return redirect()->back()->withErrors([
                    'message' => 'No subscription found.'
                ]);
            }

            if(!$subscription->paused()) {
                return redirect()->back()->withErrors([
                    'message' => 'Subscription is not paused.'
                ]);
            }

            $subscription->storeRemainingDays();

            $organization->stripe()->subscriptions->update(
                $subscription->stripe_id,
                [
                    'pause_collection' => null
                ]
            );

            // TODO: Email admin

            $subscription->fill([
                'paused_on' => null
            ])->save();

        }
        catch(\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function createCheckoutSession(Request $request) {
        $organization = $request->user()->organization;

        $session = $organization
                    ->newSubscription('default', $request->price_id)
                    ->checkout([
                        'success_url' => route('subscription.index'),
                        'cancel_url' => route('subscription.index'),
                    ]);

        return response()->json([
            'url' => $session->url
        ]);
    }

    public function manageBilling(Request $request) {
       $organization = $request->user()->organization;


        return $organization->redirectToBillingPortal(route('subscription.index'));

    }
}
