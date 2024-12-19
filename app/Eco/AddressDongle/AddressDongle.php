<?php

namespace App\Eco\AddressDongle;

use App\Eco\Address\Address;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongle extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
