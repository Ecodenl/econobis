<?php

namespace App\Http\JoryResources;

use App\Eco\Mailbox\MailgunDomain;
use App\Http\Controllers\Api\Mailbox\MailgunDomainController;
use App\Http\JoryResources\Base\JoryResource;

class MailgunDomainJoryResource extends JoryResource
{

    protected function checkAuthorize(): void
    {
        $mailgunDomainController = new MailgunDomainController();
        $mailgunDomainController->authorize('view', MailgunDomain::class);
    }

    protected $modelClass = MailgunDomain::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('domain')->filterable()->sortable();
        $this->field('secret')->filterable()->sortable();
        $this->field('is_verified')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
    }
}
