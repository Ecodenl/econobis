<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ContactGroup\GridContacts;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
//        'id',
        'number',
        'typeName',
        'fullName',
        'emailAddress',
    ];

    protected $mapping = [
//        'id' => 'contacts.id',
        'number' => 'contacts.number',
        'typeName' => 'contacts.type_id',
        'fullName' => 'contacts.full_name',
        'emailAddress' => 'email_addresses.email',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
    ];
}
