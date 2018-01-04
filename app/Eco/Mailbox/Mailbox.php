<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Mailbox extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
