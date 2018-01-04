<?php

namespace App\Eco\Email;

use App\Eco\Contact\Contact;
use App\Eco\Mailbox\Mailbox;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date' => 'datetime',
        'to' => 'array',
        'cc' => 'array',
        'bcc' => 'array',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
