<?php

namespace App\Http\Resources\Mailbox;

use Illuminate\Http\Resources\Json\Resource;

class GridMailbox extends Resource
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
                'smtpHost' => $this->smtp_host,
                'imapHost' => $this->imap_host,
                'username' => $this->username,
                'valid' => $this->valid,
                'mailgunDomainId' => $this->mailgun_domain_id,
                'mailgunDomain' => $this->mailgunDomain ? $this->mailgunDomain->domain : '',
                'outgoingServerType' => $this->outgoing_server_type,
                'primary' => $this->primary,
                'isActive' => $this->is_active,
            ];
    }
}
