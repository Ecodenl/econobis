<?php

namespace App\Http\JoryResources;

use App\Http\JoryResources\Base\CallbackFilterScope;
use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\JoryResource;
use App\Eco\Email\Email;

class EmailJoryResource extends JoryResource
{
    protected $modelClass = Email::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Fields
        $this->field('bcc')->filterable()->sortable();
        $this->field('cc')->filterable()->sortable();
        $this->field('closed_by_id')->filterable()->sortable();
        $this->field('contact_group_id')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('date_closed')->filterable()->sortable();
        $this->field('date_removed')->filterable()->sortable();
        $this->field('date_sent')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();
        $this->field('folder')->filterable()->sortable();
        $this->field('from')->filterable()->sortable();
        $this->field('gmail_message_id')->filterable()->sortable();
        $this->field('html_body')->filterable()->sortable();
        $this->field('id')->filterable()->sortable();
        $this->field('imap_id')->filterable()->sortable();
        $this->field('intake_id')->filterable()->sortable();
        $this->field('invoice_id')->filterable()->sortable();
        $this->field('mailbox_id')->filterable()->sortable();
        $this->field('measure_id')->filterable()->sortable();
        $this->field('message_id')->filterable()->sortable();
        $this->field('old_email_id')->filterable()->sortable();
        $this->field('opportunity_id')->filterable()->sortable();
        $this->field('order_id')->filterable()->sortable();
        $this->field('project_id')->filterable()->sortable();
        $this->field('quotation_request_id')->filterable()->sortable();
        $this->field('removed_by_id')->filterable()->sortable();
        $this->field('reply_type_id')->filterable()->sortable();
        $this->field('responsible_team_id')->filterable()->sortable();
        $this->field('responsible_user_id')->filterable()->sortable();
        $this->field('sent_by_user_id')->filterable()->sortable();
        $this->field('status')->filterable()->sortable();
        $this->field('subject')->filterable()->sortable();
        $this->field('task_id')->filterable()->sortable();
        $this->field('to')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        $this->filter('contacts.full_name');
        $this->filter('contacts.contact_id');
        $this->filter('mailbox.name');
        $this->filter('responsibleUser.first_name');
        $this->filter('responsibleUser.last_name');
        $this->filter('responsibleTeam.name');
        $this->filter('attachmentsWithoutCids.id');
        $this->filter('eigen_openstaand', new CallbackFilterScope(function ($builder) {
            $builder->whereEigenOpenstaand(Auth::user());
        }));
    }
}
