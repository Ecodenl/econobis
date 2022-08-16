<?php

namespace App\Http\Resources\Mailbox;

use Illuminate\Http\Resources\Json\JsonResource;

class GridMailbox extends JsonResource
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
                'email' => $this->email,
                'incomingServerType' => $this->incoming_server_type,
                'incomingServerTypeName' => $this->getIncomingServerType()->name,
                'imapHost' => $this->imap_host,
                'imapPort' => $this->imap_port,
                'outgoingServerType' => $this->outgoing_server_type,
                'outgoingServerTypeName' => $this->getOutcomingServerType()->name,
                'smtpHost' => $this->smtp_host,
                'smtpPort' => $this->smtp_port,
                'username' => $this->username,
                'valid' => $this->valid,
                'mailgunDomainId' => $this->mailgun_domain_id,
                'mailgunDomain' => $this->mailgunDomain ? $this->mailgunDomain->domain : '',
                'primary' => $this->primary,
                'isActive' => $this->is_active,
            ];
    }
}
