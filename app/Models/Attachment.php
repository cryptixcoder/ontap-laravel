<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'name',
        'url',
        'storage_url'
    ];

    public function attachable(){
        return $this->morphTo();
    }
}
