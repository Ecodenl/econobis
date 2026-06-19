<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Project;

use Illuminate\Support\Facades\Auth;

class ProjectObserver
{

    public function creating(Project $project)
    {
        $userId = Auth::id();
        $project->created_by_id = $userId;

        if(!$project->administration || !$project->administration->uses_mollie){
            $project->uses_mollie = false;
        }
    }

    public function updating(Project $project)
    {
        $userId = Auth::id();
        $project->updated_by_id = $userId;

        if(!$project->administration || !$project->administration->uses_mollie){
            $project->uses_mollie = false;
        }
    }

    public function saved(Project $project)
    {
        if ($project->isDirty('loan_type_id')) {
            // Als type lening veranderd is dan concept euro en aflossing revenues op concept-to-update zetten.
            $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::whereIn('code_ref', ['revenueEuro', 'redemptionEuro'])->first()->id;
            $projectRevenues = $project->projectRevenues()->where('confirmed', false)->whereIn('status', ['concept'])->whereIn('category_id', [$projectRevenueCategoryRedemptionEuro])->get();
            foreach ($projectRevenues as $projectRevenue) {
                $projectRevenue->status = 'concept-to-update';
                $projectRevenue->save();
            }
        }
    }
}