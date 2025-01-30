<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\AddressDongle\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'streetAndNumber',
        'fullName',
        'postalCode',
        'city',
        'typeReadOutId',
        'dateStart',
        'dateEnd',
        'typeDongleId',
        'energyId',
//        'macNumber',
//        'dateSigned',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'typeReadOutName' => 'address_dongle_read_out_types.name',
        'dateStart' => 'date_start',
        'dateEnd' => 'date_end',
        'typeDongleName' => 'address_dongle_types.name',
        'energyId' => 'energy_id',
//        'macNumber' => 'mac_number',
//        'dateSigned' => 'date_signed',
    ];

    protected $joins = [
        'fullName' => 'contact',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'typeReadOutName' => 'dongleReadOutType',
        'typeDongleName' => 'dongleType',
    ];

    protected function applyStreetAndNumberSort($query, $data)
    {
        $query->orderBy('addresses.street', $data)->orderBy('addresses.number', $data)->orderBy('addresses.addition', $data);

        return false;
    }

}
