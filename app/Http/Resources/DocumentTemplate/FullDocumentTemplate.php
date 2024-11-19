<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\DocumentTemplate;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\GenericResource;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullDocumentTemplate extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'characteristic' => $this->characteristic,
            'htmlBody' => $this->html_body,
            'allowChangeHtmlBody' => $this->allow_change_html_body,
            'documentTemplateType' => FullEnumWithIdAndName::make($this->getTemplateType()),
            'documentGroup' => FullEnumWithIdAndName::make($this->getDocumentGroup()),
            'baseTemplate' => FullDocumentTemplate::make($this->whenLoaded('baseTemplate')),
            'footerTemplate' => FullDocumentTemplate::make($this->whenLoaded('footer')),
            'headerTemplate' => FullDocumentTemplate::make($this->whenLoaded('header')),
            'active' => $this->active,
            'roles' => GenericResource::make($this->whenLoaded('roles')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}