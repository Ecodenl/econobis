<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationStatusLog extends Model
{
    protected $table = 'participant_mutation_statuses_log';

    use RevisionableTrait;

    protected $dates = [
        'date_status',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantMutation()
    {
        return $this->belongsTo(ParticipantMutation::class);
    }
}
