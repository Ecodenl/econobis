<?php
namespace App\Eco\AddressDongle;

use Illuminate\Support\Facades\Auth;

class AddressDongleObserver
{

    public function creating(AddressDongle $addressDongle)
    {
        $userId = Auth::id();
        $addressDongle->created_by_id = $userId;
        $addressDongle->updated_by_id = $userId;
    }

    public function updating(AddressDongle $addressDongle)
    {
        $userId = Auth::id();
        $addressDongle->updated_by_id = $userId;
    }
}