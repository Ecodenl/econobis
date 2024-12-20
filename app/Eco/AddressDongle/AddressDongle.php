<?php

namespace App\Eco\AddressDongle;

use App\Eco\Address\Address;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongle extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function getTypeReadOutNameAttribute()
    {
        switch ($this->type_read_out) {
            case 1:
                $name = "P1";
                break;
            case 2:
                $name = "P2";
                break;
            default:
                $name = "onbekend";
                break;
        }

        return $name;
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
