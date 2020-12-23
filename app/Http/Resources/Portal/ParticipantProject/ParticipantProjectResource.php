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
     * @param \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        $projectTypeCodeRef = $this->project->projectType->code_ref;
        $basicInformation = [
            'contactName' => $this->contact ? $this->contact->full_name : '',
            'projectName' => $this->project ? $this->project->name : '',
            'administrationName' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
        ];

        switch ($projectTypeCodeRef) {
            case 'loan':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'fields' => [
                            [
                                'type' => 'string',
                                'label' => 'Contact naam',
                                'value' => $this->contact ? $this->contact->full_name : ''
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Project',
                                'value' => $this->project ? $this->project->name : ''
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : ''
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Huidig saldo lening rekening',
                                'value' => $this->amount_definitive,
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Totale opbrengsten',
                                'value' => $this->participations_returns_total,
                            ],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutationsForPortal')),
                    ];
            case 'obligation':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'fields' => [
                            [
                                'type' => 'string',
                                'label' => 'Contact naam',
                                'value' => $this->contact ? $this->contact->full_name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Project',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Totale opbrengsten',
                                'value' => $this->participations_returns_total,
                            ],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutationsForPortal')),
                    ];
            case 'capital':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'fields' => [
                            [
                                'type' => 'string',
                                'label' => 'Contact naam',
                                'value' => $this->contact ? $this->contact->full_name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Project',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Huidig saldo kapitaal rekening',
                                'value' => $this->participations_capital_worth,
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Totale opbrengsten',
                                'value' => $this->participations_returns_total,
                            ],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutationsForPortal')),
                    ];
            case 'postalcode_link_capital':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'fields' => [
                            [
                                'type' => 'string',
                                'label' => 'Contact naam',
                                'value' => $this->contact ? $this->contact->full_name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Project',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            ['type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Huidig saldo kapitaal rekening',
                                'value' => $this->participations_capital_worth,
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Totale opbrengsten',
                                'value' => $this->participations_returns_total,
                            ],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutationsForPortal')),
                    ];

        }
    }
}
