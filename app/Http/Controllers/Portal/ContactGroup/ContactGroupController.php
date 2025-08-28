<?php

namespace App\Http\Controllers\Portal\ContactGroup;

use App\Eco\ContactGroup\ContactGroup;
use App\Http\Controllers\Api\ApiController;

class ContactGroupController extends ApiController
{

    public function index()
    {
        $contactGroups = ContactGroup::orderByRaw('portal_sort_order IS NULL, portal_sort_order ASC')
            ->orderBy('name', 'ASC')
            ->get();

        return $contactGroups;
    }

}