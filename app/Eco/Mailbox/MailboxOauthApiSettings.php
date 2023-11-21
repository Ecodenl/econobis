<?php

namespace App\Eco\Mailbox;

use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class MailboxOauthApiSettings extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $table = 'mailbox_oauth_api_settings';

    protected $encryptable = [
        'client_secret',
        'token',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }
}
