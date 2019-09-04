<?php

namespace App\Http\JoryResources;

use \App\Eco\Portal\PortalUser;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class PortalUserJoryResource extends JoryResource
{
    protected $modelClass = PortalUser::class;

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('email')->filterable()->sortable();
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->where('id', Auth::id());
        }
    }
}
