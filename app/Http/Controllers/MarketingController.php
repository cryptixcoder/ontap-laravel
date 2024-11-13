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
        $categories = ProductCategory::all()->load('products');

        return Inertia::render('Marketing/Home', [
            'plans' => $plans,
            'categories' => $categories,
        ]);
    }
}
