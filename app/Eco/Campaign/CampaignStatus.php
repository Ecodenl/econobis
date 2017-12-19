<?php

namespace App\Eco\Campaign;

use Illuminate\Database\Eloquent\Model;

class CampaignStatus extends Model
{

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
