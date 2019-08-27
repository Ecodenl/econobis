<?php

namespace App\Http\JoryResources;

use JosKolenberg\LaravelJory\JoryResource;
use \App\Eco\VatCode\VatCode;

class VatCodeJoryResource extends JoryResource
{
    protected $modelClass = VatCode::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('start_date')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('percentage')->filterable()->sortable();
        $this->field('twinfield_code')->filterable()->sortable();
        $this->field('twinfield_ledger_code')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
    }
}
