<?php

namespace App\Http\JoryResources;

use \App\Eco\Address\Address;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class AddressJoryResource extends JoryResource
{
    protected $modelClass = Address::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('addition')->filterable()->sortable();
        $this->field('city')->filterable()->sortable();
        $this->field('country_id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('postal_code')->filterable()->sortable();
        $this->field('primary')->filterable()->sortable();
        $this->field('street')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->where('contact_id', Auth::id());
        }
    }
}
