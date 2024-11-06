<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductResponse extends Model
{
    protected $fillable = [
        'project_id',
        'product_question_id',
        'response'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function question(){
        return $this->belongsTo(ProductQuestion::class, 'product_question_id');
    }
}
