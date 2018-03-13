<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\PostalCodeLink;

use App\Eco\PostalCodeLink\PostalCodeLink;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\PostalCodeLink\Grid\RequestQuery;
use App\Http\Resources\PostalCodeLink\FullPostalCodeLink;

class PostalCodeLinkController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $postalCodeLinks = $requestQuery->get();

        return FullPostalCodeLink::collection($postalCodeLinks)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('postalCodeMain')->validate('required|integer|between:999,9999')->alias('postalcode_main')->next()
            ->integer('postalCodeLink')->validate('required|integer|between:999,9999')->alias('postalcode_link')->next()
            ->get();


        //basic PostalCodeLink
        $postalCodeLink = new PostalCodeLink();
        $postalCodeLink->fill($data);
        $postalCodeLink->save();

        return FullPostalCodeLink::collection(PostalCodeLink::all());
    }


    public function update(RequestInput $requestInput, PostalCodeLink $postalCodeLink)
    {
        $data = $requestInput
            ->integer('postalCodeMain')->validate('required|integer|between:999,9999')->alias('postalcode_main')->next()
            ->integer('postalCodeLink')->validate('required|integer|between:999,9999')->alias('postalcode_link')->next()
            ->get();

        $postalCodeLink->fill($data);
        $postalCodeLink->save();

        return FullPostalCodeLink::collection(PostalCodeLink::all());
    }

    public function destroy(PostalCodeLink $postalCodeLink)
    {
        $postalCodeLink->forceDelete();
    }
}