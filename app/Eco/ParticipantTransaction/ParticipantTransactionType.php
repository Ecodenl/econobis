<?php

namespace App\Eco\ParticipantTransaction;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantTransactionType extends Model
{
    protected $table = 'participant_transaction_type';

    use RevisionableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function participantTransactions()
    {
        return $this->hasMany(ParticipantTransaction::class);
    }
}
