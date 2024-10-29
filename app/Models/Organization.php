<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Cashier\Billable;

class Organization extends Model
{
    use Billable;

    protected $fillable = [
        'name',
        'owner_id'
    ];

    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(){
        return $this->belongsToMany(User::class,'organization_user');
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public function invites(){
        return $this->hasMany(Invite::class);
    }
}
