<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Team;

use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullTeam extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'users' => FullUser::collection($this->whenLoaded('users')),
        ];
    }
}