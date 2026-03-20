<?php

namespace App\Eco\SystemCheck;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SystemCheckRun extends Model
{
    protected $table = 'system_check_runs';

    protected $fillable = [
        'app_cooperation_name',
        'command_ref',
        'check_code',
        'check_name',
        'batch_key',
        'start_at',
        'end_at',
        'finished',
        'created_in_shared',
        'status',
        'issues_found',
        'is_recover_mode',
        'mail_sent',
        'mail_to',
        'summary',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'finished' => 'boolean',
        'created_in_shared' => 'boolean',
        'is_recover_mode' => 'boolean',
        'mail_sent' => 'boolean',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(SystemCheckRunItem::class, 'system_check_run_id');
    }
}