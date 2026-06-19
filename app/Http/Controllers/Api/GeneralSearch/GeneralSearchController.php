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
            'Organisaties' => [
                'model' => 'App\Eco\Organisation\Organisation',
                'search_method' => 'String',
                'search_fields' => [
                    'KvK' => 'chamber_of_commerce_number',
                    'Btw nummer' => 'vat_number'
                ],
                'relation_id' => 'contact_id',
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

        //set locale to nl_NL for best iconv of $searchField and $searchWord
        setlocale(LC_CTYPE, 'nl_NL');

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
                    $searchField = iconv('UTF-8', 'ASCII//TRANSLIT', $item[$search_field]);
//                    $searchField = preg_replace('/[^A-Za-z0-9 -]/', '', $searchField);

                    foreach ($searchWords as $searchWord) {
                        $searchWord = iconv('UTF-8', 'ASCII//TRANSLIT', $searchWord);
//                        $searchWord = preg_replace('/[^A-Za-z0-9 -]/', '', $searchWord);
                        if ($searchWord && str_contains(strtolower($searchField),
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

        usort($data['Contacten'], $this->sortOnFoundValue());
        usort($data['Adressen'], $this->sortOnFoundValue());
        usort($data['E-mailadressen'], $this->sortOnFoundValue());

        return $data;
    }

    /**
     * @return \Closure
     */
    private function sortOnFoundValue(): \Closure
    {
        return function ($a, $b) {
            return strcmp(strtolower($a['found_value']), strtolower($b['found_value']));
        };
    }
}