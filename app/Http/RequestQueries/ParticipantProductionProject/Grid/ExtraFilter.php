<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;
use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\DB;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCode',
        'postalCodeNumber',
        'currentParticipations',
        'dateRegister',
        'datePayed',
        'participationStatusId',
        'contactBirthday',
        'productionProjectId',
        'dateContractSend',
        'dateContractRetour',
        'dateEnd',
        'giftedByContactId',
        'participationsSold',
        'didAcceptAgreement',
        'participationsRequested',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'dateRegister' => 'participation_production_project.date_register',
        'datePayed' => 'participation_production_project.date_payed',
        'participationStatusId' => 'participation_production_project.status_id',
        'contactBirthday' => 'people.date_of_birth',
        'productionProjectId' => 'participation_production_project.production_project_id',
        'dateContractSend' => 'participation_production_project.date_contract_send',
        'dateContractRetour' => 'participation_production_project.date_contract_retour',
        'dateEnd' => 'participation_production_project.date_end',
        'giftedByContactId' => 'participation_production_project.gifted_by_contact_id',
        'participationsSold' => 'participation_production_project.participations_sold',
        'didAcceptAgreement' => 'participation_production_project.did_accept_agreement',
        'participationsRequested' => 'participation_production_project.participations_requested',
    ];

    protected $joins = [
        'name' => 'contacts',
        'postalCode' => 'addresses',
        'postalCodeNumber' => 'addresses',
        'contactBirthday' => 'people',
    ];

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        $raw = DB::raw('participation_production_project.participations_granted - participation_production_project.participations_sold');
        RequestFilter::applyFilter($query, $raw, $type, $data);
        $query->where('participation_production_project.status_id', 2);
        return false;
    }


    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = DB::raw('SUBSTRING(addresses.postal_code, 1, 4)');
        RequestFilter::applyFilter($query, $raw, $type, $data);
        return false;
    }
}