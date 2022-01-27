<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class GridProject extends JsonResource
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
                'code' => $this->code,
                'name' => $this->name,
                'projectType' => optional($this->projectType)->name,
                'projectTypeCodeRef' => optional($this->projectType)->code_ref,
                'totalParticipations' => $this->total_participations,
                'participationsDefinitive' => $this->participations_definitive,
                'amountOfLoanNeeded' => $this->amount_of_loan_needed,
                'amountDefinitive' => $this->amount_definitive,
            ];
    }
}
