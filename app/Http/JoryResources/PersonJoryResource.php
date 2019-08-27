<?php

namespace App\Http\JoryResources;

use \App\Eco\Person\Person;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class PersonJoryResource extends JoryResource
{
    protected $modelClass = Person::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('contact_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('date_of_birth')->filterable()->sortable();
        $this->field('date_of_birth_partner')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('first_name')->filterable()->sortable();
        $this->field('first_name_partner')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('initials')->filterable()->sortable();
        $this->field('last_name')->filterable()->sortable();
        $this->field('last_name_partner')->filterable()->sortable();
        $this->field('last_name_prefix')->filterable()->sortable();
        $this->field('organisation_id')->filterable()->sortable();
        $this->field('title_id')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('contact');
        $this->relation('organisation');
        $this->relation('revision_history');
        $this->relation('title');
        $this->relation('type');
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
            $query->where('contact_id', Auth::id());
        }
    }
}
