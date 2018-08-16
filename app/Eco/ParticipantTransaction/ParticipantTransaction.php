<?php

namespace App\Eco\ParticipantTransaction;

use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantTransaction extends Model
{
    protected $table = 'participant_transactions';

    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'iban',
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProductionProject::class, 'id', 'participation_id');
    }

    public function type()
    {
        return $this->belongsTo(ParticipantTransactionType::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }
}
