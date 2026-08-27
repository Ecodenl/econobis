<?php

namespace App\Eco\User;

use Illuminate\Database\Eloquent\Model;

class UserLoginAttempt extends Model
{
    protected $fillable = [
        'user_id',
        'identifier',
        'ip',
        'user_agent',
        'succeeded',
        'result',
        'failed_logins_after',
        'blocked_until',
        'blocked_permanent',
    ];
    protected $casts = [
        'succeeded' => 'bool',
        'blocked_permanent' => 'bool',
        'blocked_until' => 'datetime',
    ];
}
