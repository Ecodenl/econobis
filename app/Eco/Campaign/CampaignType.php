<?php

namespace App\Eco\Campaign;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CampaignType extends Model
{
    use RevisionableTrait;

    protected $table = 'campaign_types';
    public $timestamps = false;

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
