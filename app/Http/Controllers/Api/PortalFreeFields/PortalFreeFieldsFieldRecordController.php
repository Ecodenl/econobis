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
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Http\Controllers\Api\ApiController;
use Carbon\Carbon;

class PortalFreeFieldsFieldRecordController extends ApiController
{
    public function getValuesForPortal($urlPageRef, $table, $recordId)
    {
        return $this->getPortalFreeFieldsValues($table, $urlPageRef, $recordId);
    }

    /**
     * @param mixed $tableId
     * @param mixed $recordId
     * @return \Illuminate\Http\JsonResponse
     */
    private function getPortalFreeFieldsValues(mixed $table, mixed $urlPageRef, mixed $recordId): \Illuminate\Http\JsonResponse
    {
        // Retrieve table ID based on table name
        $tableId = FreeFieldsTable::where('table', $table)->first()->id;

        // Retrieve page ID based on URL reference
        $pageId = PortalFreeFieldsPage::where('url_page_ref', $urlPageRef)->first()->id;

        // Get fields linked to the specified table and page, ordered by sort order
        $fields = FreeFieldsField::where('table_id', $tableId)
            ->whereHas('portalFreeFieldsFields', function ($query) use ($pageId) {
                $query->where('page_id', $pageId);
            })
            ->orderBy('sort_order')
            ->get();

        $portalFreeFieldsFieldRecords = [];

        foreach ($fields as $field) {
            // Fetch the `PortalFreeFieldsField` relation to access `change_portal` from `portal_free_fields_fields`
            $portalField = $field->portalFreeFieldsFields()
                ->where('page_id', $pageId)
                ->first();

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

            // Populate the result array, using `change_portal` from the `portal_free_fields_fields` table
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
                'changePortal' => $portalField->change_portal ?? null, // Accessing `change_portal` from `portal_free_fields_fields`
                'mandatory' => $field->mandatory,
                'mask' => $field->mask,
            ];
        }

//        Log::info('portalFreeFieldsFieldRecords ');
//        Log::info($portalFreeFieldsFieldRecords);

        return response()->json($portalFreeFieldsFieldRecords);
    }
}