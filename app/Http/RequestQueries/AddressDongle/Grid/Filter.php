<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\AddressDongle\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'address',
        'fullName',
        'postalCode',
        'city',
        'typeReadOut',
        'dateStart',
        'dateStartStart',
        'dateStartEnd',
        'dateEnd',
        'dateEndStart',
        'dateEndEnd',
        'typeDongle',
        'energyId',
//        'macNumber',
//        'dateSigned',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'typeReadOut' => 'type_read_out',
        'dateStart' => 'date_start',
        'dateEnd' => 'date_end',
        'typeDongle' => 'type_dongle',
        'energyId' => 'energy_id',
//        'macNumber' => 'mac_number',
//        'dateSigned' => 'date_signed',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'status' => 'eq',
    ];

    protected function applyAddressFilter($query, $type, $data) {
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

    protected function applyPostalCodeFilter($query, $type, $data) {
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.postal_code', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyCityFilter($query, $type, $data) {
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.city', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }

    protected function applyDateStartStartFilter($query, $type, $data)
    {
        $query->where('date_start', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyDateStartEndFilter($query, $type, $data)
    {
        $query->where('date_start', '<=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyDateEndStartFilter($query, $type, $data)
    {
        $query->where('date_end', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyDateEndEndFilter($query, $type, $data)
    {
        $query->where('date_end', '<=', Carbon::parse($data)->startOfDay());
        return false;
    }
//    protected function applyDateSignedStartFilter($query, $type, $data)
//    {
//        $query->where('date_signed', '>=', Carbon::parse($data)->startOfDay());
//        return false;
//    }
//    protected function applyDateSignedEndFilter($query, $type, $data)
//    {
//        $query->where('date_signed', '<=', Carbon::parse($data)->startOfDay());
//        return false;
//    }
}
