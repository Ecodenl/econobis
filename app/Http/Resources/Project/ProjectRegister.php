<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\Resource;

class ProjectRegister extends Resource
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
        return
            [
                'id' => $this->id,
                'name' => $this->name,
                'dateStartRegistrations' => $this->date_start_registrations,
                'dateEndRegistrations' => $this->date_end_registrations,
                'administrationName' => $this->administration->name,
                'hasParticipation' => $this->hasParticipation,
                'isSceOrPcrProject' => $this->isSceOrPcrProject,
                'postalcodeLink' => $this->postalcode_link,
                'allowChangeParticipation' => $this->allowChangeParticipation,
                'allowPayMollie' => $this->allowPayMollie,
                'econobisPaymentLink' => $this->econobisPaymentLink,
                'allowRegisterToProject' => $this->allowRegisterToProject,
                'textNotAllowedRegisterToProject' => $this->textNotAllowedRegisterToProject,
                'participationsOptioned' => $this->participationsOptioned,
                'amountOptioned' => $this->amountOptioned,
                'powerKwhConsumption' => $this->powerKwhConsumption,
        ];
    }
}
