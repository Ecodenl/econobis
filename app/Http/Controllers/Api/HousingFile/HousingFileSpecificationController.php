<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;


use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\HousingFileSpecification\Grid\RequestQuery;
use App\Http\Resources\HousingFile\GridHousingFileSpecification;

class HousingFileSpecificationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $housingFileSpecifications = $requestQuery->get();

        $housingFileSpecifications->load(['housingFile.address', 'housingFile.address.contact']);

        return GridHousingFileSpecification::collection($housingFileSpecifications)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }


}