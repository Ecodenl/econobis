<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\Project\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutationStatusLog extends Model
{
    protected $table = 'participant_mutation_statuses_log';

    use RevisionableTrait;

    protected $casts = [
        'date_status' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
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

    public function fromStatus()
    {
        return $this->belongsTo(ParticipantMutationStatus::class);
    }

    public function toStatus()
    {
        return $this->belongsTo(ParticipantMutationStatus::class);
    }
}
