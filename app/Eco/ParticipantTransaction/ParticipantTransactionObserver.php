<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\ParticipantTransaction;

use Illuminate\Support\Facades\Auth;

class ParticipantTransactionObserver
{

    public function creating(ParticipantTransaction $participantTransaction)
    {
        $userId = Auth::id();
        $participantTransaction->created_by_id = $userId;
    }
}