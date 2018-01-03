<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Mailbox extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
