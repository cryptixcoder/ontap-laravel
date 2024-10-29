<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $fillable = [
        'email',
        'role',
        'token'
    ];

    public function organization(){
        return $this->belongsTo(Organization::class);
    }
}
