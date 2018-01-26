<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\AuditTrail;

use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\AuditTrail\Grid\RequestQuery;
use App\Http\Resources\AuditTrail\GridAuditTrail;

class AuditTrailController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $revisions = $requestQuery->get();

        $revisions->load(['user']);

        return GridAuditTrail::collection($revisions)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }
}