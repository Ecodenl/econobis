<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Team;

use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\District\FullDistrict;
use App\Http\Resources\Document\FullDocumentCreatedFrom;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullTeam extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'users' => FullUser::collection($this->whenLoaded('users')),
            'contactGroups' => FullContactGroup::collection($this->whenLoaded('contactGroups')),
            'documentCreatedFroms' => FullDocumentCreatedFrom::collection($this->whenLoaded('documentCreatedFroms')),
            'districts' => FullDistrict::collection($this->whenLoaded('districts')),
        ];
    }
}