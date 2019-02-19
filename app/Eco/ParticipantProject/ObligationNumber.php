<?php

namespace App\Eco\ParticipantProject;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ObligationNumber extends Model
{
    protected $table = 'obligation_numbers';

    use RevisionableTrait;

    protected $guarded = ['id'];

    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class, 'id', 'participation_id');
    }
}
