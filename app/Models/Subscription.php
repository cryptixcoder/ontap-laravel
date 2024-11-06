<?php

namespace App\Models;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Laravel\Cashier\Subscription as CashierSubscription;

use Illuminate\Database\Eloquent\Model;

class Subscription extends CashierSubscription
{
    protected $casts = [
        'pause_on' => 'datetime',
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
        'remaining_business_days' => 'integer',
    ];

    public function paused(){
        return $this->paused_on !== null;
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
