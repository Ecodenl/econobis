<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\Request;

class FreeFieldsFieldRecordController extends ApiController
{
    public function getValues(Request $request)
    {
        $this->authorize('view', FreeFieldsField::class);

        $tableId = $request->get('table');
        $recordId = $request->get('id');

        $freeFieldsTable = FreeFieldsTable::where('table', $tableId)->first();

        $freeFieldsFieldRecords = [];
        $freeFieldsFieldTable = FreeFieldsField::where('table_id', $freeFieldsTable->id)->get();
        foreach ($freeFieldsFieldTable as $field)
        {
            $record = FreeFieldsFieldRecord::where('field_id', $field->id)->where('table_record_id', $recordId)->firstOrNew();
            $freeFieldsFieldRecords[] = [
                'id' => $field->id,
                'tableName' => $field->freeFieldsTable->name,
                'fieldName' => $field->field_name,
                'fieldFormatType' => $field->freeFieldsFieldFormat->format_type,
                'fieldRecordValueText' => $record->field_value_text,
                'fieldRecordValueBoolean' => $record->field_value_boolean,
                'fieldRecordValueInt' => $record->field_value_int,
                'fieldRecordValueDouble' => $record->field_value_double,
                'fieldRecordValueDatetime' => $record->field_value_datetime,
            ];
        }

        return response()->json($freeFieldsFieldRecords);

    }
}