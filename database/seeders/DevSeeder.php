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
            'description' => 'Augment is designed for small teams that need to flexibly expand their capacity by adding an experienced developer or designer on an ongoing basis. This service provides dedicated support in building, iterating, or enhancing product features and UI/UX design.',
            'stripe_statement_descriptor' => 'SYNCWARE ONTAP AUGMENT',
            'stripe_product_id' => 'prod_PxCy2sJoP3LB0I',
            'stripe_price_id' => 'price_0P7IY4SMqd8bI2qaTDtJ8m8z',
            'price' => 6000,
            'features' => 'Development & Creative Services, 50hrs for Design/Dev, Async Communication, Monthly Consulting, Updates every 2 days, Pause or Cancel Anytime',
            'limit' => 5,
        ],
        [
            'name' => 'Full Agency',
            'description' => 'Full Agency provides you with a fully managed creative and development service, acting as your all-in-one team for design, development, and strategic planning. Ideal for teams seeking seamless, ongoing project management with expert guidance.',
            'stripe_statement_descriptor' => 'SYNCWARE ONTAP AGENCY',
            'stripe_product_id' => 'prod_QM0vI5gLHfCdHs',
            'stripe_price_id' => 'price_0PVItFSMqd8bI2qaSvRtVXSp',
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
            'description' => 'Build a memorable and cohesive brand identity for your new business or refresh an existing one. This sprint is perfect for startups or businesses needing a brand overhaul.',
            'stripe_statement_descriptor' => 'SYNCWARE BRAND SPRINT',
            'stripe_price_id' => 'price_0QNDiQSMqd8bI2qaPjk3WSp9',
            'stripe_product_id' => 'prod_RDFOdqkP4pgqrJ',
            'price' => 4000,
            'deliverables' => 'Logo files (vector & bitmap), Brand guidelines document, Color palette, Typography system, Logo usage rules, Brand voice guidelines',
            'product_category_id' => 1,
            "questions" => [
                ["question" => "Company Name", "type" => "input"],
                ["question" => "Tagline/Slogan (if any)", "type" => "input"],
                ["question" => "Briefly describe your business, products, or services", "type" => "textarea"],
                ["question" => "Who is your target audience?", "type" => "textarea"],
                ["question" => "Describe your brand’s personality (e.g., modern, friendly, professional)", "type" => "textarea"],
                ["question" => "Any color preferences or existing brand colors?", "type" => "textarea"],
                ["question" => "Are there specific visual elements you want included or avoided (e.g., icons, mascots)?", "type" => "textarea"],
                ["question" => "List competitors and links to their websites (to understand positioning)", "type" => "textarea"],
                ["question" => "What is the primary use of the logo (e.g., website, print, packaging)?", "type" => "textarea"],
                ["question" => "Do you have existing brand assets (logos, fonts, etc.) that need updating?", "type" => "textarea"]
            ]
        ],
        [
            'name' => 'Landing Page Sprint',
            'description' => 'A high-converting landing page built from scratch for product launches, lead generation, or special campaigns.',
            'stripe_statement_descriptor' => 'SYNCWARE LP SPRINT',
            'stripe_price_id' => 'price_0QKouOSMqd8bI2qab5yqWnnH',
            'stripe_product_id' => 'prod_RDFPIO5DOIkcJc',
            'price' => 3000,
            'deliverables' => 'Custom designed landing page, Responsive mobile design, Lead capture form, Analytics setup, Integration with email marketing',
            'product_category_id' => 1,
            "questions" => [
                ["question" => "Company/Product Name", "type" => "input"],
                ["question" => "Briefly describe the purpose of this landing page (e.g., product launch, lead generation)", "type" => "textarea"],
                ["question" => "Who is the target audience for this page?", "type" => "textarea"],
                ["question" => "What is the main goal of this landing page (e.g., sign-ups, purchases)?", "type" => "textarea"],
                ["question" => "Describe your brand’s tone and style", "type" => "textarea"],
                ["question" => "List any specific features, benefits, or call-to-actions that should be highlighted", "type" => "textarea"],
                ["question" => "Do you have any preferred color schemes or branding guidelines to follow?", "type" => "textarea"],
                ["question" => "Provide examples of landing pages you admire and what you like about them", "type" => "textarea"],
                ["question" => "What platform do you want the page built on (e.g., Webflow, WordPress, Next.js)?", "type" => "input"],
                ["question" => "Are there any specific integrations needed (e.g., analytics, CRM, payment systems)?", "type" => "textarea"]
            ]
        ],
        [
            'name' => 'UI/UX Design Sprint',
            'description' => 'Get a polished, user-centered UI/UX design that enhances your app’s usability and aesthetic appeal, ideal for new or established apps.',
            'stripe_statement_descriptor' => 'SYNCWARE UIUX SPRINT',
            'stripe_price_id' => 'price_0QKouoSMqd8bI2qalMxncxd4',
            'stripe_product_id' => 'prod_RDFPDeHX51isGN',
            'price' => 3000,
            'deliverables' => 'Up to 5 screens, Wireframes, High-fidelity mockups, Interactive prototype, Component library, Design system documentation, User flow diagrams',
            'product_category_id' => 1,
            "questions" => [
                ["question" => "Project Name", "type" => "input"],
                ["question" => "Brief description of the app/product and its main purpose", "type" => "textarea"],
                ["question" => "Who is your target user (demographics, preferences, etc.)?", "type" => "textarea"],
                ["question" => "What specific features or screens do you need designed (up to 5)?", "type" => "textarea"],
                ["question" => "Are there existing design elements (e.g., logos, colors) we should incorporate?", "type" => "textarea"],
                ["question" => "Do you have preferred styles or examples of designs you like?", "type" => "textarea"],
                ["question" => "Describe any pain points in the current design (if applicable) and what improvements you’d like", "type" => "textarea"],
                ["question" => "Are there specific platforms or devices you want prioritized (e.g., mobile, desktop)?", "type" => "textarea"],
                ["question" => "Should the design follow any established component libraries or design systems?", "type" => "textarea"],
                ["question" => "Any specific accessibility or usability requirements?", "type" => "textarea"]
            ]
        ],
        [
            'name' => 'Feature Sprint',
            'description' => 'Add a new feature to your product with senior development expertise. Perfect for rapidly implementing high-impact features.',
            'stripe_statement_descriptor' => 'SYNCWARE FEAT SPRINT',
            'stripe_price_id' => 'price_0QKov7SMqd8bI2qa53loxc4B',
            'stripe_product_id' => 'prod_RDFPJwi3fqdIq0',
            'price' => 3000,
            'deliverables' => 'Technical specifications, Working feature code, API documentation, Test cases, Deployment instructions, Code review documentation',
            'product_category_id' => 1,
            "questions" => [
                ["question" => "Project/Product Name", "type" => "input"],
                ["question" => "Brief description of the feature you need developed", "type" => "textarea"],
                ["question" => "Why is this feature important to your product?", "type" => "textarea"],
                ["question" => "Describe any expected functionality and main user actions within this feature", "type" => "textarea"],
                ["question" => "Are there any existing components or workflows this feature should integrate with?", "type" => "textarea"],
                ["question" => "What platforms or environments should this feature be compatible with?", "type" => "input"],
                ["question" => "Do you have a deadline or launch date in mind for this feature?", "type" => "input"],
                ["question" => "Are there any specific technologies or tools required for this feature?", "type" => "textarea"],
                ["question" => "Describe any competitors or similar products with a similar feature (optional)", "type" => "textarea"],
                ["question" => "Do you have documentation or existing designs we should reference?", "type" => "textarea"]
            ]
        ],
        [
            'name' => 'Prompt Workshop Sprint',
            'description' => 'A specialized sprint focused on developing custom AI prompt templates tailored to your specific use case. Our team analyzes your needs and creates an optimized prompt library along with model recommendations to maximize AI effectiveness for your organization.',
            'stripe_statement_descriptor' => 'SYNCWARE AI WORKSHOP',
            'stripe_price_id' => 'price_0QNDjaSMqd8bI2qaerTvYI3f',
            'stripe_product_id' => 'prod_RDFQzNjsyTvVPo',
            'price' => 2500,
            'deliverables' => 'Custom prompt library, Model selection recommendations, Implementation guide, Usage examples, Performance benchmarks, Optimization tips',
            'product_category_id' => 2,
            "questions" => [
                ["question" => "Company Name", "type" => "input"],
                ["question" => "Briefly describe your organization and its primary products/services", "type" => "textarea"],
                ["question" => "What goals are you hoping to achieve with AI (e.g., content generation, customer support)?", "type" => "textarea"],
                ["question" => "List specific tasks or workflows where you see AI adding value", "type" => "textarea"],
                ["question" => "Are there any AI tools you currently use or are considering?", "type" => "textarea"],
                ["question" => "Describe your brand's voice and tone (to tailor prompts)", "type" => "textarea"],
                ["question" => "Who will be the primary users of these AI tools within your organization?", "type" => "textarea"],
                ["question" => "Do you have existing data or prompts we can build upon or improve?", "type" => "textarea"],
                ["question" => "Are there compliance or security considerations we should keep in mind?", "type" => "textarea"],
                ["question" => "What is your preferred outcome for this workshop (e.g., a strategy document, prompt library)?", "type" => "textarea"]
            ]
        ],
        [
            'name' => 'Content Generation Sprint',
            'description' => 'A comprehensive content strategy that combines AI and human expertise to create effective, high-quality content for your brand.',
            'stripe_statement_descriptor' => 'SYNCWARE AI CONTENT',
            'stripe_price_id' => 'price_0QNDkwSMqd8bI2qaxdZmShbs',
            'stripe_product_id' => 'prod_RDFQ7VK3iZSjFE',
            'price' => 1500,
            'deliverables' => 'Content calendar, Template library, Style guide, Generated content samples, Performance metrics, Content optimization guide',
            'product_category_id' => 2,
            "questions" => [
                ["question" => "Company Name", "type" => "input"],
                ["question" => "Brief description of your business and target audience", "type" => "textarea"],
                ["question" => "What types of content are you looking to generate with AI (e.g., blog posts, social media)?", "type" => "textarea"],
                ["question" => "Describe your brand’s tone, style, and any unique messaging guidelines", "type" => "textarea"],
                ["question" => "Do you have existing content or templates to serve as examples?", "type" => "textarea"],
                ["question" => "Are there specific keywords or topics you want to focus on?", "type" => "textarea"],
                ["question" => "Which AI tools do you currently use or plan to use (e.g., ChatGPT, Jasper)?", "type" => "textarea"],
                ["question" => "Describe any SEO goals or keywords you'd like incorporated into the content", "type" => "textarea"],
                ["question" => "Who will be managing and reviewing the AI-generated content within your team?", "type" => "textarea"],
                ["question" => "Are there specific compliance or brand guidelines we need to follow?", "type" => "textarea"]
            ]
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
            $instance = Product::updateOrCreate(
                [ 'name' => $product['name'] ],
                [
                    'name' => $product['name'],
                    'description' => $product['description'],
                    'stripe_statement_descriptor' => $product['stripe_statement_descriptor'],
                    'stripe_price_id' => $product['stripe_price_id'],
                    'price' => $product['price'],
                    'deliverables' => $product['deliverables'],
                    'product_category_id' => $product['product_category_id']
                ]
            );

            if($instance) {
                foreach ($product['questions'] as $question) {
                    $instance->questions()->create([
                        'question' => $question['question'],
                        'type' => $question['type']
                    ]);
                }
            }
        }
    }

}
