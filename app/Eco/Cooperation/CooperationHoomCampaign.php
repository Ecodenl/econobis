<?php

namespace App\Eco\Cooperation;

use App\Eco\Campaign\Campaign;
use App\Eco\Measure\Measure;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CooperationHoomCampaign extends Model
{
    use RevisionableTrait;

    protected $table = 'cooperation_hoom_campaigns';

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
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }
}
