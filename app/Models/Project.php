<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'details',
        'type',
        'status',
        'stripe_session_id',
        'stripe_status',
        'product_id',
        'delivery_at',
        'assigned_user_id',
        'product_id'
    ];

    protected $casts = [
        'delivery_at' => 'datetime'
    ];

    public function organization() {
        return $this->belongsTo(Organization::class);
    }

    public function comments(){
        return $this->morphMany(Comment::class, 'commentable')->with('user');
    }

    public function assignedUser() {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function attachments(){
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function deliverables() {
        return $this->morphMany(Deliverable::class, 'deliverable');
    }

    public function responses() {
        return $this->hasMany(ProductResponse::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
