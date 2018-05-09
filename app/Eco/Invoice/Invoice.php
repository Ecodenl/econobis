<?php

namespace App\Eco\Invoice;

use App\Eco\Administration\Administration;
use App\Eco\Order\Order;
use App\Eco\Order\OrderPaymentType;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Invoice extends Model
{
    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

    protected $appends
        = [
            'days_expired',
            'total_price_incl_vat_and_reduction',
        ];

    public function invoiceProducts()
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    public function payments()
    {
        return $this->hasMany(InvoicePayment::class);
    }

    public function documents()
    {
        return $this->hasMany(InvoiceDocument::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
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

            $daysExpired =  ((Carbon::parse($this->date_sent))->addDays($daysAllowed))->diffInDays(Carbon::now());

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
}
