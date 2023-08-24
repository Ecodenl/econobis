<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\JoryResource;
use App\Eco\Mailbox\MailgunEvent;

class MailgunEventJoryResource extends JoryResource
{
    protected $modelClass = MailgunEvent::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('mailgun_domain_id')->filterable()->sortable();
        $this->field('mailgun_id')->filterable()->sortable();
        $this->field('mailgun_message_id')->filterable()->sortable();
        $this->field('event')->filterable()->sortable();
        $this->field('recipient')->filterable()->sortable();
        $this->field('subject')->filterable()->sortable();
        $this->field('event_date')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('delivery_status')->filterable()->sortable();

        // Relations
        $this->relation('domain');
    }

    public function authorize($builder, $user = null): void
    {
        /**
         * Alleen events tonen van mailboxen waar de gebruiker toegang tot heeft.
         */
        $builder->whereHas('domain.mailboxes.users', function($query) use ($user){
            $query->where('users.id', $user->id);
        });
    }

    protected function configureForPortal(): void
    {
    }

    protected function checkAuthorize(): void
    {
    }
}
