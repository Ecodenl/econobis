<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\PortalFreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Eco\PortalFreeFields\PortalFreeFieldsField;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PortalFreeFieldsFieldRecordController extends ApiController
{
//    public function getValues(Request $request)
//    {
////        $this->authorize('view', FreeFieldsField::class);
//
//        $table = $request->get('table');
//        $recordId = $request->get('recordId');
//
//        return $this->getFreeFieldsValues(false, $table, $recordId);
//    }
//
    public function getValuesForPortal($urlPageRef, $table, $recordId)
    {
        return $this->getPortalFreeFieldsValues($table, $urlPageRef, $recordId);
    }

//    public function updateValues(Request $request)
//    {
//        $recordId = $request->get('data')['recordId'];
////        $this->authorize('view', FreeFieldsField::class);
//
//        foreach($request->get('data')['records'] as $record) {
//
//            $freeFieldsFieldRecord = FreeFieldsFieldRecord::where('table_record_id', $recordId)->where('field_id', $record['id'])->firstOrNew();
//
//            // Id nog niet bekend, dan nieuw! Overnemen: field_id en table_record_id
//            if(!isset($freeFieldsFieldRecord->id)) {
//                $freeFieldsFieldRecord->field_id = $record['id'];
//                $freeFieldsFieldRecord->table_record_id = $recordId;
//            }
//
//            switch ($record['fieldFormatType']) {
//                case 'boolean':
//                    $freeFieldsFieldRecord->field_value_boolean = (bool)$record['fieldRecordValueBoolean'];
//                    break;
//                case 'text_short':
//                case 'text_long':
//                    $freeFieldsFieldRecord->field_value_text = $record['fieldRecordValueText'];
//                    break;
//                case 'int':
//                    $freeFieldsFieldRecord->field_value_int = $record['fieldRecordValueInt'] != '' ? (int)$record['fieldRecordValueInt'] : null;
//                    break;
//                case 'double_2_dec':
//                case 'amount_euro':
//                    $freeFieldsFieldRecord->field_value_double = $record['fieldRecordValueDouble'] != '' ? (float)$record['fieldRecordValueDouble'] : null;
//                    break;
//                case 'date':
//                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d') . ' 00:00:00' : null;
//                    break;
//                case 'datetime':
//                    $freeFieldsFieldRecord->field_value_datetime = $record['fieldRecordValueDatetime'] ? Carbon::parse($record['fieldRecordValueDatetime'])->format('Y-m-d H:i:s') : null;
//                    break;
//            }
//
//            $freeFieldsFieldRecord->save();
//        }
//    }

    /**
     * @param mixed $tableId
     * @param mixed $recordId
     * @return \Illuminate\Http\JsonResponse
     */
    private function getPortalFreeFieldsValues(mixed $table, mixed $urlPageRef, mixed $recordId): \Illuminate\Http\JsonResponse
    {
        $tableId = FreeFieldsTable::where('table', $table)->first()->id;
Log::info('urlPageRef ' . $urlPageRef);
        $pageId = PortalFreeFieldsPage::where('url_page_ref', $urlPageRef)->first()->id;
Log::info('pageId ' . $pageId);

        $fields = FreeFieldsField::where('table_id', $tableId)
            ->whereHas('portalFreeFieldsFields', function ($query) use ($pageId) {
                $query->where('page_id', $pageId); // Filter to fields that are related to the specified page
            })
            ->orderBy('sort_order') // Apply sorting by `sort_order`
            ->get();
        Log::info('fields ' . $fields);

        $portalFreeFieldsFieldRecords = [];

        foreach ($fields as $field) {
            // Fetch or initialize the FreeFieldsFieldRecord based on `table_record_id` and `field_id`
            $record = FreeFieldsFieldRecord::where('table_record_id', $recordId)
                ->where('field_id', $field->id)
                ->firstOrNew();

            // Define each field's value based on format type
            $fieldRecordValueText = $record->field_value_text;
            $fieldRecordValueBoolean = $record->field_value_boolean;
            $fieldRecordValueInt = $record->field_value_int;
            $fieldRecordValueDouble = $record->field_value_double;
            $fieldRecordValueDatetime = null;

            // Handle date and datetime formatting if applicable
            if ($field->freeFieldsFieldFormat->format_type == 'date') {
                $fieldRecordValueDatetime = $record->field_value_datetime
                    ? Carbon::parse($record->field_value_datetime)->format('Y-m-d') . ' 00:00:00'
                    : null;
            } elseif ($field->freeFieldsFieldFormat->format_type == 'datetime') {
                $fieldRecordValueDatetime = $record->field_value_datetime
                    ? Carbon::parse($record->field_value_datetime)->format('Y-m-d H:i:s')
                    : null;
            }

            // Apply default values if the record is new
            if (!isset($record->id)) {
                switch ($field->freeFieldsFieldFormat->format_type) {
                    case 'boolean':
                        $fieldRecordValueBoolean = ($field->default_value == '1' || $field->default_value == 'true');
                        break;
                    case 'text_short':
                    case 'text_long':
                        $fieldRecordValueText = $field->default_value ?: null;
                        break;
                    case 'int':
                        $fieldRecordValueInt = $field->default_value ?: null;
                        break;
                    case 'double_2_dec':
                    case 'amount_euro':
                        $fieldRecordValueDouble = $field->default_value ?: null;
                        break;
                    case 'date':
                    case 'datetime':
                        $fieldRecordValueDatetime = $field->default_value ?: null;
                        break;
                }
            }

            // Add each field’s record data to the results array
            $portalFreeFieldsFieldRecords[] = [
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

        Log::info('portalFreeFieldsFieldRecords ');
        Log::info($portalFreeFieldsFieldRecords);

        return response()->json($portalFreeFieldsFieldRecords);
    }
}