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
        if($projectRevenue->isDirty('confirmed') && $projectRevenue->confirmed == 1) {
            if($projectRevenue->status == 'concept'){
                $projectRevenue->status = 'confirmed';
                // Bijwerken distribution statusssen bij op definitief zetten.
                foreach ($projectRevenue->distribution as $distribution){
                    $distribution->status = 'confirmed';
                    $distribution->save();
                }
            }
            $project = $projectRevenue->project;

            // Op moment dat ProjectRevenue op Definitief wordt gezet dan project (default) date_entry op null zetten.
            $project->date_entry = null;

            // Skip for revenueParticipant
            if($projectRevenue->category->code_ref == 'revenueParticipant') {
                return;

            // Set next (begin) date revenueEuro
            }elseif($projectRevenue->category->code_ref == 'revenueEuro') {
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
            }

            $project->save();
        }
    }
}