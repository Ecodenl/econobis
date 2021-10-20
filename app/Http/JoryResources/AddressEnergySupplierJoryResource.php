<?php

namespace App\Http\JoryResources;

use \App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class AddressEnergySupplierJoryResource extends JoryResource
{
    protected $modelClass = AddressEnergySupplier::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('energy_supplier_id')->filterable()->sortable();
        $this->field('es_number')->filterable()->sortable();
        $this->field('member_since')->filterable()->sortable();
        $this->field('ean_electricity')->filterable()->sortable();
        $this->field('ean_gas')->filterable()->sortable();
        $this->field('is_current_supplier')->filterable()->sortable();

        // Relations
        $this->relation('energySupplier');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->whereHas('contact', function($query){
                $query->whereAuthorizedForPortalUser();
            });
        }
    }
}
