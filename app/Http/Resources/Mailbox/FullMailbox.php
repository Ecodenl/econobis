<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:14
 */

namespace App\Http\Resources\Mailbox;


use App\Eco\Mailbox\IncomingServerType;
use App\Eco\Mailbox\OutgoingServerType;
use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Resources\Json\JsonResource;

class FullMailbox extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'smtpHost' => $this->smtp_host,
            'smtpPort' => $this->smtp_port,
            'smtpEncryption' => $this->smtp_encryption,
            'imapHost' => $this->imap_host,
            'imapPort' => $this->imap_port,
            'imapEncryption' => $this->imap_encryption,
            'imapInboxPrefix' => $this->imap_inbox_prefix,
            'dateLastFetched' => $this->date_last_fetched,
            'startFetchMail' => $this->start_fetch_mail,
            'imapIdLastFetched' => $this->imap_id_last_fetched,
            'username' => $this->username,
            'password' => '',
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'users' => UserPeek::collection($this->whenLoaded('users')),
            'mailboxIgnores' => FullMailboxIgnore::collection($this->whenLoaded('mailboxIgnores')),
            'valid' => $this->valid,
            'mailgunDomainId' => $this->mailgun_domain_id,
            'mailgunDomain' => $this->mailgunDomain ? $this->mailgunDomain->domain : '',
            'incomingServerType' => $this->incoming_server_type,
            'outgoingServerType' => $this->outgoing_server_type,
            'mailboxServerTypes' => [
                'incomingServerType' => ['code' => $this->incoming_server_type, 'name' => IncomingServerType::get($this->incoming_server_type)->getName()],
                'outgoingServerType' => ['code' => $this->outgoing_server_type, 'name' => OutgoingServerType::get($this->outgoing_server_type)->getName()],
            ],
            'isActive' => $this->is_active,
            'primary' => $this->primary,
            'linkContactFromEmailToAddress' => $this->link_contact_from_email_to_address,
            'emailMarkAsSeen' => $this->email_mark_as_seen,
            'gmailApiSettings' => new FullGmailApiSettings($this->whenLoaded('gmailApiSettings')),
            'inboundMailgunEmail' => $this->inbound_mailgun_email,
        ];
    }
}