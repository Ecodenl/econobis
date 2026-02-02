<?php

namespace App\Eco\Cooperation;

use Illuminate\Database\Eloquent\Model;

class CooperationCleanupItem extends Model
{
    protected $table = 'cooperation_cleanup_items';

    protected $guarded = ['id'];

    public const STATUS_IDLE = 'idle';
    public const STATUS_DETERMINED = 'determined';
    public const STATUS_RUNNING = 'running';
    public const STATUS_PARTIAL = 'partial';
    public const STATUS_FAILED = 'failed';
    public const STATUS_DONE = 'done';

    protected $casts = [
        'cooperation_id' => 'integer',
        'years_for_delete' => 'integer',

        'has_retention_period' => 'boolean',

        'determined_count' => 'integer',
        'cleaned_count' => 'integer',
        'failed_count' => 'integer',

        'date_determined' => 'datetime',
        'date_cleaned_up' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function cooperation()
    {
        return $this->belongsTo(Cooperation::class);
    }
}
