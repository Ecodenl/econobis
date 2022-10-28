<?php

namespace App\Http\Resources\Portal\ParticipantProject;

use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\Portal\ParticipantMutation\ParticipantMutationCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantProjectResource extends JsonResource
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
            'contactName' => $this->contact ? $this->contact->full_name_fnf : '',
            'projectName' => $this->project ? $this->project->name : '',
            'administrationName' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
            'portalSettingsLayoutAssigned' => ($this->project && $this->project->administration) ? $this->project->administration->portalSettingsLayoutAssigned : '',
        ];
        //todo WM: nog wijzigen (zie bijv. FullIntake
        $documents = [
            'documentCountOnPortal' => $this->documentsOnPortal()->count(),
            'relatedDocumentsOnPortal' => FullDocument::collection($this->whenLoaded('documentsOnPortal')),
            'documentProjectCountOnPortal' => $this->project ? $this->project->documentsOnPortal->count() : 0,
            'relatedDocumentsProjectOnPortal' => FullDocument::collection($this->project ? $this->project->documentsOnPortal : ''),
        ];

        switch ($projectTypeCodeRef) {
            case 'loan':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'documents' => $documents,
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
                        'documents' => $documents,
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
            case 'postalcode_link_capital':
            case 'capital':
                return
                    [
                        'basicInformation' => $basicInformation,
                        'documents' => $documents,
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

        }
    }
}
