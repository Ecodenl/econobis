<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Team;

use App\Http\Resources\ContactGroup\TeamContactGroup;
use App\Http\Resources\District\TeamDistrict;
use App\Http\Resources\Document\TeamDocumentCreatedFrom;
use App\Http\Resources\User\TeamUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullTeam extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'users' => TeamUser::collection($this->whenLoaded('users')),
            'contactGroups' => TeamContactGroup::collection($this->whenLoaded('contactGroups')),
            'documentCreatedFroms' => TeamDocumentCreatedFrom::collection($this->whenLoaded('documentCreatedFroms')),
            'districts' => TeamDistrict::collection($this->whenLoaded('districts')),
        ];
    }
}