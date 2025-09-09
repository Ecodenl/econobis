<?php

namespace App\Eco\Cooperation;

use Illuminate\Database\Eloquent\Model;

class CooperationCleanupItem extends Model
{
    protected $table = 'cooperation_cleanup_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function cooperation()
    {
        return $this->belongsTo(Cooperation::class);
    }
}
