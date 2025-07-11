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
            'participantId' => $this->id,
            'contactName' => $this->contact ? $this->contact->full_name_fnf : '',
            'projectName' => $this->project ? $this->project->name : '',
            'projectId' => $this->project ? $this->project->id : '',
            'allowIncreaseParticipations' => $this->allowIncreaseParticipations,
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
                $textRegisterCurrentBookWorth = $this->project->text_register_current_book_worth ?? 'Huidige hoofdsom';
                $textRegisterParticipationSingular = $this->project->text_register_participation_singular ?? 'obligatie';
                $textRegisterParticipationPlural = $this->project->text_register_participation_plural ?? 'obligaties';

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
                                'label' => 'Inschrijving voor',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Nominale waarde per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->participation_worth : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => $this->capitalizeFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->current_book_worth : '',
                                'dataTip' => 'De ' . $this->lowerCaseFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular) . ' is een administratieve hoofdsom van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De hoofdsom per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Huidig aantal ' . $this->lowerCaseFirstLetter($textRegisterParticipationPlural),
                                'value' => $this->participations_definitive,
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
                $textRegisterCurrentBookWorth = $this->project->text_register_current_book_worth ?? 'Huidige boekwaarde';
                $textRegisterParticipationSingular = $this->project->text_register_participation_singular ?? 'participatie';
                $textRegisterParticipationPlural = $this->project->text_register_participation_plural ?? 'participaties';
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
                                'label' => 'Inschrijving voor',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Nominale waarde per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->participation_worth : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => $this->capitalizeFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->current_book_worth : '',
                                'dataTip' => 'De ' . $this->lowerCaseFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular) . ' is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Huidig aantal ' . $this->lowerCaseFirstLetter($textRegisterParticipationPlural),
                                'value' => $this->participations_definitive,
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
                            [
                                'type' => 'money',
                                'label' => 'Totale indicatie teruggave energiebelasting',
                                'value' => $this->participationsIndicationOfRestitutionEnergyTaxTotal,
                                'dataTip' => 'Elk jaar verdelen we de totale opgewekte kWh over de deelnemers. O.b.v. de vastgestelde teruggave energiebelasting € / kWh berekenen we de indicatie teruggave energiebelasting per deelnemer (euro per kWh x opgewekte kWh per deelnemer). De totale indicatie teruggave energiebelasting is het totaal per deelnemer van alle bedragen indicatie teruggave energiebelasting opgeteld over de jaren heen.'
                            ],
                        ],
                        'participantMutations' => ParticipantMutationCollection::collection($this->whenLoaded('mutationsForPortal')),
                    ];
            case 'capital':
                $textRegisterCurrentBookWorth = $this->project->text_register_current_book_worth ?? 'Huidige boekwaarde';
                $textRegisterParticipationSingular = $this->project->text_register_participation_singular ?? 'participatie';
                $textRegisterParticipationPlural = $this->project->text_register_participation_plural ?? 'participaties';
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
                                'label' => 'Inschrijving voor',
                                'value' => $this->project ? $this->project->name : '',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Uitgevende instelling',
                                'value' => ($this->project && $this->project->administration) ? $this->project->administration->name : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => 'Nominale waarde per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->participation_worth : '',
                            ],
                            [
                                'type' => 'money',
                                'label' => $this->capitalizeFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular),
                                'value' => $this->project ? $this->project->current_book_worth : '',
                                'dataTip' => 'De ' . $this->lowerCaseFirstLetter($textRegisterCurrentBookWorth) . ' per ' . $this->lowerCaseFirstLetter($textRegisterParticipationSingular) . ' is een administratieve boekwaarde van een deelname, die afhankelijk is van de waarde van het project en de gemaakte kosten en wordt vastgesteld o.b.v. de jaarrekening van de coöperatie. De boekwaarde per 1 januari van een jaar gebruik je bij je aangifte inkomstenbelasting.',
                            ],
                            [
                                'type' => 'string',
                                'label' => 'Huidig aantal ' . $this->lowerCaseFirstLetter($textRegisterParticipationPlural),
                                'value' => $this->participations_definitive,
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
    private function capitalizeFirstLetter(string $text): string
    {
        if (!$text) return '';
        return ucfirst($text);
    }

    private function lowerCaseFirstLetter(string $text): string
    {
        if (!$text) return '';
        return lcfirst($text);
    }
}
