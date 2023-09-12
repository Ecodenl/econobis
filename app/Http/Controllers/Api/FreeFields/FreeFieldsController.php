<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\FreeFields;

use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\FreeFields\Grid\RequestQuery;
use App\Http\Resources\FreeFields\GridFreeFields;

class FreeFieldsController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $freeFields = $requestQuery->get();

        return GridFreeFields::collection($freeFields)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

}