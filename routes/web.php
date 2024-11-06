<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\DeliverableController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

        Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
        Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('customer.show');

        Route::get('/plans', [PlanController::class, 'index'])->name('plan.index');
        Route::post('/plans/create', [PlanController::class, 'store'])->name('plan.store');
        Route::put('/plans/{plan}', [PlanController::class, 'update'])->name('plan.update');

        Route::get('/products', [ProductController::class, 'index'])->name('product.index');
        Route::post('/products/create', [ProductController::class, 'store'])->name('product.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('product.update');
        Route::post('/products/{product}/questions', [ProductController::class, 'storeQuestions'])->name('product.store.questions');
    });

    Route::get('/tasks', [TaskController::class, 'index'])->name('task.index');
    Route::get('/tasks/{task}', [TaskController::class, 'edit'])->name('task.edit');
    Route::post('/tasks/create', [TaskController::class, 'store'])->name('task.store');
    Route::put('/tasks/{task}', [TaskController::class, 'update'])->name('task.update');
    Route::put('/tasks/{task}/position', [TaskController::class, 'updatePosition'])->name('task.update.position');
    Route::delete('/tasks/{task}', [TaskController::class, 'delete'])->name('task.delete');

    Route::post('/comments', [CommentController::class, 'store'])->name('comment.store');

    Route::post('/attachment', [AttachmentController::class, 'store'])->name('attachment.store');
    Route::delete('/attachment/{attachment}', [AttachmentController::class, 'destroy'])->name('attachment.delete');

    Route::post('/deliverable/{project}', [DeliverableController::class, 'store'])->name('deliverable.store');
    Route::delete('/deliverable/{deliverable}', [DeliverableController::class, 'destroy'])->name('deliverable.delete');

    Route::get('/projects', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('project.show');
    Route::post('/projects/{project}/onboard', [ProjectController::class, 'onboard'])->name('project.onboard');
    Route::post('/projects/checkout', [ProjectController::class, 'checkout'])->name('project.checkout');

    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/subscription/billing', [SubscriptionController::class, 'manageBilling'])->name('subscription.billing');
    Route::post('/subscription/pause', [SubscriptionController::class, 'pause'])->name('subscription.pause');
    Route::post('/subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.resume');
    Route::post('/subscription/checkout', [SubscriptionController::class, 'createCheckoutSession'])->name('subscription.checkout');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
