<?php

namespace App\Eco\ParticipantMutation;

use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;

class ParticipantMutationMolliePayment extends Model
{
    use Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'iban'
    ];

    protected $casts = [
        'date_activated' => 'datetime',
        'date_paid' => 'datetime',
    ];

    public function participantMutation()
    {
        return $this->belongsTo(ParticipantMutation::class);
    }
}
