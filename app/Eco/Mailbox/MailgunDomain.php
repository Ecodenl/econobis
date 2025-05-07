<?php

namespace App\Eco\Mailbox;

use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class MailgunDomain extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $casts = [
        'is_verified' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $encryptable = [
        'secret'
    ];

    /**
     * Ligt niet voor de hand maar in theorie kan een mailgun domein aan meerdere mailboxen zijn gekoppeld.
     */
    public function mailboxes()
    {
        return $this->hasMany(Mailbox::class);
    }
}
