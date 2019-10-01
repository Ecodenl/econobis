<?php

namespace App\Http\JoryResources;

use App\Eco\Organisation\Organisation;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class OrganisationJoryResource extends JoryResource
{
    protected $modelClass = Organisation::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('website')->filterable()->sortable();
        $this->field('chamber_of_commerce_number')->filterable()->sortable();
        $this->field('vat_number')->filterable()->sortable();
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
