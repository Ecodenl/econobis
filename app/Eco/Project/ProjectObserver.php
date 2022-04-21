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

    public function saving(Project $project)
    {
    }
}