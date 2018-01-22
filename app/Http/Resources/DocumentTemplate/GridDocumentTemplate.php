<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\DocumentTemplate;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridDocumentTemplate extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'createdAt' => $this->created_at,
            'name' => $this->name,
            'documentGroup' => FullEnumWithIdAndName::make($this->getDocumentGroup()),
            'documentTemplateType' => FullEnumWithIdAndName::make($this->getTemplateType()),
            'active' => $this->active,
        ];
    }
}