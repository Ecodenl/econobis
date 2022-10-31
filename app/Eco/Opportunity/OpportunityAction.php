<?php

namespace App\Eco\Opportunity;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class OpportunityAction extends Model
{
    use RevisionableTrait;

    protected $table = 'opportunity_actions';
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
