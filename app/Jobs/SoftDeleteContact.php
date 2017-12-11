<?php

namespace App\Jobs;

use App\Eco\Contact\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SoftDeleteContact implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var Contact
     */
    private $contact;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Contact $contact)
    {
        //
        $this->contact = $contact;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $contact = $this->contact;

        // contact zelf soft deleten
        $contact->delete();

        // Alle direct gerelateerde soft deleten
        $contact->addresses()->delete();
        $contact->emailAddresses()->delete();
        $contact->phoneNumbers()->delete();
        $contact->notes()->delete();

        if($contact->isPerson()){
            $contact->person()->delete();
        }

        // Als het een organisation is, de organisation soft deleten samen met de gerelateerde personen
        if($contact->isOrganisation() && $contact->organisation){
            $organisation = $contact->organisation;
            $organisation->delete();

            foreach ($organisation->people as $person) {
                $person->delete();

                $personContact = $person->contact;
                $personContact->delete();

                $personContact->addresses()->delete();
                $personContact->emailAddresses()->delete();
                $personContact->phoneNumbers()->delete();
                $personContact->notes()->delete();
            }
        }
    }
}
