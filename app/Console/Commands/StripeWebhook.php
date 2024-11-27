<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Cashier\Cashier;

class StripeWebhook extends Command
{
    public const DEFAULT_EVENTS = [
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'customer.updated',
        'customer.deleted',
        'payment_method.automatically_updated',
        'invoice.payment_action_required',
        'invoice.payment_succeeded',
    ];

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ontap:stripe-webhook';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $webhookEndpoints = Cashier::stripe()->webhookEndpoints;

        $endpoint = $webhookEndpoints->create(array_filter([
            'enabled_events' => self::DEFAULT_EVENTS,
            'url' => route('ontap.webhook'),
            'api_version' => Cashier::STRIPE_VERSION
        ]));
    }
}
