<?php

namespace App\Http\Resources\ParticipantProject;

use App\Http\Resources\Address\FullParticipantAddress;
use App\Http\Resources\Contact\FullParticipantContact;
use App\Http\Resources\Project\ProjectPeek;
use Illuminate\Http\Resources\Json\JsonResource;

class GridParticipantProject extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        $today = now()->toDateString();

        $dongleReadOutTypes = $this->address
            ? $this->address->addressDongles
                ->filter(function ($dongle) use ($today) {
                    return (!$dongle->date_start || $dongle->date_start->toDateString() <= $today)
                        && (!$dongle->date_end || $dongle->date_end->toDateString() >= $today);
                })
                ->pluck('dongleReadOutType.name')
                ->filter()
                ->unique()
            : collect();

        $hasP1 = $dongleReadOutTypes->contains('P1');
        $hasP4 = $dongleReadOutTypes->contains('P4');

        $dongleTypes = $hasP1 && $hasP4
            ? 'P1/P4'
            : ($hasP1 ? 'P1' : ($hasP4 ? 'P4' : ''));

        return
            [
                'id' => $this->id,
                'contactId' => $this->contact_id,
                'contact' => FullParticipantContact::make($this->whenLoaded('contact')),
                'address' => FullParticipantAddress::make($this->whenLoaded('address')),
                'participationsInteressed' => $this->participations_interessed,
                'participationsOptioned' => $this->participations_optioned,
                'participationsGranted' => $this->participations_granted,
                'participationsDefinitive' => $this->participations_definitive,
                'amountInteressed' => $this->amount_interessed,
                'amountOptioned' => $this->amount_optioned,
                'amountGranted' => $this->amount_granted,
                'amountDefinitive' => $this->amount_definitive,
                'powerKwhConsumption' => $this->power_kwh_consumption,
                'powerKwAvailable' => $this->power_kw_available,
                'uniqueMutationStatuses' => $this->uniqueMutationStatuses,
                'dateRegister' => $this->date_register,
                'projectId' => $this->project_id,
                'project' => ProjectPeek::make($this->whenLoaded('project')),
                'housingFileId' => $this->housing_file_id,
                'dongleTypes' => $dongleTypes,
            ];
    }
}
