<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FreeFields;

use Illuminate\Http\Resources\Json\JsonResource;

class GridFreeFieldRecords extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tableName' => $this->freeFieldsTable->name,
            'fieldName' => $this->field_name,
            'fieldFormatType' => $this->freeFieldsFieldFormat->format_type,
            'fieldRecordValueText' => $this->field_value_text,
            'fieldRecordValueBoolean' => $this->field_value_boolean,
            'fieldRecordValueInt' => $this->field_value_int,
            'fieldRecordValueDouble' => $this->field_value_double,
            'fieldRecordValueDatetime' => $this->field_value_datetime
        ];
    }
}