<?php

namespace App\Eco\Mailbox;

use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use JosKolenberg\LaravelJory\Traits\JoryTrait;

class MailgunDomain extends Model
{
    use JoryTrait, Encryptable;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'is_verified' => 'boolean',
    ];

    protected $encryptable = [
        'secret'
    ];
}
