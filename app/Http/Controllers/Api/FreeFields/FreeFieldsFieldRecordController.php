<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\FreeFields\GridFreeFieldRecords;

class FreeFieldsFieldRecordController extends ApiController
{
    public function grid()
    {
        $this->authorize('view', FreeFieldsField::class);

        $table = $_GET['table'];
        $id =$_GET['id'];

        $freeFieldsTable = FreeFieldsTable::where('table', $table)->first();

        $freeFieldsFieldRecords = FreeFieldsField::select(['*', 'free_fields_fields.id AS freeFieldsFieldId'])->where('table_id', $freeFieldsTable->id)->leftJoin('free_fields_field_records as fffr', function($join) use ($id) {
            $join->on('fffr.field_id', '=', 'free_fields_fields.id')->where('fffr.table_record_id', $id);
        })->get();

        return GridFreeFieldRecords::collection($freeFieldsFieldRecords);
    }

}