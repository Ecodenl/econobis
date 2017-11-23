<?php

namespace App\Http\Controllers\Api\ContactGroup;

use App\Http\RequestQueries\ContactGroup\Grid\RequestQuery;
use App\Http\Resources\ContactGroup\GridContactGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactGroupController extends Controller
{
    public function grid(RequestQuery $query)
    {
        return GridContactGroup::collection($query->get());
    }
}
