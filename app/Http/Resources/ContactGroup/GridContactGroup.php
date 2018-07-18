<?php

namespace App\Http\Resources\ContactGroup;

use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridContactGroup extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        if($this->type_id === 'static'){
            $numberOfContacts = $this->contacts()->count();
        }
        else if($this->type_id === 'dynamic'){
            $numberOfContacts = $this->dynamic_contacts->total();
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'numberOfContacts' => $numberOfContacts,
            'closed' => $this->closed,
            'closedStatus' => $this->present()->closedStatus(),
            'type' => FullEnumWithIdAndName::make($this->getType()),
        ];
    }
}
