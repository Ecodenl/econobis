<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;
use \App\Eco\EmailAddress\EmailAddress;

class EmailAddressJoryResource extends JoryResource
{
    protected $modelClass = EmailAddress::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('email')->filterable()->sortable();
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
