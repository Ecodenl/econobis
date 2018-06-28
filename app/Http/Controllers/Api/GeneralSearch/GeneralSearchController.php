<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 26-1-2018
 * Time: 13:03
 */

namespace App\Http\Controllers\Api\GeneralSearch;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralSearchController
{

    public function search(Request $request)
    {
//        Add data to search here
//        'Name of search results' => [
//        'model' => 'Full path of model',
//                'search_method' => 'Words or String',
//                'search_fields' => ['Name of field for frontend' => 'db name'],
//                'relation_id' => 'id',
//                'relation_name' => 'name for frontend ',
//                'relation_redirect' => 'route for redirect'
//            ],

        $searchArray = [
            'Contacten' => [
                'model' => 'App\Eco\Contact\Contact',
                'search_method' => 'String',
                'search_fields' => [
                    'Naam' => 'full_name',
                    'Nummer' => 'number'
                ],
                'relation_id' => 'id',
                'relation_name' => 'Contact ',
                'relation_redirect' => '/contact/'
            ],
            'Adressen' => [
                'model' => 'App\Eco\Address\Address',
                'search_method' => 'Words',
                'search_fields' => [
                    'Straat' => 'street',
                    'Stad' => 'city',
                    'Huisnummer' => 'number',
                    'Postcode' => 'postal_code'
                ],
                'relation_id' => 'contact_id',
                'relation_name' => 'Contact ',
                'relation_redirect' => '/contact/'
            ],
            'E-mailadressen' => [
                'model' => 'App\Eco\EmailAddress\EmailAddress',
                'search_method' => 'String',
                'search_fields' => ['E-mail' => 'email'],
                'relation_id' => 'contact_id',
                'relation_name' => 'Contact ',
                'relation_redirect' => '/contact/'
            ],
        ];

        //get search words
        $searchText = [$request['searchText']];
        $searchWords = explode(' ', $request['searchText']);

        //the actual searches
        foreach ($searchArray as $name => $search) {
            //search words or whole string based on Model
            if ($search['search_method'] === 'String') {
                $searches = $searchText;
            } elseif ($search['search_method'] === 'Words') {
                $searches = $searchWords;
            }

            $select = $search['search_fields'];
            $select[] = $search['relation_id'];

            //get base query
            $query = $search['model']::query()->select($select);
            //get rest of query
            foreach ($search['search_fields'] as $search_field) {
                $query->orWhere(function ($query) use (
                    $searches,
                    $search_field
                ) {
                    foreach ($searches as $searchWord) {
                        $query->orWhere($search_field, 'LIKE',
                            '%' . $searchWord . '%');
                    }
                });
            }

            $data[$name] = $query->get()->toArray();

            foreach ($data[$name] as &$item) {
                $foundInFields = [];
                $foundValue = [];
                foreach (
                    $search['search_fields'] as $search_field_name =>
                    $search_field
                ) {
                    foreach ($searchWords as $searchWord) {
                        if (str_contains(strtolower($item[$search_field]),
                            $searchWord)
                        ) {
                            $foundInFields[] = $search_field_name;
                            $foundValue[] = $item[$search_field];
                        }
                    }
                }
                $item['found_in'] = implode(', ', $foundInFields);
                $item['found_value'] = implode(', ', $foundValue);
                $item['relation'] = $search['relation_name'] . $item[$search['relation_id']];
                $item['redirect'] = $search['relation_redirect'] . $item[$search['relation_id']];
            }

        }

        return $data;
    }
}