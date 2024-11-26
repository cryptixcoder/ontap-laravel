<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Stripe\StripeClient;

class SyncStripeProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:sync-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync local products with Stripe';

    protected $stripe;


    public function __construct()
    {
        parent::__construct();
        $this->stripe = new StripeClient(config('cashier.secret'));
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Syncing Stripe products...");

        $products = Product::all();
        $bar = $this->output->createProgressBar(count($products));

        foreach ($products as $product) {
            try {
                if ($product->stripe_product_id) {
                    $this->stripe->products->update($product->stripe_product_id, [
                        'name' => $product->name,
                        'description' => $product->description,
                        'statement_descriptor' => $product->statement_descriptor
                    ]);
                }

                $bar->advance();
            }
            catch(\Exception $e) {
                $this->error("Error syncing product {$product->id}: {$e->getMessage()}");
            }
        }

        $bar->finish();
        $this->info("\nProduct sync completed!");
    }
}
