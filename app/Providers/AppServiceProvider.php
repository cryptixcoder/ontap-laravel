<?php

namespace App\Providers;

use App\Models\Organization;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Cashier::useCustomerModel(Organization::class);

        Cashier::useSubscriptionModel(Subscription::class);

        Gate::define('viewPulse', function (User $user) {
            return true;
        });
    }
}
