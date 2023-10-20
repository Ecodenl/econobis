<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\FreeFields\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

class Joiner extends RequestJoiner
{
    protected function applyFreeFieldsTablesJoin($query)
    {
        $query->join('free_fields_tables', 'free_fields_fields.table_id', '=', 'free_fields_tables.id');
    }
    protected function applyFreeFieldsFieldFormatsJoin($query)
    {
        $query->join('free_fields_field_formats', 'free_fields_fields.field_format_id', '=', 'free_fields_field_formats.id');
    }
}