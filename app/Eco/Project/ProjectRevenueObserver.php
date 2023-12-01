<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Project;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProjectRevenueObserver
{

    public function creating(ProjectRevenue $projectRevenue)
    {
        $userId = Auth::id();
        $projectRevenue->created_by_id = $userId;
    }

    public function saving(ProjectRevenue $projectRevenue)
    {
        if($projectRevenue->confirmed == 1) {
            $project = $projectRevenue->project;
            // Set next (begin) date revenueEuro
            if($projectRevenue->category->code_ref == 'revenueEuro') {
                $project->date_interest_bearing = Carbon::parse($projectRevenue->date_end)->addDay();
            // Set next (begin) date redemptionEuro (only if later then current value)
            }elseif($projectRevenue->category->code_ref == 'redemptionEuro') {
                $newDateInterestBearingRedemption = Carbon::parse($projectRevenue->date_end)->addDay();
                if($project->date_interest_bearing_redemption == null || $newDateInterestBearingRedemption > Carbon::parse($project->date_interest_bearing_redemption) ){
                    $project->date_interest_bearing_redemption = $newDateInterestBearingRedemption;
                }
            // Set next (begin) date revenueKwh
            }elseif($projectRevenue->category->code_ref == 'revenueKwh'){
                $project->date_interest_bearing_kwh = Carbon::parse($projectRevenue->date_end)->addDay();
                // Set next start high next revenue
                if($projectRevenue->kwh_end_high <> 0)
                {
                    $project->kwh_start_high_next_revenue = $projectRevenue->kwh_end_high;
                }
                // Set next start low next revenue
                if($projectRevenue->kwh_end_low <> 0)
                {
                    $project->kwh_start_low_next_revenue = $projectRevenue->kwh_end_low;
                }
            // Set next (begin) date revenueKwhSplit
// todo WM: opschonen: revenueKwhSplit gebruiken we niet meer
//            }elseif($projectRevenue->category->code_ref == 'revenueKwhSplit'){
//                $participant = $projectRevenue->participant;
//                $participant->date_next_revenue_kwh = Carbon::parse($projectRevenue->date_end)->clone()->addDay();
//                // Set next start high next revenue
//                if($projectRevenue->kwh_end_high <> 0)
//                {
//                    $participant->kwh_start_high_next_revenue = $projectRevenue->kwh_end_high;
//                }
//                // Set next start low next revenue
//                if($projectRevenue->kwh_end_low <> 0)
//                {
//                    $participant->kwh_start_low_next_revenue = $projectRevenue->kwh_end_low;
//                }
//                $participant->save();
//
//                // Set next (begin) date, start high and start low in project (if not set yet))
//                if($project->date_interest_bearing_kwh == null)
//                {
//                    $project->date_interest_bearing_kwh = $projectRevenue->date_begin;
//                    $project->kwh_start_high_next_revenue = $projectRevenue->kwh_begin_high;
//                    $project->kwh_start_low_next_revenue = $projectRevenue->kwh_begin_low;
//                }
            }

            $project->save();
        }
    }
}