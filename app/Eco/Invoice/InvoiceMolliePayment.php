<?php

namespace App\Eco\Invoice;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvoiceMolliePayment extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'date_activated' => 'datetime',
        'date_paid' => 'datetime',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
