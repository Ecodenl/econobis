<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 15:41
 */

namespace App\Http\Resources\ContactNote;


use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullContactNote extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'note' => $this->note,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
        ];
    }

}