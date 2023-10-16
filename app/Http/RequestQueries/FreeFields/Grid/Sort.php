<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\FreeFields\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{
    protected $fields = [
        'tableName',
        'fieldName',
        'fieldFormatName',
        'sortOrder'
    ];

    protected $mapping = [
        'tableName' => 'free_fields_tables.name',
        'fieldName' => 'field_name',
        'fieldFormatName' => 'free_fields_field_formats.format_name',
        'sortOrder' => 'sort_order'
    ];

    protected $joins = [
        'tableName' => 'free_fields_tables',
        'fieldFormatName' => 'free_fields_field_formats',
    ];
}
