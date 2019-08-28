<?php

namespace App\Http\JoryResources;

use \App\Eco\Person\Person;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class PersonJoryResource extends JoryResource
{
    protected $modelClass = Person::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('first_name')->filterable()->sortable();
        $this->field('title_id')->filterable()->sortable();
        $this->field('last_name_prefix')->filterable()->sortable();
        $this->field('last_name')->filterable()->sortable();
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
