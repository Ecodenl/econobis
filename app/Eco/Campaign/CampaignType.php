<?php

namespace App\Eco\Campaign;

use Illuminate\Database\Eloquent\Model;

class CampaignType extends Model
{

    protected $table = 'campaign_types';

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
