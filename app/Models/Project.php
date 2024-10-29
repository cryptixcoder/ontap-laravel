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
        'stripe_status'
    ];

    public function comments(){
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function attachments(){
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function deliverables() {
        return $this->morphMany(Deliverable::class, 'deliverable');
    }
}
