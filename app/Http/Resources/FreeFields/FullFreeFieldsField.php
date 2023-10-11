<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FreeFields;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FullFreeFieldsField extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tableId' => $this->table_id,
            'table' => GenericResource::make($this->whenLoaded('freeFieldsTable')),
            'fieldFormatId' => $this->field_format_id,
            'fieldName' => $this->field_name,
            'fieldFormat' => GenericResource::make($this->whenLoaded('freeFieldsFieldFormat')),
            'visiblePortal' => $this->visible_portal,
            'changePortal' => $this->change_portal,
            'mandatory' => $this->mandatory,
            'defaultValue' => $this->default_value,
            'exportable' => $this->exportable,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'sortOrder' => $this->sort_order,
            'mask' => $this->mask,
        ];
    }
}