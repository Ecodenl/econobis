<?php

namespace App\Eco\EnergySupplier;

use App\Eco\Contact\Contact;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ContactEnergySupplier extends Model
{
    protected $table = 'contact_energy_supplier';

    use RevisionableTrait;

    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function energySupplier()
    {
        return $this->belongsTo(EnergySupplier::class);
    }

    public function contactEnergySupplyStatus()
    {
        return $this->belongsTo(ContactEnergySupplierStatus::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }
}
