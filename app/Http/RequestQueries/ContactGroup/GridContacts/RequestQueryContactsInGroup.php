<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 9:28
 */

namespace App\Http\RequestQueries\ContactGroup\GridContacts;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Http\Request;

class RequestQueryContactsInGroup extends \App\Helpers\RequestQuery\RequestQuery
{

    public function __construct(
        Request $request,
        Filter $filter,
        Sort $sort,
        Joiner $joiner
    ) {
        parent::__construct($request, $filter, $sort, $joiner);
    }

    protected function baseQuery()
    {
        $contactGroupId = $this->request->input('contactGroupId');
        $contactGroup = ContactGroup::find($contactGroupId);
        if($contactGroup){
            $contactGroupContactsIds = $contactGroup->all_contact_group_contacts_ids;
        } else {
            $contactGroupContactsIds = [];
        };

        return Contact::query()
            ->whereIn('contacts.id', $contactGroupContactsIds)
            ->select('contacts.*');
    }

}