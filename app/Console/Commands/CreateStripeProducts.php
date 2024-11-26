<?php

namespace App\Console\Commands;

use App\Models\Plan;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateStripeProducts extends Command
{

    protected $signature = 'stripe:create-products';
    protected $description = 'Command description';

    protected $client;

    public function __construct()
    {
        parent::__construct();
        $this->client = new \Stripe\StripeClient(config('cashier.secret'));
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Start create stripe products...");

        $this->createPlans();
        $this->createProducts();

        $this->info("Create stripe products complete.");

    }

    protected function createPlans() {
        $this->info("Create stripe plans...");
        $plans = Plan::all();

        foreach ($plans as $plan) {
            try {
                $stripeProduct = $this->client->products->create([
                    'name' => $plan->name,
                    'description' => $plan->description,
                ]);

                $stripePrice = $this->client->prices->create([
                    'product' => $stripeProduct->id,
                    'unit_amount' => $plan->price * 100,
                    'currency' => 'usd',
                    'recurring' => [
                        'interval' => 'month'
                    ]
                ]);

                $plan->update([
                    'stripe_product_id' => $stripeProduct->id,
                    'stripe_price_id' => $stripePrice->id
                ]);

                if ($plan->stripe_statement_descriptor) {
                    $this->client->products->update($stripeProduct->id, [
                        'statement_descriptor' => Str::limit($plan->stripe_statement_descriptor, 22)
                    ]);
                }

                $this->info("Created plan {$plan->name}");
            }
            catch(\Exception $e) {
                $this->error("Error creating plan {$plan->name}: " . $e->getMessage());
            }
        }

    }

    protected function createProducts() {
        $this->info("Create stripe products...");
        $products = Product::all();

        foreach ($products as $product) {
            try {
                $stripeProduct = $this->client->products->create([
                    'name' => $product->name,
                    'description' => $product->description,
                ]);

                $stripePrice = $this->client->prices->create([
                    'product' => $stripeProduct->id,
                    'unit_amount' => $product->price * 100,
                    'currency' => 'usd',
                ]);

                $product->update([
                    'stripe_product_id' => $stripeProduct->id,
                    'stripe_price_id' => $stripePrice->id
                ]);

                if ($product->stripe_statement_descriptor) {
                    $this->client->products->update($stripeProduct->id, [
                        'statement_descriptor' => Str::limit($product->stripe_statement_descriptor, 22)
                    ]);
                }

                $this->info("Created product {$product->name}");
            }
            catch(\Exception $e) {
                $this->error("Error creating product {$product->name}: " . $e->getMessage());
            }
        }
    }
}
