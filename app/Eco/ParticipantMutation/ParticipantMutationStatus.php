<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationStatus extends Model
{
    protected $table = 'participant_mutation_statuses';

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
}
