<?php

namespace App\Eco\AddressDongle;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongleTypeDongle extends Model
{
    use RevisionableTrait;

    protected $table = 'address_dongle_types';

    public function addressDongles()
    {
        return $this->hasMany(AddressDongle::class);
    }

}