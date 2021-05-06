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

    public function contactEnergySupplyType()
    {
        return $this->belongsTo(ContactEnergySupplierType::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    // todo: wm hier functies voor indicaties over contactEnergySupplier al voorkomt in revenues
    public function getIsInProjectRevenueKwhAttribute()
    {
        return false;
    }

    public function getIsInProjectRevenueKwhSplitAttribute()
    {
        return false;
    }

}
