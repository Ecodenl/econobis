<?php

namespace App\Eco\Invoice;

use App\Eco\Order\Order;
use App\Eco\Order\OrderPaymentType;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Invoice extends Model
{
    use RevisionableTrait, Encryptable;

    protected $guarded = ['id'];

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
}
