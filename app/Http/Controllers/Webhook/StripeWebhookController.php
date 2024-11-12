<?php

namespace App\Http\Controllers\Webhook;


use Laravel\Cashier\Http\Controllers\WebhookController;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\Plan;
use App\Models\User;
use App\Notifications\SubscriptionStatusChanged;
use Illuminate\Http\Request;

class StripeWebhookController extends WebhookController
{
    /**
     * Handle customer subscription created.
     *
     * @param  array  $payload
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleCustomerSubscriptionCreated($payload)
    {
        $response = parent::handleCustomerSubscriptionCreated($payload);

        $subscription = $payload['data']['object'];

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
            'customer_email' => $subscription['customer_email'],
            'plan' => $subscription['items']['data'][0]['price']['nickname'] ?? 'Unknown Plan',
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
    public function handleCustomerSubscriptionDeleted($payload)
    {
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
            'customer_email' => $subscription['customer_email'],
            'plan' => $subscription['items']['data'][0]['price']['nickname'] ?? 'Unknown Plan',
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
    public function handleCustomerSubscriptionUpdated($payload)
    {
        $response = parent::handleCustomerSubscriptionUpdated($payload);

        $subscription = $payload['data']['object'];

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
                'customer_email' => $subscription['customer_email'],
                'plan' => $subscription['items']['data'][0]['price']['nickname'] ?? 'Unknown Plan',
                'status' => $subscription['status'],
                'resumes_at' => $subscription['pause_collection']['resumes_at']
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

        $admin->notify(new SubscriptionStatusChanged());
    }
}
