<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'short_description',
        'stripe_statement_descriptor',
        'description',
        'deliverables',
        'price',
        'product_category_id',
        'active',
        'stripe_product_id',
        'stripe_price_id',
        'active'
    ];

    public function productCategory(){
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    public function questions(){
        return $this->hasMany(ProductQuestion::class);
    }

    public function responses(){
        return $this->hasManyThrough(ProductResponse::class, ProductQuestion::class);
    }

    public function projects(){
        return $this->hasMany(Project::class);
    }
}
