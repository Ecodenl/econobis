<?php

namespace App\Http\JoryResources;

use \App\Eco\Address\Address;
use App\Http\JoryResources\Base\JoryResource;
use Illuminate\Support\Facades\Auth;

class AddressJoryResource extends JoryResource
{
    protected $modelClass = Address::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('addition')->filterable()->sortable();
        $this->field('city')->filterable()->sortable();
        $this->field('contact_id')->filterable()->sortable();
        $this->field('country_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('number')->filterable()->sortable();
        $this->field('postal_code')->filterable()->sortable();
        $this->field('primary')->filterable()->sortable();
        $this->field('street')->filterable()->sortable();
        $this->field('type_id')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Custom attributes
        $this->field('postal_code')->hideByDefault();

        // Relations
        $this->relation('contact');
        $this->relation('country');
        $this->relation('housing_file');
        $this->relation('housing_files');
        $this->relation('intakes');
        $this->relation('measures_taken');
        $this->relation('revision_history');
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
