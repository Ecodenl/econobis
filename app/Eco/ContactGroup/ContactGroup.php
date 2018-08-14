<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\RequestQueries\Contact\Grid\ExtraFilter;
use App\Http\RequestQueries\Contact\Grid\Filter;
use App\Http\RequestQueries\Contact\Grid\Joiner;
use App\Http\RequestQueries\Contact\Grid\RequestQuery;
use App\Http\RequestQueries\Contact\Grid\Sort;
use App\Http\Resources\Contact\FullContact;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
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

    public function contacts()
    {
        return $this->belongsToMany(Contact::class, 'contact_groups_pivot');
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
                ['field' => $extraFilter->field, 'type' => $extraFilter->comperator, 'data' => $extraFilter->data]);
        }

        $requestFilters = json_encode($requestFilters);
        $requestExtraFilters = json_encode($requestExtraFilters);

        $request = new Request();
        $request->replace(['filters' => $requestFilters, 'extraFilters' => $requestExtraFilters]);

        $requestQuery = new RequestQuery($request, new Filter($request), new Sort($request), new Joiner(),
            new ExtraFilter($request));

        return ($requestQuery);
    }

    public function getComposedContactsAttribute()
    {
        $contacts = null;

        foreach ($this->contactGroups as $contactGroup) {

            //als id al is geweest, sneller en tegen infinite loop
            if(in_array($contactGroup->id, $this->hasComposedIds)){
                continue;
            }

            if($contacts === null){
                $contacts = $contactGroup->getAllContacts();
                array_push($this->hasComposedIds, $contactGroup->id);
            }
            else{
                $contacts = $contacts->merge($contactGroup->getAllContacts());
                array_push($this->hasComposedIds, $contactGroup->id);
            }
        }

        return $contacts;
    }

    public function getAllContactsAttribute()
    {
        //gebruikt om infinite loop te checken bij samengestelde groepen
        array_push($this->hasComposedIds, $this->id);

        $contacts = $this->getAllContacts();

        $this->hasComposedIds = [];

        return $contacts ? $contacts->unique('id')->values() : false;
    }

    public function getAllContacts()
    {
        if ($this->type_id === 'static') {
            return $this->contacts()->get();
        } elseif ($this->type_id === 'dynamic') {
            return $this->dynamic_contacts->get();
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
