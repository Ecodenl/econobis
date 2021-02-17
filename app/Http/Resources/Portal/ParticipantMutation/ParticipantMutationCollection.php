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
        $mutationEnergyTaxRefundType = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->first()->id;
        $projectTypeCodeRef = $this->participation->project->projectType->code_ref;
        $statusCodeRef = $this->status ? $this->status->code_ref : '';
        $date = $this->date_entry;
        switch ($statusCodeRef) {
            case 'interest':
                $date = $this->date_interest;
                break;
            case 'option':
                $date = $this->date_option;
                break;
            case 'granted':
                $date = $this->date_granted;
                break;
            case 'final':
                if($this->type_id == $mutationResultType || $this->type_id == $mutationEnergyTaxRefundType){
                    $date = $this->date_payment;
                }
                break;
        }

        switch ($projectTypeCodeRef){
            case 'loan':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'money', 'label' => 'Lening rekening', 'value' => $this->amount],
                            ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ['type' => 'string', 'label' => 'Uitgekeerd op of via', 'value' => $this->paid_on],
                        ],
                    ];
            case 'obligation':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'integer', 'label' => 'Aantal obligaties', 'value' => $this->quantity],
                            ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                        ],
                    ];
            case 'capital':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                            ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                            ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                        ],
                    ];
            case 'postalcode_link_capital':
                return
                    [
                        'fields' => [
                            ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                            ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                            ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                            ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                            ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                            ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ['type' => 'string', 'label' => 'kWh', 'value' => $this->payout_kwh],
                            ['type' => 'string', 'label' => 'Indicatie teruggave EB', 'value' => $this->indication_of_restitution_energy_tax],
                        ],
                    ];

        }
    }
}
