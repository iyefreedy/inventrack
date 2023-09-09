<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use FusionAuth\FusionAuthClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(FusionAuthClient::class, function ($app) {
            return new FusionAuthClient(env('FUSIONAUTH_API_KEY'), env('FUSIONAUTH_BASE_URL'));
        });
    }
}
