<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Plan;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DevSeeder extends Seeder
{
    protected array $admins = [
        [
            'name' => 'Markus Gray',
            'email' => 'markusgray@syncwaretech.com',
            'password' =>'StartT0C0de2024!',
            'role' => 'admin'
        ],
        // Add more admin users as needed
    ];

    protected $plans = [
        [
            'name' => 'Augment',
            'description' => '',
            'stripe_statement_descriptor' => '',
            'stripe_product_id' => 'prod_PxCy2sJoP3LB0I',
            'stripe_price_id' => 'price_0P7IY4SMqd8bI2qaTDtJ8m8z',
            'price' => 6000,
            'features' => 'Full Service,Simple monthly subscription,Scales as you need it,Async communication,Cancel anytime,50 hours of design/dev work',
            'limit' => 5,
        ],
        [
            'name' => 'Full Agency',
            'description' => '',
            'stripe_statement_descriptor' => '',
            'stripe_product_id' => 'prod_QM0vI5gLHfCdHs',
            'stripe_price_id' => 'price_0PVItFSMqd8bI2qaSvRtVXSp',
            'price' => 15000,
            'features' => 'Fully Managed Project,Creative Strategy,Access to our full team,Updates every two days,Cancel anytime',
            'limit' => 5,
        ],
    ];

    protected $categories = [
        [
            'name' =>'Design & Dev'
        ],
        [
            'name' =>'AI'
        ],
    ];

    protected $products = [
        [
            'name' => 'Brand Identity Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKotuSMqd8bI2qarKhV8HbP',
            'stripe_product_id' => 'prod_RDFOdqkP4pgqrJ',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Landing Page Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKouOSMqd8bI2qab5yqWnnH',
            'stripe_product_id' => 'prod_RDFPIO5DOIkcJc',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'UI/UX Design Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKouoSMqd8bI2qalMxncxd4',
            'stripe_product_id' => 'prod_RDFPDeHX51isGN',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Feature Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKov7SMqd8bI2qa53loxc4B',
            'stripe_product_id' => 'prod_RDFPJwi3fqdIq0',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Prompt Workshop Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKovgSMqd8bI2qaIq4eZjli',
            'stripe_product_id' => 'prod_RDFQzNjsyTvVPo',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 2,
        ],
        [
            'name' => 'Content Generation Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKow7SMqd8bI2qacepjyk05',
            'stripe_product_id' => 'prod_RDFQ7VK3iZSjFE',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 2,
        ]
    ];



    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Seeding development data seeding...');

        // Seed the admin users
        $this->seedAdmins();

        // Seed the plans
        $this->seedPlans();

        // Seed the product categories
        $this->seedCategories();

        // Seed the products
        $this->seedProducts();

        $this->command->info('Development data seeding complete.');
    }


    protected function seedAdmins() {
        $this->command->info('Seeding admin users...');

        foreach ($this->admins as $admin) {
            User::updateOrCreate(
                [ 'email' => $admin['email'] ],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make($admin['password']),
                    'role' => 'admin'
                ]
            );
        }
    }

    protected function seedPlans() {
        $this->command->info('Seeding plans...');

        foreach ($this->plans as $plan) {
            Plan::updateOrCreate(
                [ 'name' => $plan['name'] ],
                [
                    'name' => $plan['name'],
                    'description' => $plan['description'],
                    'stripe_statement_descriptor' => $plan['stripe_statement_descriptor'],
                    'price' => $plan['price'],
                    'features' => $plan['features'],
                    'limit' => $plan['limit']
                ]
            );
        }
    }

    protected function seedCategories() {
        $this->command->info('Seeding product categories...');

        foreach ($this->categories as $category) {
            ProductCategory::updateOrCreate(
                [ 'name' => $category['name'] ],
                [
                    'name' => $category['name']
                ]
            );
        }
    }

    protected function seedProducts() {
        $this->command->info('Seeding products...');

        foreach ($this->products as $product) {
            Product::updateOrCreate(
                [ 'name' => $product['name'] ],
                [
                    'name' => $product['name'],
                    'description' => $product['description'],
                    'stripe_price_id' => $product['stripe_price_id'],
                    'price' => $product['price'],
                    'deliverables' => $product['deliverables'],
                    'product_category_id' => $product['product_category_id']
                ]
            );
        }
    }

}
