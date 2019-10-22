<?php

namespace App\Http\JoryResources;

use \App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class ContactEnergySupplierJoryResource extends JoryResource
{
    protected $modelClass = ContactEnergySupplier::class;

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
        $this->relation('energy_supplier');
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
