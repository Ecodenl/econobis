<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Intake\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'createdAt',
        'fullName',
        'address',
        'measureRequestedId',
        'statusId',
    ];

    protected $mapping = [
        'createdAt' => 'intakes.created_at',
        'fullName' => 'contacts.full_name',
        'statusId' => 'intakes.intake_status_id',
        'measureRequestedId' => 'measure_requested_address.measure_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'sourceId' => 'source',
        'measureRequestedId' => 'measureRequested',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'measureRequestedId' => 'eq',
        'statusId' => 'eq',
    ];

    protected function applyAddressFilter($query, $type, $data)
    {
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.street', 'LIKE', '%' . $term . '%');
                $query->orWhere('adresses.number', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }
}
