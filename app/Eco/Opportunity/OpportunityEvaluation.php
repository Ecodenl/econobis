<?php

namespace App\Eco\Opportunity;

use Illuminate\Database\Eloquent\Model;

class OpportunityEvaluation extends Model
{

    protected $table = 'opportunity_evaluation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }
}
