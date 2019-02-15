<?php

namespace App\Eco\ParticipantMutation;

use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantMutation extends Model
{
    protected $table = 'participant_mutations';

    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'iban',
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class, 'id', 'participation_id');
    }

    public function type()
    {
        return $this->belongsTo(ParticipantMutationType::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }
}
