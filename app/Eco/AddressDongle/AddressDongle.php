<?php

namespace App\Eco\AddressDongle;

use App\Eco\Address\Address;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressDongle extends Model
{
    protected $table = 'address_dongles';

    protected $fillable = ['address_id', 'type_read_out_id','mac_number','type_dongle_id','energy_id','date_signed','date_start','date_end'];

    use RevisionableTrait;

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
    public function dongleType()
    {
        return $this->belongsTo(AddressDongleTypeDongle::class, 'type_dongle_id');
    }
    public function dongleReadOutType()
    {
        return $this->belongsTo(AddressDongleTypeReadOut::class, 'type_read_out_id');
    }
}
