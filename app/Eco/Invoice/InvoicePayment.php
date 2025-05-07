<?php

namespace App\Eco\Invoice;

use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class InvoicePayment extends Model
{
    use RevisionableTrait;
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    protected $table = 'invoice_payment';

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
