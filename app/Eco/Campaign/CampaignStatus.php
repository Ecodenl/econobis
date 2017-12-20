<?php

namespace App\Eco\Campaign;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CampaignStatus extends Model
{
    use RevisionableTrait;

    protected $table = 'campaign_status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}
