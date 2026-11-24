<?php

namespace App\Eco\DataCleanup;

use Illuminate\Database\Eloquent\Model;

class CleanupItemSelection extends Model
{
    protected $table = 'cleanup_item_selections';

    protected $fillable = [
        'cooperation_id',
        'cleanup_item_id',
        'code_ref',
        'model',
        'model_id',
        'label',
        'batch_id',
        'determined_at',
        'cleaned_at',
        'status',
        'error',
    ];

    protected $casts = [
        'determined_at' => 'datetime',
        'cleaned_at' => 'datetime',
    ];
}
