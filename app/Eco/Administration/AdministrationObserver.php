<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Administration;

use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use App\Helpers\Twinfield\TwinfieldInvoiceHelper;
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

        //Als er iets in de twinfield instelling veranderd is moeten we dit opnieuw synchroniseren
        if(($administration->isDirty('twinfield_username') || $administration->isDirty('twinfield_organization_code') || $administration->isDirty('twinfield_office_code')) && $administration->twinfield_is_valid){

            //TODO moet dit? Niet in eerste versie met Twinfield aanpassingen. We bekijken dit opnieuw in volgende sprint met Twinfield aanpassingen
//            foreach ($administration->twinfieldNumbers as $twinfieldNumber) {
//                $twinfieldNumber->delete();
//            }
//
//            foreach ($administration->invoices()->whereNotNull('twinfield_number')->where('status_id', 'exported')->get() as $invoice) {
//                $invoice->twinfield_number = null;
//                $invoice->status_id = 'sent';
//                $invoice->save();
//            }
//
//            foreach ($administration->invoices()->whereNotNull('twinfield_number')->get() as $invoice) {
//                $invoice->twinfield_number = null;
//                $invoice->save();
//            }
//
//            //alle contacten als klanten in Twinfield zetten
//            $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
//            $twinfieldCustomerHelper->createAllCustomers();
        }
    }
}
