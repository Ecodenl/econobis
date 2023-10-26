<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Document;

use App\Http\Resources\Contact\FullContact;
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
            'documentCreatedFromName' => optional($this->documentCreatedFrom)->name,
            'documentType' => $this->getDocumentType()->name,
            'documentGroup' => $this->getDocumentGroup()->name,
        ];
    }
}