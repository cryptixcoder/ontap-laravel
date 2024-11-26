<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    protected $fillable = [
        'email',
        'role',
        'token'
    ];

    protected static function boot() {
        parent::boot();

        static::creating(function ($invite) {
            do {
                $token = Str::random(32);
            }
            while(self::where('token', Str::random(32))->exists());

            $invite->token = $token;
        });
    }

    public function organization(){
        return $this->belongsTo(Organization::class);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('id', $value)
                    ->orWhere('token', $value)
                    ->firstOrFail();
    }

    // public function getRouteKeyName() {
    //     return 'token';
    // }
}
