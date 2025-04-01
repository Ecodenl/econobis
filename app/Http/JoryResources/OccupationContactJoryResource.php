<?php

namespace App\Http\JoryResources;

use \App\Eco\Occupation\OccupationContact;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class OccupationContactJoryResource extends JoryResource
{
    protected $modelClass = OccupationContact::class;

    protected function checkAuthorize(): void
    {
        // TODO: Implement checkAuthorize() method.
    }

    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('occupation_id')->filterable()->sortable();
        $this->field('primary_contact_id')->filterable()->sortable();
        $this->field('contact_id')->filterable()->sortable();
        $this->field('start_date')->filterable()->sortable();
        $this->field('end_date')->filterable()->sortable();
        $this->field('primary')->filterable()->sortable();
        $this->field('allow_manage_in_portal')->filterable()->sortable();

        // Relations
        $this->relation('contact');
        $this->relation('primaryContact');
        $this->relation('occupation');
    }

    public function afterQueryBuild($query, $count = false): void
    {
        if(Auth::isPortalUser()){
            $query->where('contact_id', Auth::user()->contact_id);
        }
    }
}
