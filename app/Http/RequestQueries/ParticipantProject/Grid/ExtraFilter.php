<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;
use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\DB;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCode',
        'obligationsDefinitive',
        'participationsDefinitive',
        'postalcodeLinkCapitalDefinitive',
        'loanDefinitive',
        'dateRegister',
        'contactBirthday',
        'projectId',
        'giftedByContactId',
        'participationsSold',
        'didAcceptAgreement',
        'didUnderstandInfo',
        'participationsRequested',
        'participantMutationStatusId',
        'participantMutationTypeId',
        'participantMutationDateContractRetour',
        'participantMutationDatePayment',
        'payoutTypeId',
    ];

    protected $mapping = [
        'dateRegister' => 'participation_project.date_register',
        'projectId' => 'participation_project.project_id',
        'giftedByContactId' => 'participation_project.gifted_by_contact_id',
        'participationsSold' => 'participation_project.participations_sold',
        'didAcceptAgreement' => 'participation_project.did_accept_agreement',
        'dateDidAcceptAgreement' => 'participation_project.date_did_accept_agreement',
        'didUnderstandInfo' => 'participation_project.did_understand_info',
        'dateDidUnderstandInfo' => 'participation_project.date_did_understand_info',
        'participationsRequested' => 'participation_project.participations_requested',
        'amountDefinitive' => 'participation_project.amount_definitive',
        'participationsDefinitive' => 'participation_project.participations_definitive',
        'obligationsDefinitive' => 'participation_project.participations_definitive',
        'participationsDefinitive' => 'participation_project.participations_definitive',
        'postalcodeLinkCapitalDefinitive' => 'participation_project.participations_definitive',
        'loanDefinitive' => 'participation_project.amount_definitive',
        'payoutTypeId' => 'participation_project.type_id',
    ];

    protected $joins = [
    ];

    protected function applyParticipantMutationDateContractRetourFilter($query, $type, $data)
    {
        $query->whereHas('mutations', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'date_contract_retour', $type, $data);
        });
    }
    protected function applyParticipantMutationDatePaymentFilter($query, $type, $data)
    {
        $query->whereHas('mutations', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'date_payment', $type, $data);
        });
    }
    protected function applyParticipantMutationStatusIdFilter($query, $type, $data)
    {
        if($data === 'isTerminated') {
            if($type == 'neq' || $type == 'nl') {
                $query->whereNull('date_terminated');
            } else {
                $query->whereNotNull('date_terminated');
            }
        } else {
            $query->whereHas('mutations', function ($query) use ($type, $data) {
                RequestFilter::applyFilter($query, 'status_id', $type, $data);
            });
            $query->where('date_terminated', null);
        }
    }
    protected function applyParticipantMutationTypeIdFilter($query, $type, $data)
    {
        $query->whereHas('mutations', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'type_id', $type, $data);
        });
    }

    protected function applyNameFilter($query, $type, $data)
    {
        $query->whereHas('contact', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'full_name', $type, $data);
        });
    }

    protected function applyContactBirthdayFilter($query, $type, $data)
    {
        $query->whereHas('contact.person', function ($query) use ($type, $data) {
            RequestFilter::applyFilter($query, 'date_of_birth', $type, $data);
        });
    }

    protected function applyPostalCodeFilter($query, $type, $data)
    {
        $query->whereHas('contact.primaryAddress', function ($query) use ($type, $data) {
            $data = str_replace(' ', '', $data);
            RequestFilter::applyFilter($query, 'postal_code', $type, $data);
        });
    }

}