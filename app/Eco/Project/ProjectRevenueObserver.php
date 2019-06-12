<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Project;

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
        if($projectRevenue->isDirty('confirmed')) {
            $project = $projectRevenue->project;

            $project->date_interest_bearing = $projectRevenue->date_end;
            $project->save();
        }
    }
}