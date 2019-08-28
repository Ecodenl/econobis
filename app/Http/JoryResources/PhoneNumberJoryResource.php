<?php

namespace App\Http\JoryResources;

use \App\Eco\PhoneNumber\PhoneNumber;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class PhoneNumberJoryResource extends JoryResource
{
    protected $modelClass = PhoneNumber::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('primary')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->where('contact_id', Auth::id());
        }
    }
}
