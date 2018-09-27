<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Laracasts\Presenter\PresentableTrait;

class ContactGroup extends Model
{
    use PresentableTrait, SoftDeletes;
    protected $presenter = ContactGroupPresenter::class;

    protected $casts
        = [
            'closed' => 'boolean',
        ];

    protected $guarded = ['id'];

    protected $dates
        = [
            'date_started',
            'date_finished',
            'created_at',
            'updated_at',
        ];

    protected $appends
        = [
            'dynamic_contacts',
            'composed_contacts',
            'all_contacts',
            'is_used_in_composed_group'
        ];

    //gebruikt om infinite loop te checken bij samengestelde groepen
    private $hasComposedIds = [];

    public static function getAutoIncrementedName(string $prefix)
    {
        // Prefix altijd gevolgd door 1 spatie (ook als deze spatie al wordt meegegeven)
        $prefix = trim($prefix) . ' ';

        $last = static::where('name', 'like', $prefix . '%')
            ->orderBy('name', 'desc')
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
        return $this->belongsToMany(Contact::class, 'contact_groups_pivot');
    }

    public function participants()
    {
        return $this->belongsToMany(ParticipantProductionProject::class, 'group_participant_pivot', 'contact_group_id', 'participant_id');
    }

    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
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

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function getDynamicContactsAttribute()
    {
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
            $requestQuery = new \App\Http\RequestQueries\Contact\Grid\RequestQuery($request, new \App\Http\RequestQueries\Contact\Grid\Filter($request), new \App\Http\RequestQueries\Contact\Grid\Sort($request), new \App\Http\RequestQueries\Contact\Grid\Joiner(),
                new \App\Http\RequestQueries\Contact\Grid\ExtraFilter($request));
        }
        else if ($this->composed_of === 'participants') {
            $requestQuery = new \App\Http\RequestQueries\ParticipantProductionProject\Grid\RequestQuery($request, new \App\Http\RequestQueries\ParticipantProductionProject\Grid\Filter($request), new \App\Http\RequestQueries\ParticipantProductionProject\Grid\Sort($request), new \App\Http\RequestQueries\ParticipantProductionProject\Grid\Joiner(),
                new \App\Http\RequestQueries\ParticipantProductionProject\Grid\ExtraFilter($request));
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

            if ($contacts === null) {
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

    public function getAllContactsAttribute()
    {
        //gebruikt om infinite loop te checken bij samengestelde groepen
        array_push($this->hasComposedIds, $this->id);

        $contacts = $this->getAllContacts();

        $this->hasComposedIds = [];

        if($this->composed_of === 'contacts') {
            return $contacts ? $contacts->unique('id')->values() : new Collection();
        }
        else if($this->composed_of === 'participants'){
            return $contacts ? $contacts->unique('id')->values() : new Collection();
        }
        else if($this->composed_of === 'both'){
            return $contacts ? $contacts->unique('id')->values() : new Collection();
        }
    }

    public function getAllContacts()
    {
        if ($this->type_id === 'static') {
            if ($this->composed_of === 'contacts') {
                return $this->contacts()->get();
            } else {
                if ($this->composed_of === 'participants') {
                    $participants = $this->participants()->get();

                    $participants->load(['contact']);

                    $contactCollections = new Collection();

                    foreach ($participants as $participant) {
                        $contactCollections->push($participant->contact);
                    }

                    return $contactCollections;
                }
            }
        } elseif ($this->type_id === 'dynamic') {
            if ($this->composed_of === 'contacts') {
                return $this->dynamic_contacts->get();
            } else {
                if ($this->composed_of === 'participants') {
                    $participants = $this->dynamic_contacts->get();

                    $participants->load(['contact']);

                    $contactCollections = new Collection();

                    foreach ($participants as $participant) {
                        $contactCollections->push($participant->contact);
                    }

                    return $contactCollections;
                }
            }
        } elseif ($this->type_id === 'composed') {
            return $this->composed_contacts;
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
}
