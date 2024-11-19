<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductionSeeder extends Seeder
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
            'stripe_product_id' => 'prod_QsdZEf1afvKjba',
            'stripe_price_id' => 'price_0Q0sIoSMqd8bI2qajtoePbSG',
            'price' => 6000,
            'features' => 'Development & Creative Services, 50hrs for Design/Dev, Async Communication, Monthly Consulting, Updates every 2 days, Pause or Cancel Anytime',
            'limit' => 5,
        ],
        [
            'name' => 'Full Agency',
            'description' => '',
            'stripe_statement_descriptor' => '',
            'stripe_product_id' => 'prod_QsdZ3O9hrRUfRr',
            'stripe_price_id' => 'price_0Q0sIhSMqd8bI2qawOpNSVY1',
            'price' => 15000,
            'features' => 'Development & Creative Services, Fully managed project, Unlimited Development and Design, Access to full team, Creative Strategy, Monthly Consulting, Updates every 2 days, Pause or Cancel at anytime',
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
            'stripe_price_id' => 'price_0QKp1dSMqd8bI2qaSdSznL9F',
            'stripe_product_id' => 'prod_RDFWNk1jsJGxsp',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Landing Page Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKp1aSMqd8bI2qa1JZhHZSD',
            'stripe_product_id' => 'prod_RDFWV9ua5HeUjZ',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'UI/UX Design Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKp1XSMqd8bI2qabEYXi9HP',
            'stripe_product_id' => 'prod_RDFWTpaHIxI3gL',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Feature Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKp1USMqd8bI2qaBlCrI31l',
            'stripe_product_id' => 'prod_RDFWKhHld2y4yR',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 1,
        ],
        [
            'name' => 'Prompt Workshop Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKp1QSMqd8bI2qas0AmGfLq',
            'stripe_product_id' => 'prod_RDFWzUPEuKPCcp',
            'price' => 3000,
            'deliverables' => '',
            'product_category_id' => 2,
        ],
        [
            'name' => 'Content Generation Sprint',
            'description' => '',
            'stripe_price_id' => 'price_0QKp1LSMqd8bI2qaPo1l6W7G',
            'stripe_product_id' => 'prod_RDFWAhrZX6AQRR',
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
        $this->command->info('Seeding production data seeding...');

        // Seed the admin users
        $this->seedAdmins();

        // Seed the plans
        $this->seedPlans();

        // Seed the product categories
        $this->seedCategories();

        // Seed the products
        $this->seedProducts();

        $this->command->info('Production data seeding complete.');
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
                    'stripe_price_id' => $plan['stripe_price_id'],
                    'stripe_product_id' => $plan['stripe_product_id'],
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
