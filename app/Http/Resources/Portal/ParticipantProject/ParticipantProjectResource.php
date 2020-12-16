<?php

namespace App\Http\Resources\Portal\ParticipantProject;

use App\Http\Resources\Portal\Administration\CollectionAdministration;
use App\Http\Resources\Portal\Contact\CollectionContact;
use App\Http\Resources\Portal\Project\CollectionProject;
use App\Http\Resources\Portal\ParticipantMutation\ParticipantMutationCollection;
use Illuminate\Http\Resources\Json\Resource;

class ParticipantProjectResource extends Resource
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
        $projectTypeCodeRef = $this->project->projectType->code_ref;

        switch ($projectTypeCodeRef){
            case 'loan':
                return
                    [
                        'fields' => [
                            ['string', 'Contact naam', $this->contact ? $this->contact->full_name : ''],
                            ['string', 'Project', $this->project ? $this->project->name : ''],
                            ['string', 'Uitgevende instelling', ($this->project && $this->project->administration) ? $this->project->administration->name : ''],
                            ['decimal', 'Huidig saldo lening rekening', $this->amount_definitive],
                            ['decimal', 'Totale opbrengsten', $this->participations_returns_total],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutations'))->sort(),
                    ];
            case 'obligation':
                return
                    [
                        'fields' => [
                            ['string', 'Contact naam', $this->contact ? $this->contact->full_name : ''],
                            ['string', 'Project', $this->project ? $this->project->name : ''],
                            ['string', 'Uitgevende instelling', ($this->project && $this->project->administration) ? $this->project->administration->name : ''],
                            ['decimal', 'Totale opbrengsten', $this->participations_returns_total],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutations')),
                    ];
            case 'capital':
                return
                    [
                        'fields' => [
                            ['string', 'Contact naam', $this->contact ? $this->contact->full_name : ''],
                            ['string', 'Project', $this->project ? $this->project->name : ''],
                            ['string', 'Uitgevende instelling', ($this->project && $this->project->administration) ? $this->project->administration->name : ''],
                            ['decimal', 'Huidig saldo kapitaal rekening', $this->participations_capital_worth],
                            ['decimal', 'Totale opbrengsten', $this->participations_returns_total],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutations')),
                    ];
            case 'postalcode_link_capital':
                return
                    [
                        'fields' => [
                            ['string', 'Contact naam', $this->contact ? $this->contact->full_name : ''],
                            ['string', 'Project', $this->project ? $this->project->name : ''],
                            ['string', 'Uitgevende instelling', ($this->project && $this->project->administration) ? $this->project->administration->name : ''],
                            ['decimal', 'Huidig saldo kapitaal rekening', $this->participations_capital_worth],
                            ['decimal', 'Totale opbrengsten', $this->participations_returns_total],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutations')),
                    ];

        }
    }
}
