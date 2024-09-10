<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Mailbox;


use Illuminate\Http\Resources\Json\JsonResource;

class LoggedInEmailPeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->mailbox_id,
            'email' => $this->email,
            'name' => $this->name,
        ];
    }
}