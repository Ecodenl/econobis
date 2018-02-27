<?php

namespace App\Eco\ParticipantProductionProject;

use Illuminate\Database\Eloquent\Model;

class ParticipantProductionProjectStatus extends Model
{
    protected $table = 'participant_production_project_status';

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
