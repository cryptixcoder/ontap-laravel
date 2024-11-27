<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Laravel\Cashier\Subscription as CashierSubscription;

use Illuminate\Database\Eloquent\Model;

class Subscription extends CashierSubscription
{
    protected $casts = [
        'paused_on' => 'datetime',
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
        'remaining_business_days' => 'integer',
    ];

    protected $appends = [
        'paused',
        'nextBillingDate',
        'formattedEndsAt',
        'status'
    ];

    public function getPausedAttribute() {
        return $this->paused();
    }

    public function getStatusAttribute() {
        if ($this->ends_at) {
            return 'canceled';
        }

        if ($this->paused()) {
            return 'paused';
        }

        return 'active';
    }

    public function getNextBillingDateAttribute() {
        return $this->nextBillingDate();
    }

    public function paused(){
        return $this->paused_on !== null;
    }

    public function getRemainingDaysAttribute() {
        if($this->owner->subscribed()) {
            return $this->calculateRemainingDays(now(), Carbon::createFromTimestamp($this->asStripeSubscription()->current_period_end));
        }

        return $this->remaining_business_days;
    }

    public function getFormattedEndsAtAttribute() {
        return $this->ends_at ? $this->ends_at->format('F j, Y') : null;
    }

    /**
     * Get the next billing date for the subscription.
     */
    public function nextBillingDate()
    {
        if ($this->ends_at || $this->stripe_status === 'canceled') {
            return null;
        }

        $stripeSubscription = $this->asStripeSubscription();

        return now()->createFromTimestamp($stripeSubscription->current_period_end)
            ->format('F j, Y');
    }

    public function calculateRemainingDays(Carbon $startDate, Carbon $endDate) {
        $period = CarbonPeriod::create($startDate, $endDate);
        $businessDays = 0;

        foreach($period as $date) {
            if(!$date->isWeekend()) {
                $businessDays++;
            }
        }

        return $businessDays;
    }

    public function storeRemainingDays() {
        $now = now();
        $periodEnd = Carbon::createFromTimestamp(
            $this->asStripeSubscription()->current_period_end
        );

        $this->remaining_business_days = $this->calculateRemainingDays($now, $periodEnd);
        $this->save();
    }

    public function calculateTrialEnd() {
        if(!$this->remaining_business_days || $this->remaining_business_days <= 0){
            return null;
        }

        $trialEnd = now();
        $daysAdded = 0;

        while($daysAdded < $this->remaining_business_days) {
            $trialEnd->addDay();

            if(!$trialEnd->isWeekend()) {
                $daysAdded++;
            }
        }

        return $trialEnd;
    }

    public function applyRemainingDaysAsTrial() {
        if(!$this->remaining_business_days) {
            return;
        }

        $trialEnd = $this->calculateTrialEnd();

        if($trialEnd) {
            $this->owner->stripe()->subscriptions->update(
                $this->stripe_id,
                [
                    'trial_end' => $trialEnd->timestamp
                ]
            );
        }

        $this->trial_ends_at = $trialEnd;
        $this->remaining_business_days = 0;
        $this->save();
    }
}
