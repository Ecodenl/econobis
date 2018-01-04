<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:14
 */

namespace App\Http\Resources\Mailbox;


use App\Http\Resources\User\UserPeek;
use Illuminate\Http\Resources\Json\Resource;

class FullMailbox extends Resource
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
            'username' => $this->username,
            'password' => $this->password,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'users' => UserPeek::collection($this->whenLoaded('users')),
        ];
    }
}