<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\FinancialOverviewContact\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields
        = [
            'contact',
            'statusId',
            'dateSent',
            'emailedTo',
        ];

    protected $mapping
        = [
            'contact' => 'contacts.full_name',
            'statusId' => 'financial_overview_contacts.status_id',
            'dateSent' => 'financial_overview_contacts.date_sent',
            'emailedTo' => 'financial_overview_contacts.emailed_to',
        ];

    protected $joins
        = [
            'contact' => 'contact',
        ];

    protected $defaultTypes
        = [
            '*' => 'ct',
            'statusId' => 'eq',
        ];

}
