<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\Email;


use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\Resource;

class GridEmail extends Resource
{
    public function toArray($request)
    {
        return [
            'createdAt' => $this->created_at,
            'id' => $this->id,
            'date' => $this->date_sent,
            'mailboxName' => $this->mailbox->name,
            'from' => $this->from,
            'subject' => $this->subject,
            'status' => FullEnumWithIdAndName::make($this->getStatus()),
            'folder' => $this->folder,
        ];
    }
}