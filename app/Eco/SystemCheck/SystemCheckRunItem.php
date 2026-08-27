<?php

namespace App\Eco\SystemCheck;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SystemCheckRunItem extends Model
{
    protected $table = 'system_check_run_items';

    protected $fillable = [
        'system_check_run_id',
        'severity',
        'entity_type',
        'entity_id',
        'related_entity_type',
        'related_entity_id',
        'message',
        'context_json',
    ];

    protected $casts = [
        'context_json' => 'array',
    ];

    public function systemCheckRun(): BelongsTo
    {
        return $this->belongsTo(SystemCheckRun::class, 'system_check_run_id');
    }
}