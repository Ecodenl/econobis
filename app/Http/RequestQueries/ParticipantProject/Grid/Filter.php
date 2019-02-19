<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;


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
        'currentParticipations',
        'participationStatusId',
        'dateRegister',
        'energySupplierId',
        'projectId',
    ];

    protected $mapping = [
        'id' => 'participation_project.id',
        'contactType' => 'contacts.type_id',
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'currentParticipations' => 'participation_project.current_participations',
        'participationStatusId' => 'participation_project.status_id',
        'dateRegister' => 'participation_project.date_register',
        'energySupplierId' => 'energy_suppliers.id',
        'projectId' => 'participation_project.project_id',
    ];

    protected $joins = [
        'contactType' => 'contacts',
        'name' => 'contacts',
        'address' => 'addresses',
        'postalCode' => 'addresses',
        'city' => 'addresses',
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
        $query->whereRaw('(participation_project.participations_granted - participation_project.participations_sold) =' . DB::connection()->getPdo()->quote($data))->where('participation_project.status_id', 2);
    }
}