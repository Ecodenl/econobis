<?php

namespace App\Eco\Opportunity;

use Illuminate\Database\Eloquent\Model;

class OpportunityEvaluationStatus extends Model
{

    protected $table = 'opportunity_evaluation_status';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

}
