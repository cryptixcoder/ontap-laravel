<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\StripeClient;

class ProductController extends Controller
{
    protected $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(env('STRIPE_SECRET'));
    }

    public function index(){
        return Inertia::render('Admin/Product/Products', [
            'products' => Product::all()->load(['productCategory', 'questions']),
            'productCategories' => ProductCategory::all()
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required',
            'short_description' => 'nullable',
            'description' => 'required',
            'deliverables' => 'nullable',
            'price' => 'required',
            'product_category_id' => 'required',
            'active' => 'required'
        ]);

        $stripeProduct = $this->stripe->products->create([
            'name' => $validated['name'],
            'description' => $validated['description'],
        ]);

        $stripePrice = $this->stripe->prices->create([
            'product' => $stripeProduct->id,
            'unit_amount' => $validated['price'] * 100,
            'currency' => 'usd'
        ]);

        $product = Product::create(array_merge($validated, [
            'stripe_product_id' => $stripeProduct->id,
            'stripe_price_id' => $stripePrice->id
        ]));

        return redirect()->back();
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'required',
            'short_description' => 'nullable',
            'description' => 'required',
            'deliverables' => 'nullable',
            'price' => 'required',
            'product_category_id' => 'required',
            'active' => 'required'
        ]);

        if($validated['name'] !== $product->name || $validated['description'] !== $product->description) {
            $this->stripe->products->update($product->stripe_product_id, [
                'name' => $validated['name'],
                'description' => $validated['description']
            ]);
        }

        if($validated['price'] * 100 !== $product->price * 100) {
            $newPrice = $this->stripe->prices->create([
                'product' => $product->stripe_product_id,
                'unit_amount' => $validated['price'] * 100,
                'currency' => 'usd'
            ]);

            $validated['stripe_price_id'] = $newPrice->id;
        }

        $product->update($validated);

        return redirect()->back();
    }

    public function storeQuestions(Request $request, Product $product) {
        $validated = $request->validate([
            'questions' => 'required|array',
            'question.*.id' => 'nullable|integer',
            'question.*.question' => 'required|string',
            'question.*.type' => 'required|string|in:input,textarea,file',
        ]);

        $qIds = collect($validated['questions'])->pluck('id')->filter()->toArray();
        ProductQuestion::whereNotIn('id', $qIds)->delete();

        foreach($validated['questions'] as $qData) {
            if(isset($qData['id']) && $qData['id'] !== 0) {
                $question = ProductQuestion::findOrFail($qData['id']);
                $question->update([
                    'question' => $qData['question'],
                    'type' => $qData['type']
                ]);
            }
            else {
                $product->questions()->create([
                    'question' => $qData['question'],
                    'type' => $qData['type']
                ]);
            }
        }



        return redirect()->back();
    }
}
