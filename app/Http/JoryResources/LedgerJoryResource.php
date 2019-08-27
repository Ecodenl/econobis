<?php

namespace App\Http\JoryResources;

use \App\Eco\Ledger\Ledger;
use App\Http\JoryResources\Base\JoryResource;

class LedgerJoryResource extends JoryResource
{
    protected $modelClass = Ledger::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('vat_code_id')->filterable()->sortable();
        $this->field('twinfield_ledger_code')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();

        // Relations
        $this->relation('vatCode');
    }
}
