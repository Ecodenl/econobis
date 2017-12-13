<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 13-12-2017
 * Time: 16:04
 */

namespace App\Http\Resources\Task;


use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\Resource;

class FullTaskPropertyValue extends Resource
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
                'propertyId' => $this->property_id,
                'property' => GenericResource::make($this->whenLoaded('property')),
                'taskId' => $this->task_id,
                'task' => FullTask::make($this->whenLoaded('task')),
                'value' => $this->value,
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
            ];
    }
}