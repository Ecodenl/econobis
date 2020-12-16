<?php

namespace App\Http\Resources\Portal\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Illuminate\Http\Resources\Json\Resource;

class ParticipantMutationCollection extends Resource
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
        $mutationResultType = ParticipantMutationType::where('code_ref', 'result')->first()->id;
        $projectTypeCodeRef = $this->participation->project->projectType->code_ref;

        switch ($projectTypeCodeRef){
            case 'loan':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'decimal', 'label' => 'Lening rekening', 'value' => $this->amount],
                            ['type' => 'decimal', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ['type' => 'string', 'label' => 'Uitgekeerd op of via', 'value' => $this->paid_on],
                        ],
                    ];
            case 'obligation':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'integer', 'label' => 'Aantal obligaties', 'value' => $this->quantity],
                            ['type' => 'decimal', 'label' => 'Opbrengst', 'value' => $this->returns],
                        ],
                    ];
            case 'capital':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'decimal', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                            ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                            ['type' => 'decimal', 'label' => 'Opbrengst', 'value' => $this->returns],
                        ],
                    ];
            case 'postalcode_link_capital':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'decimal', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                            ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                            ['type' => 'decimal', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ['type' => 'string', 'label' => 'kWh', 'value' => $this->payout_kwh],
                            ['type' => 'string', 'label' => 'Indicatie teruggave EB', 'value' => $this->indication_of_restitution_energy_tax],
                        ],
                    ];

        }
    }
}
