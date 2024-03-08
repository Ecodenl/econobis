<?php

namespace App\Http\Resources\Portal\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantMutationCollection extends JsonResource
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
        $mutationResultType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $this->participation->project->project_type_id)->first()->id;
        $mutationEnergyTaxRefundType = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->first()->id;
        $projectTypeCodeRef = $this->participation->project->projectType->code_ref;
        $projectTransactionCostsCodeRef = $this->participation->project->transaction_costs_code_ref;
        $projectTextTransactionCosts = $this->participation->project->text_transaction_costs;
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
                $date = $this->date_entry;
                break;
            case null:
                if($this->type_id == $mutationResultType || $this->type_id == $mutationEnergyTaxRefundType){
                    $date = $this->date_payment;
                }
                break;
        }

        switch ($projectTypeCodeRef){
            case 'loan':
                if($projectTransactionCostsCodeRef === 'none'){
                    $fields =
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
                } else {
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'money', 'label' => 'Lening rekening', 'value' => $this->amount],
                                ['type' => 'money', 'label' => $projectTextTransactionCosts, 'value' => $this->transaction_costs_amount],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                                ['type' => 'string', 'label' => 'Uitgekeerd op of via', 'value' => $this->paid_on],
                            ],
                        ];
                }
                return $fields;
            case 'obligation':
                if($projectTransactionCostsCodeRef === 'none'){
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal obligaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Obligatie rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ],
                        ];
                } else {
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal obligaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Obligatie rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => $projectTextTransactionCosts, 'value' => $this->transaction_costs_amount],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ],
                        ];
                }
                return $fields;
            case 'capital':
                if($projectTransactionCostsCodeRef === 'none'){
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ],
                        ];
                } else {
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => $projectTextTransactionCosts, 'value' => $this->transaction_costs_amount],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                            ],
                        ];
                }
                return $fields;
            case 'postalcode_link_capital':
                if($projectTransactionCostsCodeRef === 'none'){
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                                ['type' => 'decimal', 'label' => 'kWh', 'value' => $this->payout_kwh],
                                ['type' => 'money', 'label' => 'Indicatie teruggave EB', 'value' => $this->indication_of_restitution_energy_tax],
                                ['type' => 'date', 'label' => 'Betaal datum', 'value' => $this->date_payment],
                            ],
                        ];
                } else {
                    $fields =
                        [
                            'fields' => [
                                ['type' => 'date', 'label' => 'Datum', 'value' => $date],
                                ['type' => 'string', 'label' => 'Omschrijving', 'value' => $this->type->description],
                                ['type' => 'string', 'label' => 'Status', 'value' => $this->status ? $this->status->name : ''],
                                ['type' => 'integer', 'label' => 'Aantal participaties', 'value' => $this->quantity],
                                ['type' => 'money', 'label' => 'Kapitaal rekening', 'value' => ($this->amount + $this->participation_worth)],
                                ['type' => 'money', 'label' => $projectTextTransactionCosts, 'value' => $this->transaction_costs_amount],
                                ['type' => 'money', 'label' => 'Opbrengst', 'value' => $this->returns],
                                ['type' => 'decimal', 'label' => 'kWh', 'value' => $this->payout_kwh],
                                ['type' => 'money', 'label' => 'Indicatie teruggave EB', 'value' => $this->indication_of_restitution_energy_tax],
                                ['type' => 'date', 'label' => 'Betaal datum', 'value' => $this->date_payment],
                            ],
                        ];
                }
                return $fields;
        }
    }
}
