<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Bus;
use App\Observers\BusObserver;

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
            Bus::observe(BusObserver::class);

    }
}
