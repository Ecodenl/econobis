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
        'postalCodeNumber',
        'amountDefinitive',
        'participationsDefinitive',
        'dateRegister',
        'datePayed',
        'participationStatusId',
        'contactBirthday',
        'projectId',
        'dateContractSend',
        'dateContractRetour',
        'dateEnd',
        'giftedByContactId',
        'participationsSold',
        'didAcceptAgreement',
        'participationsRequested',
    ];

    protected $mapping = [
        'dateRegister' => 'participation_project.date_register',
        'datePayed' => 'participation_project.date_payed',
        'participationStatusId' => 'participation_project.status_id',
        'projectId' => 'participation_project.project_id',
        'dateContractSend' => 'participation_project.date_contract_send',
        'dateContractRetour' => 'participation_project.date_contract_retour',
        'dateEnd' => 'participation_project.date_end',
        'giftedByContactId' => 'participation_project.gifted_by_contact_id',
        'participationsSold' => 'participation_project.participations_sold',
        'didAcceptAgreement' => 'participation_project.did_accept_agreement',
        'participationsRequested' => 'participation_project.participations_requested',
        'amountDefinitive' => 'participation_project.amount_definitive',
        'participationsDefinitive' => 'participation_project.participations_definitive',
    ];

    protected $joins = [];

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        $raw = DB::raw('participation_project.participations_granted - participation_project.participations_sold');
        RequestFilter::applyFilter($query, $raw, $type, $data);
        $query->where('participation_project.status_id', 2);
        return false;
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

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = DB::raw('SUBSTRING(postal_code, 1, 4)');
        $query->whereHas('contact.primaryAddress', function ($query) use ($raw, $type, $data) {
            RequestFilter::applyFilter($query, $raw, $type, $data);
        });
    }
}