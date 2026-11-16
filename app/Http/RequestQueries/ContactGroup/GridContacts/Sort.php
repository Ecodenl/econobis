<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ContactGroup\GridContacts;


use App\Eco\ContactGroup\ContactGroup;
use App\Helpers\RequestQuery\RequestSort;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Sort extends RequestSort
{

    protected $fields = [
//        'id',
        'number',
        'typeName',
        'fullName',
        'emailAddress',
        'memberToGroupSince',
    ];

    protected $mapping = [
//        'id' => 'contacts.id',
        'number' => 'contacts.number',
        'typeName' => 'contacts.type_id',
        'fullName' => 'contacts.full_name',
        'emailAddress' => 'email_addresses.email',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
    ];

    /**
     * @var Request
     */
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
        parent::__construct($request);
    }

    /**
     * "Toegevoegd aan groep op" staat niet op contacts, maar op contact_groups_pivot.
     * Bij dynamische/samengestelde groepen staat de pivot op de gesimuleerde groep
     * (zelfde logica als in ContactGroupController::gridContacts).
     * Sorteren via een subquery i.p.v. een join, zodat er geen dubbele rijen kunnen ontstaan.
     */
    protected function applyMemberToGroupSinceSort($query, $order)
    {
        $contactGroup = ContactGroup::find($this->request->input('contactGroupId'));
        if (!$contactGroup) {
            return false;
        }
        $pivotGroupId = $contactGroup->simulatedGroup ? $contactGroup->simulatedGroup->id : $contactGroup->id;

        $query->orderBy(
            DB::table('contact_groups_pivot')
                ->select('member_to_group_since')
                ->whereColumn('contact_groups_pivot.contact_id', 'contacts.id')
                ->where('contact_groups_pivot.contact_group_id', $pivotGroupId)
                ->limit(1),
            $order
        );

        // default sort niet meer uitvoeren
        return false;
    }

    protected function applyFinalSort($query)
    {
        // Tiebreaker: veel contacten hebben dezelfde datum (bulk toevoegen / conversie).
        // Pas na alle overige sorteervelden sorteren op ID, zodat meervoudige
        // sortering behouden blijft en paginering stabiel is.
        foreach ($this->sorts as $sort) {
            if ($sort['field'] === 'memberToGroupSince') {
                $query->orderBy('contacts.id', $sort['order']);
                break;
            }
        }
    }
}
