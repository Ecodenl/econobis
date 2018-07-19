<?php

namespace App\Eco\ContactGroup;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\RequestQueries\Contact\Grid\ExtraFilter;
use App\Http\RequestQueries\Contact\Grid\Filter;
use App\Http\RequestQueries\Contact\Grid\Joiner;
use App\Http\RequestQueries\Contact\Grid\RequestQuery;
use App\Http\RequestQueries\Contact\Grid\Sort;
use App\Http\Resources\Contact\FullContact;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Laracasts\Presenter\PresentableTrait;

class ContactGroup extends Model
{
    use PresentableTrait;
    protected $presenter = ContactGroupPresenter::class;

    protected $casts = [
        'closed' => 'boolean',
    ];

    protected $guarded = ['id'];

    protected $dates = [
        'date_started',
        'date_finished',
        'created_at',
        'updated_at',
    ];

    protected $appends = [
        'dynamic_contacts'
    ];

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
        return $this->hasMany(Task::class)->whereNull('deleted_at')->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function getType()
    {
        if(!$this->type_id) return null;

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

    public function getDynamicContactsAttribute(){
        $filters = $this->filters;
        $extraFilters = $this->extraFilters;

        $requestFilters = [];
        $requestExtraFilters = [];

        foreach ($filters as $filter){
            array_push($requestFilters, ['field' => $filter->field, 'data' => $filter->data]);
        }

        foreach ($extraFilters as $extraFilter){
            array_push($requestExtraFilters, ['field' => $extraFilter->field, 'type' => $extraFilter->comperator, 'data' => $extraFilter->data]);
        }

        $requestFilters = json_encode($requestFilters);
        $requestExtraFilters = json_encode($requestExtraFilters);

        $request = new Request();
        $request->replace(['filters' => $requestFilters, 'extraFilters' => $requestExtraFilters]);

        $requestQuery = new RequestQuery($request, new Filter($request), new Sort($request), new Joiner(), new ExtraFilter($request));

        return($requestQuery);
    }
}
