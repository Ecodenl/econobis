<?php

namespace App\Http\Controllers\Portal\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;

class ContactGroupController extends Controller
{
    public function index()
    {
        $contactGroups = ContactGroup::orderByRaw('portal_sort_order IS NULL, portal_sort_order ASC')
            ->orderBy('name', 'ASC')
            ->get();

        return $contactGroups;
    }

    public function addContact(ContactGroup $contactGroup, Contact $contact, $collectMessages = false)
    {
        if(!$contactGroup->contacts()->where('contact_id', $contact->id)->exists()){

            $contactGroup->contacts()->attach([$contact->id => ['member_created_at' => Carbon::now(), 'member_to_group_since' => Carbon::now()]]);
            if($contactGroup->laposta_list_id){
                $lapostaMemberHelper = new LapostaMemberHelper($contactGroup, $contact, $collectMessages);
                $lapostaMemberHelper->createMember();
                if($collectMessages){
                    $this->errorMessagesLaposta = array_merge($this->errorMessagesLaposta, $lapostaMemberHelper->getMessages() );
                }
            }

            if($contactGroup->send_email_new_contact_link){
                $contactGroupHelper = new ContactGroupHelper($contactGroup, $contact);
                $contactGroupHelper->processEmailNewContactToGroup();
            }
            if($contactGroup->inspection_person_type_id !== null){
                $contact->inspection_person_type_id = $contactGroup->inspection_person_type_id;
                $contact->save();
            }
        }
    }
}
