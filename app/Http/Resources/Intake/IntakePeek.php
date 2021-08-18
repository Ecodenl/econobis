<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Intake;


use Illuminate\Http\Resources\Json\JsonResource;

class IntakePeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => 'Intake: ' . $this->id . ' voor ' . $this->contact->full_name,
        ];
    }
}