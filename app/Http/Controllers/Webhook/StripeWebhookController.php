<?php

namespace App\Http\Controllers\Webhook;


use Laravel\Cashier\Http\Controllers\WebhookController;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Plan;
use App\Models\User;
use App\Notifications\NewSubscription;
use App\Notifications\SubscriptionStatusChanged;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends WebhookController
{
    protected function getAdminUser() {
        return User::where('email', 'markusgray@syncwaretech.com')->first();
    }

    /**
     * Handle customer subscription created.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleCustomerSubscriptionCreated(array $payload)
    {
        Log::debug("Customer Subscription Created");
        $response = parent::handleCustomerSubscriptionCreated($payload);

        Log::debug("Customer Subscription Created");

        $subscription = $payload['data']['object'];
        Log::debug($subscription['items']['data'][0]['price']['id']);
        $plan = Plan::where('stripe_price_id', $subscription['items']['data'][0]['price']['id'])->first();

        if($plan) {
            $organization = Organization::whereHas('subscriptions', function ($query) use ($subscription) {
                $query->where('stripe_id', $subscription['id']);
            })->first();

            if ($organization) {
                $organization->update(['plan_id' => $plan->id]);
            }
        }

        $this->notifyAdmins([
            'type' => 'created',
            'subscription_id' => $subscription['id'],
            'customer_email' => $organization->owner->email,
            'organization' => $organization->name,
            'plan' => $organization->plan->name,
            'status' => $subscription['status']
        ]);

        return $response;
    }

    /**
     * Handle customer subscription deleted.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleCustomerSubscriptionDeleted($payload)
    {
        Log::debug("Customer Subscription Deleted");
        $response = parent::handleCustomerSubscriptionDeleted($payload);

        $subscription = $payload['data']['object'];

        $organization = Organization::whereHas('subscriptions', function ($query) use ($subscription) {
            $query->where('stripe_id', $subscription['id']);
        })->first();

        if ($organization) {
            // You might want to set this to a free plan ID instead of null
            $organization->update(['plan_id' => null]);
        }

        $this->notifyAdmins([
            'type' => 'cancelled',
            'subscription_id' => $subscription['id'],
            'customer_email' => $organization->owner->email,
            'organization' => $organization->name,
            'plan' => "Removed",
            'status' => $subscription['status']
        ]);

        return $response;
    }

    /**
     * Handle customer subscription updated (for paused status).
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function handleCustomerSubscriptionUpdated($payload)
    {
        Log::debug("Customer Subscription Updated");
        $response = parent::handleCustomerSubscriptionUpdated($payload);

        $subscription = $payload['data']['object'];

        Log::debug($subscription['items']['data'][0]['price']['id']);

        $plan = Plan::where('stripe_price_id', $subscription['items']['data'][0]['price']['id'])->first();

        if ($plan) {
            // Find and update the organization
            $organization = Organization::whereHas('subscriptions', function ($query) use ($subscription) {
                $query->where('stripe_id', $subscription['id']);
            })->first();

            if ($organization) {
                $organization->update(['plan_id' => $plan->id]);
            }
        }

        // Check if the subscription was paused
        if ($subscription['pause_collection']) {
            $this->notifyAdmins([
                'type' => 'paused',
                'subscription_id' => $subscription['id'],
                'customer_email' => $organization->owner->email,
                'organization' => $organization->name,
                'plan' => $organization->plan->name,
                'status' => $subscription['status']
            ]);
        }

        return $response;
    }

    /**
     * Notify admin users about subscription changes.
     *
     * @param  array  $data
     * @return void
     */
    protected function notifyAdmins(array $data)
    {
        $admin = User::where('email', 'markusgray@syncwaretech.com')->first();

        $admin->notify(new SubscriptionStatusChanged($data));
    }
}
