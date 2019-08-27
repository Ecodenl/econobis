<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\Project;

use Illuminate\Support\Facades\Auth;

class ProjectValueCourseObserver
{

    public function creating(ProjectValueCourse $projectValueCourse)
    {
        $userId = Auth::id();
        $projectValueCourse->created_by_id = $userId;
    }

    public function saved(ProjectValueCourse $projectValueCourse) {
        $currentBookWorth = $projectValueCourse->project->currentBookWorth();

        foreach($projectValueCourse->project->participantsProject as $participant) {
            $participant->participations_definitive_worth = $participant->participations_definitive * $currentBookWorth;
            if($projectValueCourse->project->projectType->code_ref == 'capital' || $projectValueCourse->project->projectType->code_ref == 'postalcode_link_capital') {
                $participant->participations_capital_worth = $participant->calculator()->participationsCapitalWorth();
            }
            $participant->save();
        }
    }
}