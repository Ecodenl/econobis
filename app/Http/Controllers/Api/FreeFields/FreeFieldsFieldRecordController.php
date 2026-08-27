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
use App\Eco\FreeFields\FreeFieldsFieldLog;
use App\Helpers\Excel\FreeFieldsFieldLogExcelHelper;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreeFieldsFieldRecordController extends ApiController
{
    public function getValues(Request $request)
    {
//        $this->authorize('view', FreeFieldsField::class);

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
//        $this->authorize('view', FreeFieldsField::class);

        if( isset($request->get('data')['recordId']) && isset($request->get('data')['records']) ){
            $recordId = $request->get('data')['recordId'];
            $records = $request->get('data')['records'];
            $this->updateRecordValues($recordId, $records, 'econobis', null, Auth::user()->id);

        }

    }
    public function updateValuesFromFreeFieldsContact($contactId, array $records, $changedFrom, $portalUserId)
    {
//        $this->authorize('view', FreeFieldsField::class);

        $this->updateRecordValues($contactId, $records, $changedFrom, $portalUserId, null);

    }
    private function updateRecordValues($recordId, array $records, $changedFrom, $portalUserId, $userId)
    {
        foreach($records as $record) {
            $freeFieldsFieldRecord = FreeFieldsFieldRecord::where('table_record_id', $recordId)->where('field_id', $record['id'])->firstOrNew();
            $freeFieldsFieldRecordValueOld = null;
            $freeFieldsFieldRecordValueNew = null;

            // Id nog niet bekend, dan nieuw! Overnemen: field_id en table_record_id
            if(!isset($freeFieldsFieldRecord->id)) {
                $freeFieldsFieldRecord->field_id = $record['id'];
                $freeFieldsFieldRecord->table_record_id = $recordId;
            }

            switch ($record['fieldFormatType']) {
                case 'boolean':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_boolean;
                    $freeFieldsFieldRecord->field_value_boolean = (bool)$record['fieldRecordValueBoolean'];
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_boolean;
                    break;
                case 'text_short':
                case 'text_long':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_text;
                    $freeFieldsFieldRecord->field_value_text = $record['fieldRecordValueText'];
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_text;
                    break;
                case 'int':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_int;
                    $freeFieldsFieldRecord->field_value_int = $record['fieldRecordValueInt'] != '' ? (int) $record['fieldRecordValueInt'] : null;
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_int;
                    break;
                case 'double_2_dec':
                case 'amount_euro':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_double;
                    $freeFieldsFieldRecord->field_value_double = $record['fieldRecordValueDouble'] != '' ? (double) str_replace(',', '.', $record['fieldRecordValueDouble']) : null;
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_double;
                break;
                case 'date':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_datetime ? Carbon::parse($freeFieldsFieldRecord->field_value_datetime)->format('Y-m-d')  : null;
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d')  : null;
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_datetime;
                    break;
                case 'datetime':
                    $freeFieldsFieldRecordValueOld = $freeFieldsFieldRecord->field_value_datetime ? Carbon::parse($freeFieldsFieldRecord->field_value_datetime)->format('Y-m-d H:i:s') : null;;
                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d H:i:s') : null;
                    $freeFieldsFieldRecordValueNew = $freeFieldsFieldRecord->field_value_datetime;
                    break;
            }

            $freeFieldsFieldRecord->save();

            if($freeFieldsFieldRecordValueOld != $freeFieldsFieldRecordValueNew) {
                FreeFieldsFieldLog::create([
                    'changed_from' => $changedFrom,
                    'portal_user_id' => $portalUserId,
                    'user_id' => $userId,
                    'free_fields_field_record_id' => $freeFieldsFieldRecord->id,
                    'old_value' => $freeFieldsFieldRecordValueOld,
                    'new_value' => $freeFieldsFieldRecordValueNew,
                ]);
            }

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
            $freeFieldsFieldPerTable = FreeFieldsField::where('table_id', $tableId)
                ->orderBy('sort_order')->get();
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
                'changePortal' => $field->change_portal,
                'mandatory' => $field->mandatory,
                'mask' => $field->mask,
            ];
        }

        return response()->json($freeFieldsFieldRecords);
    }


    public function excelLogMutations()
    {
        $this->authorize('view', FreeFieldsFieldLog::class);

        set_time_limit(0);
        $freeFieldsFieldLogs = FreeFieldsFieldLog::where('changed_from', 'portal')->orderBy('updated_at')->get();
        // Als je ook de andere changed_from wil (met 'econobis' erbij), dan where op changed_from weglaten.
        // Er zou ook nog een 3e variant kunnen zijn: 'webform', maar loggen free fields vandaar uit is er nog niet.
//        $freeFieldsFieldLogs = FreeFieldsFieldLog::orderBy('updated_at')->get();

        $freeFieldsFieldLogHelper = new FreeFieldsFieldLogExcelHelper($freeFieldsFieldLogs);

        return $freeFieldsFieldLogHelper->downloadExcel();
    }

}