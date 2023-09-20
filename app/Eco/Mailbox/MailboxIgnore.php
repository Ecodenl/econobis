<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class MailboxIgnore extends Model
{

    protected $guarded = ['id'];

    protected $table = 'mailbox_ignores';

    public $timestamps = false;

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function getIgnoreType()
    {
        if(!$this->type_id) return null;

        return MailboxIgnoreType::get($this->type_id);
    }

    public function ignoresEmailAddress(string $emailAddress)
    {
        switch ($this->type_id) {
            case 'e-mail':
                return $this->value === $emailAddress;
            case 'domain':
                $domain = preg_replace( '!^.+?([^@]+)$!', '$1', $emailAddress);

                return $this->value === $domain;
            default:
                return false; // Just to be sure
        }
    }
}
