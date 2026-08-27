<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ContactGroup\GridContacts;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'fullName',
        'emailAddress',
    ];

    protected $mapping = [
        'fullName' => 'contacts.full_name',
        'emailAddress' => 'email_addresses.email',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
    ];

}
