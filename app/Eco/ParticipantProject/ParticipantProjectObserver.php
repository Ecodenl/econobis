<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use Illuminate\Support\Facades\Auth;

class ParticipantProjectObserver
{

    public function creating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->created_by_id = $userId;
        $participantProject->updated_by_id = $userId;
    }

    public function saved(ParticipantProject $participantProject)
    {
        $contact = Contact::find($participantProject->contact_id);

        $participations = 0;

        foreach ($contact->participations as $participation){
            $participations += $participation->participations_current;
        }

        $contact->participations_current = $participations;

        $contact->save();

        // When participations are definitive then add participant to project revenue distribution if available
        if($participantProject->isDirty('participations_definitive') || $participantProject->isDirty('amount_definitive')) {
            foreach($participantProject->project->projectRevenues as $projectRevenue) {
                // If project revenue is already confirmed then continue
                if($projectRevenue->confirmed) continue;

                $projectRevenueController = new ProjectRevenueController();

                $projectRevenueController->saveDistribution($projectRevenue, $participantProject);
            }
        }
    }

    public function updating(ParticipantProject $participantProject)
    {
        $userId = Auth::id();
        $participantProject->updated_by_id = $userId;
    }
}