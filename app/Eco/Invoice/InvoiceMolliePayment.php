<?php

namespace App\Eco\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceMolliePayment extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date_activated' => 'date:Y-m-d H:i:s',
        'date_paid' => 'date:Y-m-d H:i:s',
    ];

    protected $dates = [
        'date_activated',
        'date_paid',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
