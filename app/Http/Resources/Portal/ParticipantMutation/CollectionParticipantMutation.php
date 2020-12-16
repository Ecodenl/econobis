<?php

namespace App\Http\Resources\Portal\ParticipantMutation;

use App\Eco\ParticipantMutation\ParticipantMutationType;
use Illuminate\Http\Resources\Json\Resource;

class CollectionParticipantMutation extends Resource
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
                        'date' =>  ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry,
                        'fields' => [
                            ['date', 'Datum', ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['string', 'Omschrijving', $this->type->description],
                            ['string', 'Status', $this->status ? $this->status->name : ''],
                            ['decimal', 'Lening rekening', $this->amount],
                            ['decimal', 'Opbrengst', $this->returns],
                            ['string', 'Uitgekeerd op of via', $this->paid_on],
                        ],
                    ];
            case 'obligation':
                return
                    [
                        'fields' => [
                            ['date', 'Datum', ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['string', 'Omschrijving', $this->type->description],
                            ['string', 'Status', $this->status ? $this->status->name : ''],
                            ['integer', 'Aantal obligaties', $this->quantity],
                            ['decimal', 'Opbrengst', $this->returns],
                        ],
                    ];
            case 'capital':
                return
                    [
                        'fields' => [
                            ['date', 'Datum', ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['string', 'Omschrijving', $this->type->description],
                            ['string', 'Status', $this->status ? $this->status->name : ''],
                            ['decimal', 'Kapitaal rekening', ($this->amount + $this->participation_worth)],
                            ['integer', 'Aantal participaties', $this->quantity],
                            ['decimal', 'Opbrengst', $this->returns],
                        ],
                    ];
            case 'postalcode_link_capital':
                return
                    [
                        'fields' => [
                            ['date', 'Datum', ($this->type_id == $mutationResultType) ? $this->date_payment : $this->date_entry],
                            ['string', 'Omschrijving', $this->type->description],
                            ['string', 'Status', $this->status ? $this->status->name : ''],
                            ['decimal', 'Kapitaal rekening', ($this->amount + $this->participation_worth)],
                            ['integer', 'Aantal participaties', $this->quantity],
                            ['decimal', 'Opbrengst', $this->returns],
                            ['string', 'kWh', $this->payout_kwh],
                            ['string', 'Indicatie teruggave EB', $this->indication_of_restitution_energy_tax],
                        ],
                    ];

        }
    }
}
