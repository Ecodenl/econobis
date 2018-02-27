<?php

namespace App\Eco\ParticipantProductionProject;

use Illuminate\Database\Eloquent\Model;

class ParticipantProductionProjectPayoutType extends Model
{
    protected $table = 'participant_production_project_payout_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantsProductionProject()
    {
        return $this->hasMany(ParticipantProductionProject::class);
    }
}
