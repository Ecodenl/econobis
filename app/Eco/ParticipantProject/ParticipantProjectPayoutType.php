<?php

namespace App\Eco\ParticipantProject;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ParticipantProjectPayoutType extends Model
{
    use SoftDeletes;

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
