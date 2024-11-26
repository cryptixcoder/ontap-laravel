<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'organization_id',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function routeNotificationForSlack(Notification $notification) {
        return "#ontap-admin";
    }

    public function organization() {
        return $this->belongsTo(Organization::class);
    }

    public function organizations() {
        return $this->belongsToMany(Organization::class)
                    ->withPivot('role')
                    ->withTimestamps();
    }

    public function isAdminOf(Organization $organization) {
        return $this->organizations()
                    ->wherePivot('organization_id', $organization->id)
                    ->wherePivot('role', 'admin')
                    ->exists() || $organization->owner_id == $this->id;
    }

    public function isCollaboratorOf(Organization $organization) {
        return $this->organizations()
                    ->wherePivot('organization_id', $organization->id)
                    ->wherePivot('role', 'collaborator')
                    ->exists();
    }

    public function projects() {
        return $this->hasMany(Project::class, 'assigned_user_id');
    }
}
