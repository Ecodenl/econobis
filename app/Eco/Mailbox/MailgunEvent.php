<?php

namespace App\Eco\Mailbox;

use Illuminate\Database\Eloquent\Model;

class MailgunEvent extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'event_date' => 'datetime',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'event_date',
    ];

    public function domain()
    {
        return $this->belongsTo(MailgunDomain::class, 'mailgun_domain_id');
    }
}