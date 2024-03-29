<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationType extends Model
{
    protected $table = 'participant_mutation_types';

    use RevisionableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantMutations()
    {
        return $this->hasMany(ParticipantMutation::class);
    }

    public function projectType()
    {
        return $this->hasOne(ProjectType::class, 'id', 'project_type_id');
    }
}
