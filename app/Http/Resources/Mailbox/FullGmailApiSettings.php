<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:14
 */

namespace App\Http\Resources\Mailbox;


use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use Illuminate\Http\Resources\Json\JsonResource;

class FullGmailApiSettings extends JsonResource
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
            'mailboxId' => $this->mailbox_id,
            'clientId' => $this->client_id,
            'projectId' => $this->project_id,
            'tenantId' => $this->tenant_id ? $this->tenant_id : '',
        ];
    }
}