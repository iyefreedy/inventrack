<?php

use App\Http\Controllers\ComputerController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', 'DashboardController@index')->middleware(['auth', 'verified'])->name('dashboard');

/**
 * Responsible for redirecting the user to the FusionAuth login page
 */
Route::get('/auth/redirect', function () {
    return Socialite::driver('fusionauth')->redirect();
})->name('login');

/**
 * This is the address that we configured in our .env file which the user will be redirected to after completing the
 * login process
 */
Route::get('/auth/callback', function () {
    /** @var \SocialiteProviders\Manager\OAuth2\User $user */
    $user = Socialite::driver('fusionauth')->user();

    // Let's create a new entry in our users table (or update if it already exists) with some information from the user
    $user = User::updateOrCreate([
        'fusionauth_id' => $user->id,
    ], [
        'name' => $user->name,
        'email' => $user->email,
        'fusionauth_access_token' => $user->token,
        'fusionauth_refresh_token' => $user->refreshToken,
    ]);


    // Logging the user in
    Auth::login($user);

    // Here, you should redirect to your app's authenticated pages (e.g. the user dashboard)
    return redirect('/');
});


/**
 * Dashboard route without middleware
 * For testing purpose only
 */
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');



/** End of testing route */

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('computers', ComputerController::class);
    Route::resource('rooms', RoomController::class)->except(['show']);
    Route::resource('maintenances', MaintenanceController::class);
});

require __DIR__ . '/auth.php';
