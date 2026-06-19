<?php

namespace App\Http\Controllers\Portal\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\ContactGroup\ContactGroupHelper;
use App\Helpers\Laposta\LapostaMemberHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ContactGroupController extends Controller
{
    public function index()
    {
        // ophalen contactgegevens portal user (vertegenwoordiger)
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }

        // Ophalen alle groepen met show_portal = true
        $contactGroups = ContactGroup::where('show_portal', true)
            ->where('type_id', 'static')
            ->where('closed', false)
//  WM: klant is koning, ze willen ook de groepen tonen waar portaluser geen lid van is en waar hij/zij zich niet voor kan aanmelden
//  enige criteria om groep te tonen zijn dus: show_portal = TRUE, type_id = static en closed = FALSE
//            ->where(function ($q) use ($portalUser) {
//                $q->where('edit_portal', true)
//                    ->orWhereHas('contacts', function ($q2) use ($portalUser) {
//                        $q2->where('contacts.id', $portalUser->contact->id);
//                    });
//            })
            ->orderByRaw('portal_sort_order IS NULL, portal_sort_order ASC')
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
