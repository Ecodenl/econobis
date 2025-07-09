<?php

namespace App\Eco\Cooperation;

use App\Eco\Campaign\Campaign;
use App\Eco\Measure\Measure;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CooperationCleanupItem extends Model
{
    use RevisionableTrait;

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
