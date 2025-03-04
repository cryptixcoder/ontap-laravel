<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketingController extends Controller
{
    public function index() {
        $plans = Plan::all();
        // $categories = ProductCategory::all()->load('products');

        $categories = ProductCategory::whereHas('products', function ($query) {
            $query->where('active', true);
        })->with(['products' => function ($query) {
            $query->where('active', true);
        }])->get();

        return Inertia::render('Marketing/Home', [
            'plans' => $plans,
            'categories' => $categories,
        ]);
    }
}
