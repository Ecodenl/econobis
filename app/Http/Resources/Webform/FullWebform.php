<?php

namespace App\Http\Resources\Webform;


use App\Http\Resources\Team\FullTeam;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullWebform extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'apiKey' => $this->api_key,
            'apiKeyDate' => $this->api_key_date,
            'maxRequestsPerMinute' => $this->max_requests_per_minute,
            'dateStart' => $this->date_start,
            'dateEnd' => $this->date_end,
            'responsibleUserId' => $this->responsible_user_id,
            'responsibleUser' => FullUser::make($this->whenLoaded('responsibleUser')),
            'responsibleTeamId' => $this->responsible_team_id,
            'responsibleTeam' => FullTeam::make($this->whenLoaded('responsibleTeam')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }


}