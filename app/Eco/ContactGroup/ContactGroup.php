<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\CooperationCleanupContactsExcludedGroup;
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
use Illuminate\Support\Facades\Log;
use Laracasts\Presenter\PresentableTrait;

class ContactGroup extends Model
{
    use PresentableTrait, SoftDeletes, HasFactory;
    protected $presenter = ContactGroupPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'closed' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    //gebruikt om infinite loop te checken bij samengestelde groepen
    private $hasComposedIds = [];
    private $hasComposedExceptedIds = [];
    private $doLog = false;

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

    public function cleanupContactsExcludedGroups()
    {
        return $this->hasMany(CooperationCleanupContactsExcludedGroup::class);
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
        } else if ($this->composed_of === 'participants') {
            $requestQuery = new \App\Http\RequestQueries\ParticipantProject\Grid\RequestQuery($request, new \App\Http\RequestQueries\ParticipantProject\Grid\Filter($request), new \App\Http\RequestQueries\ParticipantProject\Grid\Sort($request), new \App\Http\RequestQueries\ParticipantProject\Grid\Joiner(),
                new \App\Http\RequestQueries\ParticipantProject\Grid\ExtraFilter($request));
        }

        //todo WM: Tijdelijke log regel voor testen in Valleienergie, later weer weghalen !!!
//        if ($this->id === 78) {
//            Log::info('debug sql');
//            $sql = str_replace(array('?'), array('\'%s\''), $requestQuery->getQuery()->toSql());
//            $sql = vsprintf($sql, $requestQuery->getQuery()->getBindings());
//            Log::info($sql);
//        }
        return $requestQuery;
    }

    public function getComposedContactsAttribute()
    {
        // Originele staat bewaren (voor het geval dit nog ergens anders gebruikt wordt)
        $originalHasComposedIds = $this->hasComposedIds ?? [];

        // Zorg dat deze groep zelf ook in de lijst staat om infinite loops te voorkomen
        if (! in_array($this->id, $this->hasComposedIds)) {
            $this->hasComposedIds[] = $this->id;
        }

        $contacts = (new Contact())->newCollection();

        foreach ($this->contactGroups as $contactGroup) {

            if (in_array($contactGroup->id, $this->hasComposedIds)) {
                continue;
            }

            if ($contacts->isEmpty()) {
                $contacts = $contactGroup->getAllContacts() ?: collect();
            } else {
                $tempContacts = $contactGroup->getAllContacts() ?: collect();

                if ($tempContacts->isNotEmpty() && $this->composed_group_type === 'one') {
                    $contacts = $contacts->merge($tempContacts);
                } elseif ($tempContacts->isNotEmpty() && $this->composed_group_type === 'all') {
                    $contacts = $contacts->intersect($tempContacts);
                }
            }

            $this->hasComposedIds[] = $contactGroup->id;

            if($this->doLog) {
                Log::info('Contacts from group', [
                    'contact_group_id' => $contactGroup->id,
                    'contact_group_name' => $contactGroup->name,
                    'contacts_count' => $contacts->count(),
                ]);
            }
        }

        // Dubbele contacts eruit
        $contacts = $contacts->unique('id')->values();

        // hasComposedIds herstellen zodat een volgende call schoon start
        $this->hasComposedIds = $originalHasComposedIds;

        return $contacts;
    }

    public function getComposedExceptContactsAttribute()
    {
        // Originele staat bewaren, zodat een volgende call schoon begint
        $originalHasComposedExceptedIds = $this->hasComposedExceptedIds ?? [];

        // Zorg dat deze groep zelf ook in de lijst staat om infinite loops te voorkomen
        if (! in_array($this->id, $this->hasComposedExceptedIds)) {
            $this->hasComposedExceptedIds[] = $this->id;
        }

        $contacts = (new Contact())->newCollection();

        foreach ($this->contactGroupsExcepted as $contactGroupExcepted) {

            if (in_array($contactGroupExcepted->id, $this->hasComposedExceptedIds)) {
                continue;
            }

            if ($contacts->isEmpty()) {
                $contacts = $contactGroupExcepted->getAllContacts() ?: collect();
            } else {
                $tempContacts = $contactGroupExcepted->getAllContacts() ?: collect();

                if ($tempContacts->isNotEmpty() && $this->composed_group_type === 'one') {
                    $contacts = $contacts->merge($tempContacts);
                } elseif ($tempContacts->isNotEmpty() && $this->composed_group_type === 'all') {
                    $contacts = $contacts->intersect($tempContacts);
                }
            }

            $this->hasComposedExceptedIds[] = $contactGroupExcepted->id;
        }

        // Dubbele eruit, net als bij composed_contacts
        $contacts = $contacts->unique('id')->values();

        // State herstellen, zodat de volgende call niet "besmet" is
        $this->hasComposedExceptedIds = $originalHasComposedExceptedIds;

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

    public function getAllContactGroupContactsIdsAttribute()
    {
        return $this->all_contacts->pluck('id')->toArray();
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

    public function getAllContactsAttribute()
    {
        $contacts = $this->getAllContacts();

        if (! $contacts) {
            return new Collection();
        }

        return $contacts->unique('id')->values();
    }

    public function getAllContacts(bool $onlyIds = false, bool $doLog = false)
    {
        // oude waarde bewaren
        $previousDoLog = $this->doLog;

        // tijdelijke override voor deze call
        $this->doLog = $doLog;

        // default: lege array of geen resultaat
        $result = $onlyIds ? [] : false;

        if ($this->type_id === 'static' || $this->type_id === 'simulated') {
            if ($this->composed_of === 'contacts') {
                if($onlyIds){
                    $result = $this->contacts()->get()->pluck('id')->toArray();
                } else {
                    $result = $this->contacts()->get();
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
                        $result = $contactIds;
                    } else {
                        $result = $contactCollections;
                    }
                }
            }
        } elseif ($this->type_id === 'dynamic') {
            if ($this->composed_of === 'contacts') {
                if($onlyIds){
                    $result = $this->getDynamicContacts()->get()->pluck('id')->toArray();
                } else {
                    $result = $this->getDynamicContacts()->get();
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
                        $result = $contactIds;
                    } else {
                        $result = $contactCollections;
                    }
                }
            }
        } elseif ($this->type_id === 'composed') {
            $contactCollections = $this->composed_contacts->diff($this->composed_except_contacts);
            if($onlyIds){
                $result = $contactCollections->pluck('id')->toArray();
            } else {
                $result = $contactCollections;
            }
        }

        // state herstellen vóór we returnen
        $this->doLog = $previousDoLog;

        return $result;
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
    public function getIsUsedInExceptedGroupAttribute(){
        return count($this->parentGroupsExceptedArray) > 0;
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

    public function getParentGroupsExceptedArrayAttribute(){
        $composedGroups = ContactGroup::where('type_id', 'composed')->get();

        $parentGroups = [];

        foreach ($composedGroups as $composedGroup){
            foreach ($composedGroup->contactGroupsExcepted as $contactGroupExcepted){
                if($this->id === $contactGroupExcepted->id){
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
