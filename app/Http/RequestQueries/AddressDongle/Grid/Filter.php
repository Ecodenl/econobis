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
use Illuminate\Support\Facades\DB;

class Filter extends RequestFilter
{
    protected $fields = [
        'streetAndNumber',
        'fullName',
        'postalCode',
        'city',
        'typeReadOutId',
        'dateStartStart',
        'dateStartEnd',
        'dateEndStart',
        'dateEndEnd',
        'typeDongleId',
        'energyId',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'typeReadOutId' => 'type_read_out_id',
        'energyId' => 'energy_id',
        'typeDongleId' => 'type_dongle_id',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'status' => 'eq',
    ];

    protected function applyStreetAndNumberFilter($query, $type, $data)
    {
        $data = str_replace(' ', '', $data);

        $query->whereRaw('concat(IFNULL(addresses.street,\'\'), IFNULL(addresses.number,\'\'),  IFNULL(addresses.addition,\'\')) LIKE ' . DB::connection()->getPdo()->quote('%' . $data . '%'));

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
}
