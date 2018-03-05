<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
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
        'participationStatusId' => 'participation_production_project.status_id',
        'dateRegister' => 'participation_production_project.date_register',
        'energySupplierId' => 'energy_suppliers.id',
    ];

    protected $joins = [
        'contactType' => 'contact',
        'name' => 'contact',
        'address' => 'addresses',
        'postalCode' => 'addresses',
        'city' => 'addresses',
        'statusId' => 'contacts',
        'energySupplierId' => 'energy_suppliers',
    ];
}