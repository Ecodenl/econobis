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
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FreeFieldsFieldRecordController extends ApiController
{
    public function getValues(Request $request)
    {
        $this->authorize('view', FreeFieldsField::class);

        $table = $request->get('table');
        $recordId = $request->get('recordId');

        return $this->getFreeFieldsValues(false, $table, $recordId);
    }

    public function getValuesForPortal($table, $recordId)
    {
        return $this->getFreeFieldsValues(true, $table, $recordId);
    }

    public function updateValues(Request $request)
    {

        $recordId = $request->get('data')['recordId'];
//        Log::info(json_encode($request->get('data')['recordId']));
//        Log::info(json_encode($request->get('data')['records']));
        $this->authorize('view', FreeFieldsField::class);

        foreach($request->get('data')['records'] as $record) {

            $freeFieldsFieldRecord = FreeFieldsFieldRecord::where('table_record_id', $recordId)->where('field_id', $record['id'])->firstOrNew();

            // Id nog niet bekend, dan nieuw! Overnemen: field_id en table_record_id
            if(!isset($freeFieldsFieldRecord->id)) {
                $freeFieldsFieldRecord->field_id = $record['id'];
                $freeFieldsFieldRecord->table_record_id = $recordId;
            }

            switch ($record['fieldFormatType']) {
                case 'boolean':
                    $freeFieldsFieldRecord->field_value_boolean = (bool)$record['fieldRecordValueBoolean'];
                    break;
                case 'text_short':
                case 'text_long':
                    $freeFieldsFieldRecord->field_value_text = $record['fieldRecordValueText'];
                    break;
                case 'int':
                    $freeFieldsFieldRecord->field_value_int = (int)$record['fieldRecordValueInt'];
                    break;
                case 'double_2_dec':
                case 'amount_euro':
                    $freeFieldsFieldRecord->field_value_double = (float)$record['fieldRecordValueDouble'];
                    break;
                case 'date':
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d') . ' 00:00:00' : null;
                    break;
                case 'datetime':
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d H:i:s') : null;
                    break;
            }
            $freeFieldsFieldRecord->save();
        }
    }

    /**
     * @param mixed $tableId
     * @param mixed $recordId
     * @return \Illuminate\Http\JsonResponse
     */
    private function getFreeFieldsValues(bool $forPortal, mixed $table, mixed $recordId): \Illuminate\Http\JsonResponse
    {
        $tableId = FreeFieldsTable::where('table', $table)->first()->id;

        $freeFieldsTable = FreeFieldsTable::find($tableId);
        if (!$freeFieldsTable || !$freeFieldsTable->freeFieldsFields) {
            return response()->json([]);
        }

        $freeFieldsFieldRecords = [];
        if($forPortal){
            $freeFieldsFieldPerTable = FreeFieldsField::where('table_id', $tableId)
                ->where('visible_portal', true)
                ->orderBy('sort_order')->get();
        } else {
            $freeFieldsFieldPerTable = FreeFieldsField::where('table_id', $tableId)->orderBy('sort_order')->get();
        }

        foreach ($freeFieldsFieldPerTable as $field) {
            $record = FreeFieldsFieldRecord::where('table_record_id', $recordId)->where('field_id', $field->id)->firstOrNew();

            $fieldRecordValueText = $record->field_value_text;
            $fieldRecordValueBoolean = $record->field_value_boolean;
            $fieldRecordValueInt = $record->field_value_int;
            $fieldRecordValueDouble = $record->field_value_double;
            $fieldRecordValueDatetime = null;
            if ($field->freeFieldsFieldFormat->format_type == 'date') {
                $fieldRecordValueDatetime = $record->field_value_datetime ? Carbon::parse($record->field_value_datetime)->format('Y-m-d') . ' 00:00:00' : null;
            } elseif ($field->freeFieldsFieldFormat->format_type == 'datetime') {
                $fieldRecordValueDatetime = $record->field_value_datetime ? Carbon::parse($record->field_value_datetime)->format('Y-m-d H:i:s') : null;
            }

            // Id nog niet bekend, dan nieuw! Overnemen default waarden indien van toepassing
            if (!isset($record->id)) {
                switch ($field->freeFieldsFieldFormat->format_type) {
                    case 'boolean':
                        $fieldRecordValueBoolean = ($field->default_value == '1' || $field->default_value == 'true');
                        break;
                    case 'text_short':
                    case 'text_long':
                        $fieldRecordValueText = (!empty($field->default_value) ? $field->default_value : null);
                        break;
                    case 'int':
                        $fieldRecordValueInt = (!empty($field->default_value) ? $field->default_value : null);
                        break;
                    case 'double_2_dec':
                    case 'amount_euro':
                        $fieldRecordValueDouble = (!empty($field->default_value) ? $field->default_value : null);
                        break;
                    case 'date':
                    case 'datetime':
                        $fieldRecordValueDatetime = (!empty($field->default_value) ? $field->default_value : null);
                        break;
                }
            }

            $freeFieldsFieldRecords[] = [
                'id' => $field->id,
                'tableName' => $field->freeFieldsTable->name,
                'fieldName' => $field->field_name,
                'fieldFormatType' => $field->freeFieldsFieldFormat->format_type,
                'fieldRecordValueText' => $fieldRecordValueText,
                'fieldRecordValueBoolean' => $fieldRecordValueBoolean,
                'fieldRecordValueInt' => $fieldRecordValueInt,
                'fieldRecordValueDouble' => $fieldRecordValueDouble,
                'fieldRecordValueDatetime' => $fieldRecordValueDatetime,
                'mandatory' => $field->mandatory,
                'mask' => $field->mask,
            ];
        }

        return response()->json($freeFieldsFieldRecords);
    }
}