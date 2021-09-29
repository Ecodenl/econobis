<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Task;


use Illuminate\Http\Resources\Json\JsonResource;

class TaskPeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->present()->noteSummary(),
        ];
    }
}