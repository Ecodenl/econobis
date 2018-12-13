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
}
