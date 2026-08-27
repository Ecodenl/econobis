<?php

namespace App\Http\JoryResources;

use App\Eco\Occupation\Occupation;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class OccupationJoryResource extends JoryResource
{
    protected $modelClass = Occupation::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('primary_occupation')->filterable()->sortable();
        $this->field('secondary_occupation')->filterable()->sortable();
    }

}
