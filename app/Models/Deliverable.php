<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deliverable extends Model
{
    public function deliverable(){
        return $this->morphTo();
    }
}
