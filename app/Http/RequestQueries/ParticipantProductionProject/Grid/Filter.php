<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\DB;

class Filter extends RequestFilter
{
    protected $fields = [
        'id',
        'contactType',
        'name',
        'address',
        'postalCode',
        'city',
        'statusId',
        'currentParticipations',
        'participationStatusId',
        'dateRegister',
        'energySupplierId'
    ];

    protected $mapping = [
        'id' => 'participation_production_project.id',
        'contactType' => 'contacts.type_id',
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'statusId' => 'contacts.status_id',
        'currentParticipations' => 'participation_production_project.current_participations',
        'participationStatusId' => 'participation_production_project.status_id',
        'dateRegister' => 'participation_production_project.date_register',
        'energySupplierId' => 'energy_suppliers.id',
    ];

    protected $joins = [
        'contactType' => 'contacts',
        'name' => 'contacts',
        'address' => 'addresses',
        'postalCode' => 'addresses',
        'city' => 'addresses',
        'statusId' => 'contacts',
        'energySupplierId' => 'energy_suppliers',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'id' => 'eq',
        'contactType' => 'eq',
        'statusId' => 'eq',
        'participationStatusId' => 'eq',
        'energySupplierId' => 'eq',
    ];

    protected function applyAddressFilter($query, $type, $data)
    {
        $data = str_replace(' ', '', $data);

        $query->whereRaw('concat(IFNULL(addresses.street,\'\'), IFNULL(addresses.number,\'\'),  IFNULL(addresses.addition,\'\')) LIKE ' . DB::connection()->getPdo()->quote('%' . $data . '%'));

        return false;
    }

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) =' . DB::connection()->getPdo()->quote($data))->where('status_id', 2);
    }
}