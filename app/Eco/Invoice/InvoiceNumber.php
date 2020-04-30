<?php

namespace App\Eco\Invoice;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;
//use Venturecraft\Revisionable\RevisionableTrait;

class InvoiceNumber extends Model
{
//    use RevisionableTrait;

    protected $table = 'administration_last_used_numbers';

    protected $guarded = [
        'id'
    ];

    public $timestamps = false;

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }
}
