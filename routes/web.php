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
use App\Http\Controllers\TeamController;
use App\Http\Controllers\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\ImpersonateController;
use App\Http\Controllers\MarketingController;
use App\Http\Controllers\Webhook\StripeWebhookController;
use App\Mail\DeliverablesReceived;
use App\Models\Organization;
use App\Models\Project;
use Illuminate\Support\Facades\Route;

Route::get('/', [MarketingController::class,'index'])->name('home');

Route::get('/invite/{invite}', [TeamController::class, 'viewInvite'])->name('invite.view');
Route::post('/invite/{invite}/accept', [TeamController::class, 'acceptInvite'])->name('invite.accept');

Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])->name('stripe.webhook');

Route::middleware('auth')->group(function () {

    Route::name('admin.')->prefix('admin')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::get('/mrr', [DashboardController::class, 'getMRRData'])->name('dashboard.mrr');

        Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
        Route::get('/customers/{organization}', [CustomerController::class, 'show'])->name('customer.show');
        Route::get('/customers/{organization}/tasks', [CustomerController::class, 'tasks'])->name('customer.tasks');
        Route::get('/customers/{organization}/tasks/{task}', [CustomerController::class, 'viewTask'])->name('customer.tasks.show');
        Route::get('/customers/{organization}/projects/{project}', [CustomerController::class, 'project'])->name('customer.project.show');
        Route::put('/customers/{organization}/projects/{project}/assign', [CustomerController::class, 'assigUser'])->name('customer.project.assign');

        Route::get('/plans', [PlanController::class, 'index'])->name('plan.index');
        Route::post('/plans/create', [PlanController::class, 'store'])->name('plan.store');
        Route::put('/plans/{plan}', [PlanController::class, 'update'])->name('plan.update');

        Route::get('/products', [ProductController::class, 'index'])->name('product.index');
        Route::post('/products/create', [ProductController::class, 'store'])->name('product.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('product.update');
        Route::post('/products/{product}/questions', [ProductController::class, 'storeQuestions'])->name('product.store.questions');

        Route::get('/team', [AdminTeamController::class, 'index'])->name('team.index');
        Route::post('/team/create', [AdminTeamController::class, 'store'])->name('team.store');
        Route::put('/team/{user}', [AdminTeamController::class, 'update'])->name('team.update');
        Route::delete('/team/{user}', [AdminTeamController::class, 'destroy'])->name('team.destroy');

        Route::get('/mailable', function() {
            $organization = Organization::find(1);
            $project = Project::find(1);
            return (new DeliverablesReceived($organization, $project, ''))->render();
        });
    });

    Route::post('/impersonate/stop', [ImpersonateController::class, 'stopImpersonation'])->name('impersonate.stop');
    Route::post('/impersonate/{user}', [ImpersonateController::class, 'impersonate'])->name('impersonate.start');


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
    Route::post('/projects/{product}/checkout', [ProjectController::class, 'checkout'])->name('project.checkout');

    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/subscription/billing', [SubscriptionController::class, 'manageBilling'])->name('subscription.billing');
    Route::post('/subscription/pause', [SubscriptionController::class, 'pause'])->name('subscription.pause');
    Route::post('/subscription/resume', [SubscriptionController::class, 'resume'])->name('subscription.resume');
    Route::post('/subscription/checkout', [SubscriptionController::class, 'createCheckoutSession'])->name('subscription.checkout');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/team', [TeamController::class, 'index'])->name('team.index');
    Route::post('/team/invite', [TeamController::class, 'invite'])->name('team.invite');
    Route::delete('/team/remove-invite', [TeamController::class, 'removeInvite'])->name('team.remove-invite');
    Route::delete('/team/remove-team', [TeamController::class, 'removeTeam'])->name('team.remove-team');
});

require __DIR__.'/auth.php';
