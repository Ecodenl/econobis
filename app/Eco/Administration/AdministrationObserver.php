<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 11-10-2017
 * Time: 10:46
 */

namespace App\Eco\Administration;

use Illuminate\Support\Carbon;
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
        if($administration->isDirty('prefix_invoice_number')){
            $oldConceptInvoiceNumber = $administration->getOriginal('prefix_invoice_number') . Carbon::now()->year . '-new';
            $newConceptInvoiceNumber = $administration->prefix_invoice_number . Carbon::now()->year . '-new';
            foreach ($administration->invoices()->where('number', $oldConceptInvoiceNumber)->get() as $invoice) {
                $invoice->number = $newConceptInvoiceNumber;
                $invoice->save();
            }
        }

        foreach ($administration->invoices()->where('payment_type_id', 'transfer')->whereNotNull('date_sent')->get() as $invoice) {
            $invoice->setDaysToExpire();
            $invoice->save();
        }

        if(!$administration->uses_mollie){
            foreach ($administration->projects as $project){
                $project->uses_mollie = false;
                $project->save();
            }
        }

    }
}
