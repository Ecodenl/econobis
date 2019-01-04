<?php

namespace App\Eco\Mailbox;

use Illuminate\Database\Eloquent\Model;

class MailgunDomain extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];
}
