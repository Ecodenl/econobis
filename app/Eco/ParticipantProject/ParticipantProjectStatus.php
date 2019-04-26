<?php

namespace App\Eco\ParticipantProject;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ParticipantProjectStatus extends Model
{
    protected $table = 'participant_project_status';

    use SoftDeletes;

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
