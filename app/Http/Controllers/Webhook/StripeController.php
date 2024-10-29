<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierController;
use Illuminate\Http\Request;

class StripeController extends CashierController
{
    protected function handleCustomerSubscriptionUpdated(array $payload) {
        $response = parent::handleCustomerSubscriptionUpdated($payload);

        return $response;
    }
}
