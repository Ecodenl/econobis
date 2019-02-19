<?php

namespace App\Eco\ParticipantProject;

use Illuminate\Database\Eloquent\Model;

class ParticipantProjectPayoutType extends Model
{
    protected $table = 'participant_project_payout_type';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantsProject()
    {
        return $this->hasMany(ParticipantProject::class);
    }
}
