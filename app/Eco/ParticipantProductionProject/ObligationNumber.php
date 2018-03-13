<?php

namespace App\Eco\ParticipantProductionProject;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ObligationNumber extends Model
{
    protected $table = 'obligation_numbers';

    use RevisionableTrait;

    protected $guarded = ['id'];

    public function participation()
    {
        return $this->belongsTo(ParticipantProductionProject::class, 'id', 'participation_id');
    }
}
