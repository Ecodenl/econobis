<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\EnergySupplier;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContactEnergySupplierObserver
{

    public function creating(ContactEnergySupplier $contactEnergySupplier)
    {
        $userId = Auth::id();
        $contactEnergySupplier->created_by_id = $userId;
    }
}