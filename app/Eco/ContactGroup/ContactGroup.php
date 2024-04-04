<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\InspectionPersonType\InspectionPersonType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Task\Task;
use App\Eco\Team\Team;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Laracasts\Presenter\PresentableTrait;

class ContactGroup extends Model
{
    use PresentableTrait, SoftDeletes, HasFactory;
    protected $presenter = ContactGroupPresenter::class;

    protected $casts
        = [
            'closed' => 'boolean',
        ];

    protected $guarded = ['id'];

    protected $dates
        = [
//            'date_started',
//            'date_finished',
            'created_at',
            'updated_at',
        ];


    //gebruikt om infinite loop te checken bij samengestelde groepen
    private $hasComposedIds = [];
    private $hasComposedExceptedIds = [];

    public static function getAutoIncrementedName(string $prefix)
    {
        // Prefix altijd gevolgd door 1 spatie (ook als deze spatie al wordt meegegeven)
        $prefix = trim($prefix) . ' ';

        $last = static::where('name', 'like', $prefix . '%')
            ->orderBy('created_at', 'desc')
            ->first();

        // Geen ander record met deze prefix; dan is het nummer 1
        if(!$last) return $prefix . '1';

        // Wel eerder record, dan nummer met 1 ophogen
        $number = (int) str_replace($prefix, '', $last->name);
        $number++;

        return $prefix . $number;
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_groups_pivot')->withPivot('laposta_member_id', 'laposta_member_state', 'laposta_last_error_message', 'member_created_at', 'member_to_group_since');
    }

    public function participants()
    {
        return $this->belongsToMany(ParticipantProject::class, 'group_participant_pivot', 'contact_group_id', 'participant_id');
    }

    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    public function simulatedGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function emailTemplateNewContactLink()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_new_contact_link');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }


    // Only unfinished task is a task. A finished task is a note
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)
            ->orderBy('tasks.id', 'desc');
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function getType()
    {
        if (!$this->type_id) {
            return null;
        }

        return ContactGroupType::get($this->type_id);
    }

    public function getInspectionPersonType()
    {
        if(!$this->inspection_person_type_id) return null;

        return InspectionPersonType::get($this->inspection_person_type_id);
    }

    public function filters()
    {
        return $this->hasMany(DynamicContactGroupFilter::class)->where('type', 'filter');
    }

    public function extraFilters()
    {
        return $this->hasMany(DynamicContactGroupFilter::class)->where('type', 'extraFilter');
    }

    public function contactGroups()
    {
        return $this->belongsToMany(ContactGroup::class, 'composed_contact_group', 'parent_group_id', 'group_id');
    }

    public function contactGroupsExcepted()
    {
        return $this->belongsToMany(ContactGroup::class, 'composed_contact_group_excepted', 'parent_group_id', 'group_id');
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_contact_group');
    }
    public function getDynamicContacts()
    {
        $requestQuery = '';

        $filters = $this->filters;
        $extraFilters = $this->extraFilters;

        $requestFilters = [];
        $requestExtraFilters = [];

        foreach ($filters as $filter) {
            array_push($requestFilters, ['field' => $filter->field, 'data' => $filter->data]);
        }

        foreach ($extraFilters as $extraFilter) {
            array_push($requestExtraFilters,
                ['field' => $extraFilter->field, 'type' => $extraFilter->comperator, 'data' => $extraFilter->data, 'connectName' => $extraFilter->connect_name, 'connectedTo' => $extraFilter->connected_to]);
        }

        $requestFilters = json_encode($requestFilters);
        $requestExtraFilters = json_encode($requestExtraFilters);

        $request = new Request();
        $request->replace(['filters' => $requestFilters, 'extraFilters' => $requestExtraFilters, 'filterType' => $this->dynamic_filter_type]);

        if ($this->composed_of === 'contacts') {
        //todo WM: check, Hier schieten we dus dus een loop als we in RequestQuery teamContactIds gaan bepalen !!!
        // Vanuit hier, geen check op teamContactIds.
            $requestQuery = new \App\Http\RequestQueries\Contact\Grid\RequestQuery($request, new \App\Http\RequestQueries\Contact\Grid\Filter($request), new \App\Http\RequestQueries\Contact\Grid\Sort($request), new \App\Http\RequestQueries\Contact\Grid\Joiner(),
                new \App\Http\RequestQueries\Contact\Grid\ExtraFilter($request), false);
        }
        else if ($this->composed_of === 'participants') {
            $requestQuery = new \App\Http\RequestQueries\ParticipantProject\Grid\RequestQuery($request, new \App\Http\RequestQueries\ParticipantProject\Grid\Filter($request), new \App\Http\RequestQueries\ParticipantProject\Grid\Sort($request), new \App\Http\RequestQueries\ParticipantProject\Grid\Joiner(),
                new \App\Http\RequestQueries\ParticipantProject\Grid\ExtraFilter($request));
        }

        return $requestQuery;
    }

    public function getComposedContactsAttribute()
    {
        $contacts = (new Contact())->newCollection();

        foreach ($this->contactGroups as $contactGroup) {

            //als id al is geweest, sneller en tegen infinite loop
            if (in_array($contactGroup->id, $this->hasComposedIds)) {
                continue;
            }

            if (count($contacts) == 0) {
                $contacts = $contactGroup->getAllContacts();
            } else {
                $tempContacts = $contactGroup->getAllContacts();

                //one - in een van de groepen
                //all - in alle groepen
                //
                //contacts merge(ontdubbelen)
                if ($tempContacts && $this->composed_group_type === 'one') {

                    $contacts = $contacts->merge($tempContacts);
                }
                else if ($tempContacts && $this->composed_group_type === 'all') {
                    $contacts = $contacts->intersect($tempContacts);
                }
            }
            array_push($this->hasComposedIds, $contactGroup->id);
        }

        return $contacts;
    }

    public function getComposedExceptContactsAttribute()
    {
        $contacts = (new Contact())->newCollection();

        foreach ($this->contactGroupsExcepted as $contactGroupExcepted) {

            //als id al is geweest, sneller en tegen infinite loop
            if (in_array($contactGroupExcepted->id, $this->hasComposedExceptedIds)) {
                continue;
            }

            if (count($contacts) == 0) {
                $contacts = $contactGroupExcepted->getAllContacts();
            } else {
                $tempContacts = $contactGroupExcepted->getAllContacts();

                //one - in een van de groepen
                //all - in alle groepen
                //
                //contacts merge(ontdubbelen)
                if ($tempContacts && $this->composed_group_type === 'one') {

                    $contacts = $contacts->merge($tempContacts);
                }
                else if ($tempContacts && $this->composed_group_type === 'all') {
                    $contacts = $contacts->intersect($tempContacts);
                }
            }
            array_push($this->hasComposedExceptedIds, $contactGroupExcepted->id);
        }

        return $contacts;
    }

    public function getAllContactGroupContactsAttribute()
    {
        $groupContacts = $this->all_contacts;
        foreach ($groupContacts as $groupContact){

            $contactGroupsPivot = null;
            if($groupContact->groups()->where('contact_group_id', ($this->simulatedGroup ? $this->simulatedGroup->id : $this->id))->exists()){
                $contactGroupsPivot = $groupContact->groups()->where('contact_group_id', ($this->simulatedGroup ? $this->simulatedGroup->id : $this->id))->first()->pivot;
            }

            $groupContact->laposta_member_id = $contactGroupsPivot ? $contactGroupsPivot->laposta_member_id : null;
            $groupContact->laposta_member_state = $contactGroupsPivot ? $contactGroupsPivot->laposta_member_state : null;
            $groupContact->laposta_last_error_message = $contactGroupsPivot ? $contactGroupsPivot->laposta_last_error_message : null;
            $groupContact->member_created_at = $contactGroupsPivot ? $contactGroupsPivot->member_created_at : null;
            $groupContact->member_to_group_since = $contactGroupsPivot ? $contactGroupsPivot->member_to_group_since : null;
        }
        return $groupContacts;
    }

    public function getAllContactGroupContactsForReportAttribute()
    {
        $groupContactsForReport = [];
        $groupContacts = $this->all_contacts;
        foreach ($groupContacts as $groupContact){

            $contactGroupsPivot = null;
            if($groupContact->groups()->where('contact_group_id', ($this->simulatedGroup ? $this->simulatedGroup->id : $this->id))->exists()){
                $contactGroupsPivot = $groupContact->groups()->where('contact_group_id', ($this->simulatedGroup ? $this->simulatedGroup->id : $this->id))->first()->pivot;
            }
            $groupContactsForReport[] = [
                'id' => $groupContact->id,
                'member_to_group_since' => ($contactGroupsPivot ? $contactGroupsPivot->member_to_group_since : null),
            ];
        }
        return $groupContactsForReport;
    }

    // todo
    //  gebruik van hasComposedIds en hasComposedExceptedIds elimineren uit dit model
    //  ik denk dat we de complexe getAllContacts uit dit model moeten halen en verplaatsen
    //  naar controller of een helper.
    //  nu gaat het dus fout als je ergens contactGroup->all_contacts 2x achter elkaar gebruikt.
    //  Deze kunnen dan verschillende resultaten geven als er samengesteld en uitgezonderde groepen
    //  worden gebruikt !! Dit om de velden hasComposedIds en hasComposedExceptedIds bij de 2x nl.
    //  al gevuld zijn door de 1e keer.
    public function getAllContactsAttribute()
    {
        //gebruikt om infinite loop te checken bij samengestelde groepen
        array_push($this->hasComposedIds, $this->id);

        $contacts = $this->getAllContacts();

        $this->hasComposedIds = [];

        if(!$contacts){
            return new Collection();
        }

        return $contacts->unique('id')->values();
    }

    public function getAllContacts(bool $onlyIds = false)
    {
        if ($this->type_id === 'static' || $this->type_id === 'simulated') {
            if ($this->composed_of === 'contacts') {
                if($onlyIds){
                    return $this->contacts()->get()->pluck('id')->toArray();
                } else {
                    return $this->contacts()->get();
                }
            } else {
                if ($this->composed_of === 'participants') {
                    $participants = $this->participants()->get();

                    $participants->load(['contact']);

                    $contactIds = array();
                    $contactCollections = new Collection();

                    foreach ($participants as $participant) {
                        if($onlyIds){
                            $contactIds[] = $participant->contact_id;
                        } else {
                            $contactCollections->push($participant->contact);
                        }
                    }

                    if($onlyIds){
                        return $contactIds;
                    } else {
                        return $contactCollections;
                    }
                }
            }
        } elseif ($this->type_id === 'dynamic') {
            if ($this->composed_of === 'contacts') {
                if($onlyIds){
                    return $this->getDynamicContacts()->get()->pluck('id')->toArray();
                } else {
                    return $this->getDynamicContacts()->get();
                }
            } else {
                if ($this->composed_of === 'participants') {
                    $participants = $this->getDynamicContacts()->get();

                    $participants->load(['contact']);

                    $contactIds = [];
                    $contactCollections = new Collection();

                    foreach ($participants as $participant) {
                        if($onlyIds){
                            $contactIds[] = $participant->contact_id;
                        } else {
                            $contactCollections->push($participant->contact);
                        }
                    }

                    if($onlyIds){
                        return $contactIds;
                    } else {
                        return $contactCollections;
                    }
                }
            }
        } elseif ($this->type_id === 'composed') {
            $contactCollections = $this->composed_contacts->diff($this->composed_except_contacts);
            if($onlyIds){
                return $contactCollections->pluck('id')->toArray();
            } else {
                return $contactCollections;
            }
        }

        return false;
    }

    //prevents deleting in grid
    public function getIsUsedInComposedGroupAttribute(){
        $composedGroups = ContactGroup::where('type_id', 'composed')->get();

        foreach ($composedGroups as $composedGroup){
            foreach ($composedGroup->contactGroups as $contactGroup){
                if($this->id === $contactGroup->id){
                    return true;
                }
            }
        }

        return false;
    }

    public function getParentGroupsArrayAttribute(){
        $composedGroups = ContactGroup::where('type_id', 'composed')->get();

        $parentGroups = [];

        foreach ($composedGroups as $composedGroup){
            foreach ($composedGroup->contactGroups as $contactGroup){
                if($this->id === $contactGroup->id){
                    $parentGroups[] = $composedGroup->name;
                }
            }
        }

        return $parentGroups;
    }

    // syncronized with lapasta
    public function getIsUsedInLapostaAttribute(){

        // Dynamic of Composed groups worden met simulated group gesyncroniseerd met laposta.
        if($this->type_id === 'dynamic' || $this->type_id === 'composed' ){
            if($this->simulatedGroup){
                return ContactGroup::where('id', $this->simulatedGroup->id)->whereNotNull('laposta_list_id')->exists();
            }
        }else{
            return ContactGroup::where('id', $this->id)->whereNotNull('laposta_list_id')->exists();
        }

        return false;
   }

    // Contactgroup up-to-date with Laposta?
    public function getGroupUpToDateWithLapostaAttribute(){

        if($this->is_used_in_laposta){
            if($this->simulatedGroup){
                $contactGroupToAdd = $this->getAllContacts()->diff($this->simulatedGroup->getAllContacts());
                if(count($contactGroupToAdd)){
                    return false;
                }
                $contactGroupToRemove = $this->simulatedGroup->getAllContacts()->diff($this->getAllContacts());
                if(count($contactGroupToRemove)){
                    return false;
                }
                if(count($this->simulatedGroup->contacts->whereNull('pivot.laposta_member_id')) > 0){
                    return false;
                }
                if(count($this->simulatedGroup->contacts->where('pivot.laposta_member_state', 'unknown')) > 0){
                    return false;
                }
            } else {
                if(count($this->contacts->whereNull('pivot.laposta_member_id')) > 0){
                    return false;
                }
                if(count($this->contacts->where('pivot.laposta_member_state', 'unknown')) > 0){
                    return false;
                }
            }
        }
        return true;
    }

    // simulategroup up-to-date?
    public function getNumberOfLapostaMembersAttribute(){

        if($this->simulatedGroup){
            $numberOfLapostaMembers = $this->simulatedGroup->contacts()->whereNotNull('laposta_member_id')->count();
        }else{
            $numberOfLapostaMembers = $this->contacts()->whereNotNull('laposta_member_id')->count();
        }
        return $numberOfLapostaMembers;
    }

    public function newEloquentBuilder($query)
    {
        return new ContactGroupBuilder($query);
    }
}
