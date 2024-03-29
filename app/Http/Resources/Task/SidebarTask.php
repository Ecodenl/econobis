<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 17:20
 */

namespace App\Http\Resources\Task;


use Illuminate\Http\Resources\Json\JsonResource;

class SidebarTask extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'name' => $this->name,
                'statusName' => $this->getStatus()->name,
                //todo check of dit klopt?
                'createdAt' => $this->updated_at,
            ];
    }
}