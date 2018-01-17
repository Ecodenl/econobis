<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Document;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridDocument extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'createdAt' => $this->created_at,
            'filename' => $this->filename,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'documentType' => FullEnumWithIdAndName::make($this->getDocumentType()),
            'documentGroup' => FullEnumWithIdAndName::make($this->getDocumentGroup()),
        ];
    }
}