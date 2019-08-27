<?php

namespace App\Http\JoryResources;

use JosKolenberg\LaravelJory\JoryResource;
use \App\Eco\Mailbox\MailgunDomain;

class MailgunDomainJoryResource extends JoryResource
{
    protected $modelClass = MailgunDomain::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('domain')->filterable()->sortable();
        $this->field('secret')->filterable()->sortable();
        $this->field('is_verified')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
    }
}
