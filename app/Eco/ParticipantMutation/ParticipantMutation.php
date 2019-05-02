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
        'paid_on',
    ];

    protected $dates = [
        'date_interest',
        'date_option',
        'date_granted',
        'date_contract_retour',
        'date_payment',
        'date_entry',
        'created_at',
        'updated_at',
    ];

    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class);
    }

    public function type()
    {
        return $this->belongsTo(ParticipantMutationType::class);
    }

    public function status()
    {
        return $this->belongsTo(ParticipantMutationStatus::class);
    }

    public function statusLog()
    {
        return $this->hasMany(ParticipantMutationStatusLog::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }
}
