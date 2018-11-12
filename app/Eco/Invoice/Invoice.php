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

    public function getTotalPriceInclVatAndReductionAttribute()
    {
        $price = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $price += $invoiceProduct->price_incl_vat_and_reduction;
        }

        return $price <= 0 ? 0 : $price;
    }

    public function getTotalPriceExVatInclReductionAttribute()
    {
        $price = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $price += $invoiceProduct->price_ex_vat_incl_reduction;
        }

        return $price <= 0 ? 0 : $price;
    }

    public function getTotalVatAttribute()
    {
        $vat = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $vat += $invoiceProduct->amount_vat;
        }

        return $vat <= 0 ? 0 : $vat;
    }

    public function getDatePaidAttribute()
    {

        $latest_payment = InvoicePayment::where('invoice_id', $this->id)->where('amount','>', 0)->orderBy('date_paid', 'desc')->first();

        return $latest_payment ? $latest_payment->date_paid : null;
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
        $amountOpen = $this->total_price_incl_vat_and_reduction;

        if($amountOpen <= 0){
            return 0;
        }

        foreach($this->payments as $payment){
            $amountOpen -= $payment->amount;
        }

        return $amountOpen;
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
                $vatInfo[$vat]['total_over'] = $invoiceProduct->price_ex_vat_incl_reduction;
                $vatInfo[$vat]['total_amount'] = $invoiceProduct->amount_vat;
            }
            else{
                $vatInfo[$vat]['total_over'] += $invoiceProduct->price_ex_vat_incl_reduction;
                $vatInfo[$vat]['total_amount'] += $invoiceProduct->amount_vat;
            }
        }

        return $vatInfo;
    }

    public function getIbanAttribute(){
        if($this->status_id === 'to-send'){
            return $this->order->IBAN ? $this->order->IBAN : $this->order->contact->iban;
        }
        else{
            return $this->attributes['iban'];
        }
    }

    public function getSubjectAttribute(){
        if($this->status_id === 'to-send'){
            return $this->order->subject;
        }
        else{
            return $this->attributes['subject'];
        }
    }

    public function getInvoiceTextAttribute(){
        if($this->status_id === 'to-send'){
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
}
