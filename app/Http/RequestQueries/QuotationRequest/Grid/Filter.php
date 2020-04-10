<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\QuotationRequest\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Carbon\Carbon;

class Filter extends RequestFilter
{
    protected $fields = [
        'organisation',
        'contact',
        'address',
        'measure',
        'createdAtStart',
        'createdAtEnd',
        'dateRecorded',
        'statusId',
        'dateReleased',
    ];

    protected $mapping = [
        'organisation' => 'organisations.name',
        'contact' => 'contacts.full_name',
        'measure' => 'measure_categories.name',
        'dateRecorded' => 'quotation_requests.date_recorded',
        'statusId' => 'quotation_requests.status_id',
        'dateReleased' => 'quotation_requests.date_released',
    ];

    protected $joins = [
        'organisation' => 'organisation',
        'contact' => 'contact',
        'address' => 'address',
        'measure' => 'measure',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'statusId' => 'eq',
    ];

    protected function applyCreatedAtStartFilter($query, $type, $data)
    {
        $query->where('created_at', '>=', Carbon::parse($data)->startOfDay());
        return false;
    }
    protected function applyCreatedAtEndFilter($query, $type, $data)
    {
        $query->where('created_at', '<=', Carbon::parse($data)->endOfDay());
        return false;
    }
    protected function applyAddressFilter($query, $type, $data)
    {
        // Elke term moet in een van de naam velden voor komen.
        // Opbreken in array zodat 2 losse woorden ook worden gevonden als deze in 2 verschillende velden staan
        $terms = explode(' ', $data);

        foreach ($terms as $term){
            $query->where(function($query) use ($term) {
                $query->where('addresses.street', 'LIKE', '%' . $term . '%');
                $query->orWhere('addresses.number', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }
}
