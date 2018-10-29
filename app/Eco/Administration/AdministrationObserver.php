<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Administration;

use Illuminate\Support\Facades\Auth;

class AdministrationObserver
{

    public function creating(Administration $administration)
    {
        $userId = Auth::id();
        $administration->created_by_id = $userId;
    }

    public function saved(Administration $administration)
    {
        foreach ($administration->invoices()->where('payment_type_id', 'transfer')->whereNotNull('date_sent')->get() as $invoice) {
            $invoice->setDaysToExpire();
            $invoice->save();
        }
    }
}
