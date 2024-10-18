<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\PortalFreeFields;

use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalFreeFieldsPage extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isActive' => $this->is_active,
            'description' => $this->description,
            'urlPageRef' => $this->url_page_ref,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}