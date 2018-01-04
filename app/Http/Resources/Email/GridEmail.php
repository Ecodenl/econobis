<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Email;


use Illuminate\Http\Resources\Json\Resource;

class GridEmail extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'mailboxName' => $this->mailbox->name,
            'from' => $this->from,
            'subject' => $this->subject,
        ];
    }
}