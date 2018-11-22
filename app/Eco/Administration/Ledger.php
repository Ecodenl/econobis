<?php

namespace App\Eco\Administration;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Ledger extends Model
{
    use RevisionableTrait;

    protected $table = 'administration_ledger_twinfield';
    public $timestamps = false;
    protected $guarded = [
        'id'
    ];

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }
}
