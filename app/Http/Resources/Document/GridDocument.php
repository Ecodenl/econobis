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
use Illuminate\Http\Resources\Json\JsonResource;

class GridDocument extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'createdAt' => $this->created_at,
            'filename' => $this->filename,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'documentType' => $this->getDocumentType()->name,
            'documentGroup' => $this->getDocumentGroup()->name,
        ];
    }
}