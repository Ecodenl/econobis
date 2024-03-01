<?php

namespace App\Eco\Invoice;

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Eloquent\Model;

class InvoicePost extends Model
{
    protected $table = 'invoice_post';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function Invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

}
