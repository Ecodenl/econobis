<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;
use Config;
use Illuminate\Support\Facades\DB;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCodeNumber',
        'statusId',
        'createdAt',
        'currentParticipations',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
        'statusId' => 'contacts.status_id',
        'createdAt' => 'contacts.created_at',
    ];

    protected $joins = [
        'postalCodeNumber' => 'address',
    ];

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = 'SUBSTRING(addresses.postal_code, 1, 4)';
        RequestExtraFilter::applyWhereRaw($query, $raw, $type, $data);
        return false;
    }

    protected function applyCurrentParticipationsFilter($query, $type, $data)
    {
        DB::statement("set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'");

        $contactIdsQuery = DB::table('contacts');
        $contactIdsQuery->leftJoin('participation_production_project', function($join){
            $join->on('participation_production_project.contact_id', '=', 'contacts.id');
        });

        $contactIdsQuery->select(DB::raw('contacts.id, participation_production_project.status_id, sum(participation_production_project.participations_granted - participation_production_project.participations_sold) as currentParticipations'));
        $contactIdsQuery->where('participation_production_project.status_id', 2);
        $contactIdsQuery->groupBy('contacts.id');
        RequestExtraFilter::applyHavingFilter($contactIdsQuery, 'currentParticipations' , $type, $data);
        $contactIds = $contactIdsQuery->get()->pluck('id');

        $query->whereIn('contacts.id', $contactIds);
        $query->groupBy('contacts.id');
        return false;
    }
}