<?php

namespace App\Eco\Opportunity;

use Illuminate\Database\Eloquent\Model;

class OpportunityStatus extends Model
{

    protected $table = 'opportunity_status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }
}
