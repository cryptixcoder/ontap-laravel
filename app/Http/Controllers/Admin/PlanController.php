<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\StripeClient;

class PlanController extends Controller
{
    protected $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(env('STRIPE_SECRET'));
    }

    public function index(Request $request){
        return Inertia::render('Admin/Plan/Plans', [
            'plans' => Plan::all()
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'features' => 'required',
            'limit' => 'required|integer',
            'stripe_statement_descriptor' => 'nullable'
        ]);


        $stripeProduct = $this->stripe->products->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'statement_descriptor' => $validated['stripe_statement_descriptor']
        ]);

        $stripePrice = $this->stripe->prices->create([
            'product' => $stripeProduct->id,
            'unit_amount' => $validated['price'] * 100,
            'currency' => 'usd',
            'recurring' => [
                'interval' => 'month'
            ]
        ]);


        $plan = Plan::create(array_merge($validated, [
            'stripe_product_id' => $stripeProduct->id,
            'stripe_price_id' => $stripePrice->id
        ]));

        return redirect()->back();
    }

    public function update(Request $request, Plan $plan) {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'features' => 'nullable',
            'limit' => 'required|integer',
            'stripe_statement_descriptor' => 'nullable'
        ]);

        try {
            $this->stripe->products->update($plan->stripe_product_id, [
                'name' => $validated['name'],
                'description' => $validated['description'],
                'statement_descriptor' => $validated['stripe_statement_descriptor']
            ]);
        }
        catch(\Exception $e) {
            dd($e->getMessage());
        }

        if($validated['price'] * 100 !== $plan->price * 100) {
            $stripePrice = $this->stripe->prices->create([
                'product' => $plan->stripe_product_id,
                'unit_amount' => $validated['price'] * 100,
                'currency' => 'usd',
                'recurring' => [
                    'interval' => 'month'
                ]
            ]);

            $validated['stripe_price_id'] = $stripePrice->id;
        }

        $plan->update($validated);

        return redirect()->back();
    }
}
