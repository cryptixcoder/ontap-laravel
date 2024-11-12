<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'status',
        'position',
        'assigned_user_id'
    ];

    public function organization(){
        return $this->belongsTo(Organization::class);
    }

    public function assignedUser() {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function comments(){
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function attachments(){
        return $this->morphMany(Attachment::class, 'attachable');
    }
}
