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
use Illuminate\Support\Facades\Log;

class FreeFieldsFieldRecordController extends ApiController
{
    public function getValues(Request $request)
    {
        $this->authorize('view', FreeFieldsField::class);

        $tableId = $request->get('table');
        $recordId = $request->get('id');

        $freeFieldsTable = FreeFieldsTable::where('table', $tableId)->first();

        $freeFieldsFieldRecords = [];
        $freeFieldsFieldTable = FreeFieldsField::where('table_id', $freeFieldsTable->id)->orderBy('sort_order')->get();
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
                'mandatory' => $field->mandatory,
                'mask' => $field->mask,
            ];
        }

        return response()->json($freeFieldsFieldRecords);
    }

    public function updateValues(Request $request)
    {
        Log::info(json_encode($request->get('data')['records']));
        $this->authorize('view', FreeFieldsField::class);

        foreach($request->get('data')['records'] as $record) {

            $freeFieldsFieldRecord = FreeFieldsFieldRecord::where('field_id', $record['id'])->firstOrNew();

            if(!isset($freeFieldsFieldRecord->id)) {
                $freeFieldsFieldRecord->field_id = $record['id'];
                $freeFieldsFieldRecord->table_record_id = $request->get('data')['objectId'];
            }

            switch ($record['fieldFormatType']) {
                case 'boolean':
                    $freeFieldsFieldRecord->field_value_boolean = $record['fieldRecordValueBoolean'];
                    break;
                case 'text_short':
                    $freeFieldsFieldRecord->field_value_text = $record['fieldRecordValueText'];
                    break;
                case 'text_long':
                    $freeFieldsFieldRecord->field_value_text = $record['fieldRecordValueText'];
                    break;
                case 'int':
                    $freeFieldsFieldRecord->field_value_int = $record['fieldRecordValueInt'];
                    break;
                case 'double_2_dec':
                    $freeFieldsFieldRecord->field_value_double = $record['fieldRecordValueDouble'];
                    break;
                case 'amount_euro':
                    $freeFieldsFieldRecord->field_value_double = $record['fieldRecordValueDouble'];
                    break;
                case 'date':
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'];
                    break;
                case 'datetime':
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'];
                    break;
            }
            $freeFieldsFieldRecord->save();
        }
    }
}