<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FreeFields;

use Illuminate\Http\Resources\Json\JsonResource;

class GridFreeFieldsField extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tableName' => $this->freeFieldsTable->name,
            'fieldName' => $this->field_name,
            'fieldFormatName' => $this->freeFieldsFieldFormat->format_name,
            'sortOrder' => $this->sort_order
        ];
    }
}