<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Project\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'code',
        'name',
        'projectTypeId',
        'amountOfLoanNeeded',
        'amountDefinitive',
    ];

    protected $mapping = [
        'code' => 'projects.code',
        'name' => 'projects.name',
        'projectTypeId' => 'projects.project_type_id',
        'amountOfLoanNeeded' => 'projects.amount_of_loan_needed',
        'amountDefinitive' => 'projects.amount_definitive'
    ];

    protected $joins = [];
}
