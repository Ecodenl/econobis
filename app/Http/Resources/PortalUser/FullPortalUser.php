<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 23-10-2019
 * Time: 14:10
 */

namespace App\Http\Resources\PortalUser;

use Illuminate\Http\Resources\Json\Resource;

class FullPortalUser extends Resource
{
    public function toArray($request)
    {
        return [
           'id' => $this->id,
            'email' => $this->email,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}