<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-11-2017
 * Time: 12:40
 */

namespace App\Http\Resources\User;


use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class GridUser extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'fullLastName' => $this->present()->fullLastName(),
            'email' => $this->email,
            'status' => $this->active ? 'Actief' : 'Inactief',
            'blocked' => $this->blocked_permanent || ($this->blocked_until !== null && Carbon::parse($this->blocked_until) > Carbon::now()),
            'blocked_until' => $this->blocked_permanent ? 'Permanent' : ($this->blocked_until ? $this->blocked_until->locale('nl_NL')->isoFormat('dddd D MMMM YYYY HH:mm') : ''),
        ];
    }
}