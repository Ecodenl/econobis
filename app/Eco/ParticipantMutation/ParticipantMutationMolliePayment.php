<?php

namespace App\Eco\ParticipantMutation;

use Illuminate\Database\Eloquent\Model;

class ParticipantMutationMolliePayment extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date_activated' => 'date:Y-m-d H:i:s',
        'date_paid' => 'date:Y-m-d H:i:s',
    ];

    protected $dates = [
        'date_activated',
        'date_paid',
    ];

    public function participantMutation()
    {
        return $this->belongsTo(ParticipantMutation::class);
    }
}
