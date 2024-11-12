<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'features',
        'limit',
        'sprint_product_id',
        'stripe_price_id',
        'stripe_statement_descriptor',
        'price',
    ];

    public function organizations(){
        return $this->belongsToMany(Organization::class);
    }
}
