<?php

namespace App\Eco\Opportunity;

use Illuminate\Database\Eloquent\Model;

class OpportunityReaction extends Model
{

    protected $table = 'opportunity_reactions';

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
