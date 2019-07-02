<?php

namespace App\Eco\Twinfield;

use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class TwinfieldCustomerNumber extends Model
{
    use RevisionableTrait;

    protected $table = 'administration_contact_twinfield';
    public $timestamps = false;

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }
}
