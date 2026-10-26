<?php

namespace App\Helpers\Delete\Models;

use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

class DeleteParticipantMutation implements DeleteInterface
{
    private array $errorMessage = [];
    private Model $participantMutation;

    public function __construct(Model $participantMutation)
    {
        $this->participantMutation = $participantMutation;
    }

    public function delete()
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }

        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();

        if (count($this->errorMessage) === 0) {
            $this->participantMutation->delete();
        }

        return $this->errorMessage;
    }

    public function canDelete(): bool
    {
        if ($this->participantMutation->isPaidByMollie) {
            $this->errorMessage[] =
                'Deelnamemutatie kan niet worden verwijderd: er is een definitieve Mollie-betaling gekoppeld.';

            return false;
        }

        return true;
    }

    public function deleteModels()
    {
        foreach ($this->participantMutation->molliePayments as $molliePayment) {
            if ($molliePayment->date_paid === null) {
                $molliePayment->delete();
            }
        }

        foreach ($this->participantMutation->statusLog as $statusLog) {
            $statusLog->delete();
        }
    }

    public function dissociateRelations()
    {
    }

    public function deleteRelations()
    {
    }

    public function customDeleteActions()
    {
    }
}