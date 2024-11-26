<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deliverable extends Model
{
    protected $guarded = [];
    public function deliverable(){
        return $this->morphTo();
    }
}
