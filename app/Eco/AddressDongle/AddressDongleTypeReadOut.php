<?php

namespace App\Eco\AddressDongle;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongleTypeReadOut extends Model
{
    use RevisionableTrait;

    protected $table = 'address_dongle_read_out_types';

    public function addressDongles()
    {
        return $this->hasMany(AddressDongle::class);
    }

    protected static function seed()
    {
        return [
            new static('1', 'Onbekend'),
            new static('2', 'P1'),
            new static('3', 'P4'),
        ];
    }
}