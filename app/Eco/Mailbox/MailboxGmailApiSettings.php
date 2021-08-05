<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class MailboxGmailApiSettings extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $table = 'mailbox_gmail_api_settings';

    protected $encryptable = [
//        'client_secret',
//        'token',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }
}
