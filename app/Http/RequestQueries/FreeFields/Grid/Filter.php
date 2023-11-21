<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\FreeFields\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'tableName',
        'fieldName',
        'fieldFormatName'
    ];

    protected $mapping = [
        'tableName' => 'free_fields_tables.name',
        'fieldName' => 'field_name',
        'fieldFormatName' => 'free_fields_field_formats.format_name',
    ];

    protected $joins = [
        'tableName' => 'free_fields_tables',
        'fieldFormatName' => 'free_fields_field_formats',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'tableName' => 'eq',
        'fieldName' => 'ct',
        'fieldFormatName' => 'eq',
    ];

}
