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
        'contactType' => 'contact',
        'name' => 'contact',
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
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.street', 'LIKE', '%' . $term . '%');
                $query->orWhere('addresses.number', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        $query->whereRaw('(participation_production_project.participations_granted - participation_production_project.participations_sold) =' . DB::connection()->getPdo()->quote($data));
    }
}