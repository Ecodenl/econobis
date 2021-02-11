<?php

namespace App\Eco\Invoice;

use App\Eco\Administration\Administration;
use App\Eco\Administration\Sepa;
use App\Eco\Email\Email;
use App\Eco\Order\Order;
use App\Eco\Order\OrderPaymentType;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Invoice extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    public function invoiceProducts()
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function payments()
    {
        return $this->hasMany(InvoicePayment::class)->orderBy('date_paid');
    }

    public function documents()
    {
        return $this->hasMany(InvoiceDocument::class);
    }

    public function document()
    {
        return $this->hasOne(InvoiceDocument::class)->latest();
    }

    public function invoicesToSend()
    {
        return $this->hasOne(InvoicesToSend::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function sepa()
    {
        return $this->belongsTo(Sepa::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('tasks.id', 'desc');
    }

    public function emails()
    {
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }


    public function getPaymentType()
    {
        if(!$this->payment_type_id) return null;

        return OrderPaymentType::get($this->payment_type_id);
    }

    public function getStatus()
    {
        if(!$this->status_id) return null;

        return InvoiceStatus::get($this->status_id);
    }

    public function getTotalInclVatInclReductionAttribute()
    {
        $amountInclVat = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $amountInclVat += $invoiceProduct->getAmountInclReductionInclVat();
        }

        return $amountInclVat;
    }

    public function getTotalExclVatInclReductionAttribute()
    {
        $amountExclVat = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $amountExclVat += $invoiceProduct->getAmountInclReductionExclVat();
        }

        return $amountExclVat;
    }

    public function getTotalVatInclReductionAttribute()
    {
        $vat = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $vat += $invoiceProduct->getAmountInclReductionVat();
        }

        return $vat;
    }

    public function getDatePaidAttribute()
    {

        $latest_payment = InvoicePayment::where('invoice_id', $this->id)->where('amount','>', 0)->orderBy('date_paid', 'desc')->first();

        return $latest_payment ? $latest_payment->date_paid : null;
    }

    public function getPaymentReferenceAttribute()
    {

        $latest_payment = InvoicePayment::where('invoice_id', $this->id)->where('amount','>', 0)->orderBy('date_paid', 'desc')->first();

        return $latest_payment ? $latest_payment->payment_reference : null;
    }

    public function getDatePaymentDueAttribute()
    {
        if($this->payment_type_id === 'transfer'){
            if(!$this->date_sent){
                return 0;
            }

            $daysAllowed = $this->administration->default_payment_term ? $this->administration->default_payment_term : 30;

            return Carbon::parse($this->date_sent)->addDays($daysAllowed);
        }

        return null;
    }

    public function getAmountOpenAttribute()
    {
        $amountOpen = $this->total_incl_vat_incl_reduction;
        foreach($this->payments as $payment){
            $amountOpen -= $payment->amount;
        }
        return floatval( number_format( $amountOpen, 2, '.', '') );
    }

    public function getVatInfoAttribute(){
        $vatInfo = false;

        foreach($this->invoiceProducts as $invoiceProduct) {

            if($invoiceProduct->vat_percentage === null){
                continue;

            }
            else{
                $vat = $invoiceProduct->vat_percentage . '%';
            }


            if(!isset($vatInfo[$vat])){
                $vatInfo[$vat]['total_over'] = $invoiceProduct->getAmountInclReductionExclVat();
                $vatInfo[$vat]['total_amount'] = $invoiceProduct->getAmountInclReductionVat();
            }
            else{
                $vatInfo[$vat]['total_over'] += $invoiceProduct->getAmountInclReductionExclVat();
                $vatInfo[$vat]['total_amount'] += $invoiceProduct->getAmountInclReductionVat();
            }
        }

        return $vatInfo;
    }

    public function getIbanAttribute(){
        if($this->status_id === null || $this->status_id === 'to-send' || $this->status_id === 'error-sending'){
            return $this->order->contact->iban;
        }
        else{
            return $this->attributes['iban'];
        }
    }

    public function getSubjectAttribute(){
        if($this->status_id === null || $this->status_id === 'to-send' || $this->status_id === 'error-sending'){
            return $this->order->subject;
        }
        else{
            return $this->attributes['subject'];
        }
    }

    public function getInvoiceTextAttribute(){
        if($this->status_id === null || $this->status_id === 'to-send' || $this->status_id === 'error-sending'){
            return $this->order->invoice_text;
        }
        else{
            return $this->attributes['invoice_text'];
        }
    }


    public function setDaysLastReminder()
    {
        $daysLastReminder = 0;

        if ($this->status_id == 'paid'
            || $this->status_id == 'irrecoverable'
            || $this->status_id == 'to-send'
            || $this->status_id == 'error-sending'
        ) {
            $daysLastReminder = 0;
        } else {
            if ($this->date_exhortation) {
                $daysLastReminder = Carbon::today()->diffInDays($this->date_exhortation);
            } else {
                if ($this->date_reminder_3) {
                    $daysLastReminder = Carbon::today()->diffInDays($this->date_reminder_3);
                } else {
                    if ($this->date_reminder_2) {
                        $daysLastReminder = Carbon::today()->diffInDays($this->date_reminder_2);
                    } else {
                        if ($this->date_reminder_1) {
                            $daysLastReminder = Carbon::today()->diffInDays($this->date_reminder_1);
                        }
                    }
                }
            }
        }
        $this->days_last_reminder = $daysLastReminder;
    }

    public function setDaysToExpire()
    {
        if ($this->payment_type_id !== 'transfer'
            || !$this->date_sent
            || $this->status_id == 'paid'
            || $this->status_id == 'irrecoverable'
            || $this->status_id == 'to-send'
            || $this->status_id == 'error-sending'
        ) {
            $daysToExpire = 0;
        } else {

            $daysAllowed = $this->administration->default_payment_term ? $this->administration->default_payment_term
                : 30;

            $dateMax = Carbon::parse($this->date_sent)->addDays($daysAllowed);

            $daysToExpire = Carbon::now()->diffInDays($dateMax, false);
        }

        $this->days_to_expire = $daysToExpire;
    }

    //Adds the collection frequency to a carbon date
    public function addDurationToDate($date){
        switch ($this->collection_frequency_id) {
            case 'once':
                return $date;
                break;
            case 'monthly':
                return $date->addMonth();
                break;
            case 'quarterly':
                return $date->addQuarter();
                break;
            case 'half-year':
                return $date->addMonth(6);
                break;
            case 'yearly':
                return $date->addYear();
                break;
            default:
                return $date;
        }
    }

    public function getSubStatusAttribute(){
        if ($this->status_id == 'sent' || $this->status_id == 'exported') {
            if ( $this->payment_type_id == 'transfer' && $this->days_to_expire <= 0 && !$this->date_reminder_1) {
                return "Te herinneren";
            }

            if ($this->date_reminder_1 && !$this->date_reminder_2 && !$this->date_reminder_3
                && !$this->date_exhortation
            ) {
                return "Herinnering 1";
            }
            if ($this->date_reminder_2 && !$this->date_reminder_3
                && !$this->date_exhortation
            ) {
                return "Herinnering 2";
            }
            if ($this->date_reminder_3
                && !$this->date_exhortation
            ) {
                return "Herinnering 3";
            }
            if ($this->date_exhortation
            ) {
                return "Aanmaning";
            }
        }

        return '';
    }
}
