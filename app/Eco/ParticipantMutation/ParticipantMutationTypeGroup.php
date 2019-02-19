<?php

namespace App\Eco\ParticipantMutation;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationTypeGroup extends Model
{
    protected $table = 'participant_mutation_type_group';

    use RevisionableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];
}
