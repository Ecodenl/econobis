<?php

namespace App\Eco\AddressDongle;

use App\Eco\Address\Address;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongle extends Model
{
    protected $table = 'address_dongles';

    protected $fillable = ['type_read_out','mac_number','type_dongle','energie_id','date_signed','date_start','date_end'];

    use RevisionableTrait;

//    protected $guarded = ['id'];

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
