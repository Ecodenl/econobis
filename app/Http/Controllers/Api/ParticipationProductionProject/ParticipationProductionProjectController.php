<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProductionProject;

use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ParticipantProductionProject\Grid\RequestQuery;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\GridParticipantProductionProject;

class ParticipationProductionProjectController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $participantProductionProject = $requestQuery->get();

        $participantProductionProject->load([
        'contact.primaryContactEnergySupplier.energySupplier',
        'contact.primaryAddress',
        'participantProductionProjectStatus',
    ]);

        return GridParticipantProductionProject::collection($participantProductionProject)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
            ]
            ]);
    }


    public function show(ParticipantProductionProject $participantProductionProject)
    {
        $participantProductionProject->load([
            'contact',
            'productionProject',
            'participantProductionProjectStatus',
            'participantProductionProjectPayoutType',
            'giftedByContact',
            'legalRepContact',
            'transactions.type',
            'transactions.createdBy',
            'obligationNumbers',
        ]);

        return FullParticipantProductionProject::make($participantProductionProject);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('contactId')->validate('required|exists:contacts,id')->alias('contact_id')->next()
            ->integer('statusId')->validate('required|exists:participant_production_project_status,id')->alias('status_id')->next()
            ->integer('productionProjectId')->validate('required|exists:production_projects,id')->alias('production_project_id')->next()
            ->date('dateRegister')->validate('nullable|date')->onEmpty(null)->alias('date_register')->next()
            ->integer('participationsRequested')->alias('participations_requested')->next()
            ->integer('participationsGranted')->alias('participations_granted')->next()
            ->integer('participationsSold')->alias('participations_sold')->next()
            ->integer('participationsRestSale')->alias('participations_rest_sale')->next()
            ->date('dateContractSend')->validate('nullable|date')->onEmpty(null)->alias('date_contract_send')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayed')->validate('nullable|date')->onEmpty(null)->alias('date_payed')->next()
            ->string('ibanPayed')->alias('iban_payed')->next()
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->string('ibanAttn')->alias('iban_attn')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->integer('typeId')->validate('nullable|exists:participant_production_project_payout_type,id')->onEmpty(null)->alias('type_id')->next()
            ->get();

        $participantProductionProject = new ParticipantProductionProject();

        $participantProductionProject->fill($data);

        $participantProductionProject->save();

        return $this->show($participantProductionProject);
    }


    public function update(RequestInput $requestInput, ParticipantProductionProject $participantProductionProject)
    {
        $data = $requestInput
            ->integer('statusId')->validate('required|exists:participant_production_project_status,id')->alias('status_id')->next()
            ->date('dateRegister')->validate('nullable|date')->onEmpty(null)->alias('date_register')->next()
            ->integer('participationsRequested')->alias('participations_requested')->next()
            ->integer('participationsGranted')->alias('participations_granted')->next()
            ->integer('participationsSold')->alias('participations_sold')->next()
            ->integer('participationsRestSale')->alias('participations_rest_sale')->next()
            ->date('dateContractSend')->validate('nullable|date')->onEmpty(null)->alias('date_contract_send')->next()
            ->date('dateContractRetour')->validate('nullable|date')->onEmpty(null)->alias('date_contract_retour')->next()
            ->date('datePayed')->validate('nullable|date')->onEmpty(null)->alias('date_payed')->next()
            ->string('ibanPayed')->alias('iban_payed')->next()
            ->boolean('didAcceptAgreement')->alias('did_accept_agreement')->next()
            ->string('ibanAttn')->alias('iban_attn')->next()
            ->integer('giftedByContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('gifted_by_contact_id')->next()
            ->string('ibanPayout')->alias('iban_payout')->next()
            ->integer('legalRepContactId')->validate('nullable|exists:contacts,id')->onEmpty(null)->alias('legal_rep_contact_id')->next()
            ->string('ibanPayoutAttn')->alias('iban_payout_attn')->next()
            ->date('dateEnd')->validate('nullable|date')->onEmpty(null)->alias('date_end')->next()
            ->integer('typeId')->validate('required|exists:participant_production_project_payout_type,id')->alias('type_id')->next()
            ->get();

        $participantProductionProject->fill($data);

        $participantProductionProject->save();

        return $this->show($participantProductionProject);
    }

    public function destroy(ParticipantProductionProject $participantProductionProject)
    {
        $participantProductionProject->forceDelete();
    }
}