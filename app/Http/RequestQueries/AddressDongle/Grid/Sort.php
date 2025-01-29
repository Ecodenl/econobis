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
        'address',
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
        'address' => 'addresses.street',
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
        'address' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'typeReadOutName' => 'dongleReadOutType',
        'typeDongleName' => 'dongleType',
    ];

//    protected function applyMeasureNameSort($query, $data)
//    {
//        $query->orderByRaw("
//        CASE
//            WHEN measures.name_custom IS NOT NULL AND measures.name_custom != ''
//                THEN measures.name_custom
//            ELSE measures.name
//        END
//    " . ($data === 'asc' ? ' ASC' : ' DESC'));
//
//        return false;
//    }

}
