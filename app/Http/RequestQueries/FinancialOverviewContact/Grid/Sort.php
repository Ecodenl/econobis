<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\FinancialOverviewContact\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'contact',
        'statusId',
        'dateSent',
        'emailedTo',
    ];

    protected $mapping = [
        'contact' => 'contacts.full_name',
        'statusId' => 'financial_overview_contacts.status_id',
        'dateSent' => 'financial_overview_contacts.date_sent',
        'emailedTo' => 'financial_overview_contacts.emailed_to',
    ];

    protected $joins = [
        'contact' => 'contact',
    ];

//    protected function applyDateRequestedSort($query, $data)
//    {
//        $query->orderByRaw('IFNULL(financial_overview_contacts.date_sent) ' . $data);
//
//        return false;
//    }
}
