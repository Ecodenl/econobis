<?php

namespace App\Eco\Contact\Jobs;

use App\Eco\Contact\Contact;
use App\Eco\Task\Jobs\DeleteTask;
use App\Helpers\Jobs\GenericDeleteModelJob;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class DeleteContact extends GenericDeleteModelJob
{

    public function handle()
    {
        $contact = $this->model;

        // Alle direct gerelateerde soft deleten
        $this->deleteOnQuery($contact->addresses());
        $this->deleteOnQuery($contact->emailAddresses());
        $this->deleteOnQuery($contact->phoneNumbers());
        $this->deleteOnQuery($contact->notes());
        DeleteTask::collection($contact->tasks, $this->force);

        if($contact->isPerson()) GenericDeleteModelJob::single($contact->person);

        // Als het een organisation is, de organisation deleten samen met de gerelateerde personen
        if($contact->isOrganisation() && $contact->organisation){
            $organisation = $contact->organisation;

            $organisation->load([
                'people.contact.tasks',
            ]);

            foreach($organisation->people as $person){
                DeleteContact::single($person->contact, $this->force);
            }

            GenericDeleteModelJob::single($organisation, $this->force);
        }

        $this->deleteModel();
    }
}
