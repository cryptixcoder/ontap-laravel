<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;

class SubscriptionController extends Controller
{
    public function index(Request $request){
        $organization = $request->user()->organization;
        $plan = $organization->plan;
        $isSubscribed = $organization->subscribed('default');
        $isPaused = $organization->subscribed() && $organization->subscription('default')->paused();
        $daysUntilEnd = $organization->subscription('default')->ends_at ? floor(Carbon::now()->diffInDays($organization->subscription('default')->ends_at, false)) : 0;
        $expires = $organization->subscription('default')->ends_at ? $organization->subscription('default')->ends_at->format('M d, Y') : 0;

        return Inertia::render('Subscription/Subscription', [
            'isSubscribed' => $isSubscribed,
            'isPaused' => $isPaused,
            'plan' => $plan,
            'daysUntilEnd' => $daysUntilEnd,
            'expires' => $expires
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

        $stripeSubscription = $organization->stripe()->subscriptions->update(
            $subscription->stripe_id,
            [
                'pause_collection' => [
                    'behavior' => 'mark_uncollectable'
                ]
            ]
        );

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
