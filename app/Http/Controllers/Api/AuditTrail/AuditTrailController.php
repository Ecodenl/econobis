<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\AuditTrail;

use App\Eco\AuditTrail\AuditTrail;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\AuditTrail\Grid\RequestQuery;
use App\Http\Resources\AuditTrail\GridAuditTrail;

class AuditTrailController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $this->authorize('view', AuditTrail::class);

        $revisions = $requestQuery->get();

        $revisions->load(['user']);

        return GridAuditTrail::collection($revisions)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function peekModels()
    {
       $auditModels = AuditTrail::all()->unique('revisionable_type')->pluck('revisionable_type')->toArray();

       $dropdownModels = [];

        foreach ($auditModels as $auditModel) {
            $dropdownModels[] =
            [
                'id' => $auditModel,
                //only last part of model
                'name' => array_values(array_slice(explode('\\', $auditModel),
                -1))[0]
            ];
        }

        return $dropdownModels;
    }
}