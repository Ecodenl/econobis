<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCode',
        'postalCodeNumber',
        'currentParticipations',
        'dateRegister',
        'datePayed',
        'participationStatus',
        'contactStatus',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'dateRegister' => 'participation_production_project.date_register',
        'datePayed' => 'participation_production_project.date_payed',
        'participationStatus' => 'participation_production_project.status_id',
        'contactStatus' => 'contacts.status_id',
    ];

    protected $joins = [
        'name' => 'contact',
        'postalCode' => 'addresses',
        'postalCodeNumber' => 'addresses',
        'contactStatus' => 'contact',
    ];

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        $raw = 'participation_production_project.participations_granted - participation_production_project.participations_sold';
        RequestExtraFilter::applyWhereRaw($query, $raw, $type, $data);
        return false;
    }

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = 'SUBSTRING(addresses.postal_code, 1, 4)';
        RequestExtraFilter::applyWhereRaw($query, $raw, $type, $data);
        return false;
    }
}