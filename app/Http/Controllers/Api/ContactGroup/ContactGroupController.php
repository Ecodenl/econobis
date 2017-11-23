<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\ContactGroup\Grid\RequestQuery;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\ContactGroup\GridContactGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactGroupController extends Controller
{
    public function grid(RequestQuery $query)
    {
        return GridContactGroup::collection($query->get());
    }

    public function show(ContactGroup $contactGroup)
    {
        $contactGroup->load(['responsibleUser', 'createdBy', 'contacts']);
        return FullContactGroup::make($contactGroup);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput->string('name')->whenMissing('')->next()
            ->string('description')->whenMissing('')->next()
            ->boolean('closed')->whenMissing(false)->next()
            ->integer('responsibleUserId')->default(null)->validate('exists:users,id')->alias('responsible_user_id')->next()
            ->date('dateStarted')->default(null)->validate('date')->alias('date_started')->next()
            ->date('dateFinished')->default(null)->validate('date')->alias('date_finished')->next()
            ->get();

        $contactGroup = new ContactGroup($data);
        $contactGroup->save();
    }
}
