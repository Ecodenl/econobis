<?php

namespace App\Eco\Portal;

use Illuminate\Database\Eloquent\Model;

class PortalUserLoginAttempt extends Model
{
    protected $fillable = [
        'portal_user_id',
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
