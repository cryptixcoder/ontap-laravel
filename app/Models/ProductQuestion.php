<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductQuestion extends Model
{
    protected $fillable = [
        'product_id',
        'question',
        'type'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
