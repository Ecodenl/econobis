<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class Mailbox extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $encryptable = [
        'password'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function mailboxIgnores()
    {
        return $this->hasMany(MailboxIgnore::class);
    }
}
