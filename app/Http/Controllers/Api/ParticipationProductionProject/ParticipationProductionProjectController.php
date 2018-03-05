<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ParticipationProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ParticipantProductionProject\Grid\RequestQuery;
use App\Http\Resources\ParticipantProductionProject\FullParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\GridParticipantProductionProject;
use App\Http\Resources\ParticipantProductionProject\ParticipantProductionProjectPeek;
use Illuminate\Support\Carbon;

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
            'documents',
        ]);

        return FullParticipantProductionProject::make($participantProductionProject);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

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
        $this->authorize('manage', ParticipantProductionProject::class);

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

    public function transfer(RequestInput $requestInput)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        $data = $requestInput
            ->integer('participationId')->validate('required|exists:participation_production_project,id')->alias('participation_id')->next()
            ->integer('transferToContactId')->validate('required')->alias('transfer_to_contact_id')->next()
            ->integer('participationsAmount')->alias('participations_amount')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('didSign')->next()
            ->date('dateBook')->validate('nullable|date')->onEmpty(null)->alias('date_book')->next()
            ->get();

        $participation = ParticipantProductionProject::find($data['participation_id'])->with(['productionProject'])->first();

        $productionProjectId = $participation->productionProject->id;

        $participation->participations_sold = $participation->participations_sold + $data['participations_amount'];
        $participation->save();

        //if 0 then participations are lost
        if($data['transfer_to_contact_id'] != 0){
            //add participations to other contact
            if(ParticipantProductionProject::where('production_project_id', $productionProjectId)->where('contact_id', $data['transfer_to_contact_id'])->exists()){
                $participationReceiving = ParticipantProductionProject::where('production_project_id', $productionProjectId)->where('contact_id', $data['transfer_to_contact_id'])->first();
                $participationReceiving->participations_granted = $participationReceiving->participations_granted + $data['participations_amount'];
                $participationReceiving->save();
            }
            //else create new one
            else{
                $participationReceiving = new ParticipantProductionProject();
                $participationReceiving->contact_id = $data['transfer_to_contact_id'];
                $participationReceiving->status_id = 2;//Definitief
                $participationReceiving->production_project_id = $productionProjectId;
                $participationReceiving->type_id = 1;//Rekening
                $participationReceiving->participations_granted = $data['participations_amount'];
                $participationReceiving->save();
            }

            //create new transaction for receiving
            $transactionReceiving = new ParticipantTransaction();
            $transactionReceiving->participation_id = $participationReceiving->id;
            $transactionReceiving->type_id = 1;//Inleg
            $transactionReceiving->date_transaction = new Carbon;
            $transactionReceiving->amount = $data['participations_amount'] * $data['participation_worth'];
            $transactionReceiving->date_booking = $data['date_book'] ;
            $transactionReceiving->save();

        }

        //create transaction for sending
        $transactionReceiving = new ParticipantTransaction();
        $transactionReceiving->participation_id = $participation->id;
        $transactionReceiving->type_id = 3;//Inleg
        $transactionReceiving->date_transaction = new Carbon;
        $transactionReceiving->amount = $data['participations_amount'] * $data['participation_worth'];
        $transactionReceiving->date_booking = $data['date_book'] ;
        $transactionReceiving->save();

        return $this->show($participation);
    }

    public function destroy(ParticipantProductionProject $participantProductionProject)
    {
        $this->authorize('manage', ParticipantProductionProject::class);

        $participantProductionProject->forceDelete();
    }

    public function peek()
    {
        return ParticipantProductionProjectPeek::collection(ParticipantProductionProject::all()->load(['contact', 'productionProject']));
    }
}