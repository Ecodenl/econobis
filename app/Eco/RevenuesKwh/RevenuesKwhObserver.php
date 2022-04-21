<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\RevenuesKwh;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RevenuesKwhObserver
{

    public function creating(RevenuesKwh $revenuesKwh)
    {
        $userId = Auth::id();
        $revenuesKwh->created_by_id = $userId;
    }

    public function saving(RevenuesKwh $revenuesKwh)
    {
        if($revenuesKwh->confirmed == 1) {
            $project = $revenuesKwh->project;
            // Set next (begin) date revenueKwh
            $project->date_interest_bearing_kwh = Carbon::parse($revenuesKwh->date_end)->addDay();
            // Set next start high next revenue
            if ($revenuesKwh->kwh_end_high <> 0) {
                $project->kwh_start_high_next_revenue = $revenuesKwh->kwh_end_high;
            }
            // Set next start low next revenue
            if ($revenuesKwh->kwh_end_low <> 0) {
                $project->kwh_start_low_next_revenue = $revenuesKwh->kwh_end_low;
            }
            $project->save();
        }
    }
}