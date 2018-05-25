<?php

namespace App\Eco\Invoice;

use App\Eco\Administration\Administration;
use App\Eco\Email\Email;
use App\Eco\Order\Order;
use App\Eco\Order\OrderPaymentType;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Invoice extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    protected $appends
        = [
            'days_expired',
            'total_price_incl_vat_and_reduction',
            'date_paid',
            'date_payment_due',
            'amount_open',
        ];

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

    public function getSendMethod()
    {
        if(!$this->send_method_id) return null;

        return InvoiceSendMethod::get($this->send_method_id);
    }

    public function getDaysExpiredAttribute()
    {
        if($this->payment_type_id === 'transfer'){
            if(!$this->date_sent){
                return 0;
            }

            $daysAllowed = $this->administration->default_payment_term ? $this->administration->default_payment_term : 30;

            $daysExpired = ((Carbon::parse($this->date_sent))->addDays($daysAllowed))->diffInDays(Carbon::now());

            return $daysExpired <= 0 ? 0 : $daysExpired;
        }

        return 0;
    }

    public function getTotalPriceInclVatAndReductionAttribute()
    {
        $price = 0;

        foreach($this->invoiceProducts as $invoiceProduct) {
            $price += $invoiceProduct->price_incl_vat_and_reduction;
        }

        return $price <= 0 ? 0 : $price;
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
}
