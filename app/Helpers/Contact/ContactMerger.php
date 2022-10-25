<?php

namespace App\Helpers\Contact;

use App\Eco\Contact\Contact;

class ContactMerger
{

    protected $contact1;
    protected $contact2;

    public function __construct(Contact $contact1, Contact $contact2)
    {
        $this->contact1 = $contact1;
        $this->contact2 = $contact2;
    }

    public function merge()
    {
        \Log::info('Merging contacts ' . $this->contact1->id . ' and ' . $this->contact2->id);
    }
}