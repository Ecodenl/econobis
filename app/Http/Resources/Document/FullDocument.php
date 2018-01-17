<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Document;


use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullDocument extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'description' => $this->description,
            'documentType' => FullEnumWithIdAndName::make($this->getDocumentType()),
            'documentGroup' => FullEnumWithIdAndName::make($this->getDocumentGroup()),
            'freeText1' => $this->free_text_1,
            'freeText2' => $this->free_text_2,
            'filename' => $this->filename,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'contactGroup' => FullContactGroup::make($this->whenLoaded('contactGroup')),
            'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
            'sentBy' => FullUser::make($this->whenLoaded('sentBy')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}