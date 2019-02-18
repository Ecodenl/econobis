<?php

namespace App\Eco\ParticipantMutation;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationType extends Model
{
    protected $table = 'participant_mutation_type';

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

    public function participantMutationTypeGroup()
    {
        return $this->hasOne(ParticipantMutationTypeGroup::class, 'id', 'group_id');
    }
}
