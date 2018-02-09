<?php

namespace App\Eco\Email;

use App\Eco\Contact\Contact;
use App\Eco\Intake\Intake;
use App\Eco\Mailbox\Mailbox;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date_sent' => 'datetime',
        'to' => 'array',
        'cc' => 'array',
        'bcc' => 'array',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function attachments()
    {
        return $this->hasMany(EmailAttachment::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatus()
    {
        if(!$this->status) return null;

        return EmailStatus::get($this->status);
    }

    public function intake()
    {
        return $this->belongsTo(Intake::class);
    }
}
