<?php

namespace App\Http\Controllers\Api\User;

use App\Eco\User\User;
use App\Http\RequestQueries\User\Grid\RequestQuery;
use App\Http\Resources\User\GridUserCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GridController extends Controller
{
    public function index(Request $request, RequestQuery $requestQuery)
    {
        $this->authorize('view', User::class);

        $contacts = $requestQuery->get();

        return new GridUserCollection($contacts);
    }
}
