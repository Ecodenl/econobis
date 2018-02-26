<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\ProductionProject\ProductionProjectValueCourse;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ProductionProject\FullProductionProjectValueCourse;

class ProductionProjectValueCourseController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('productionProjectId')->validate('required|exists:production_projects,id')->alias('production_project_id')->next()
            ->date('date')->validate('required|date')->next()
            ->integer('bookWorth')->validate('required')->alias('book_worth')->next()
            ->integer('transferWorth')->alias('transfer_worth')->next()
            ->get();

        $productionProjectValueCourse = new ProductionProjectValueCourse();

        $productionProjectValueCourse->fill($data);

        $productionProjectValueCourse->save();

        $productionProjectValueCourse->load('createdBy', 'productionProject');

        return FullProductionProjectValueCourse::collection(ProductionProjectValueCourse::where('production_project_id', $productionProjectValueCourse->production_project_id)->with('createdBy', 'productionProject')->orderBy('date')->get());
    }


    public function update(RequestInput $requestInput, ProductionProjectValueCourse $productionProjectValueCourse)
    {
        $data = $requestInput
            ->date('date')->validate('required|date')->next()
            ->integer('bookWorth')->validate('required')->alias('book_worth')->next()
            ->integer('transferWorth')->alias('transfer_worth')->next()
            ->get();

        $productionProjectValueCourse->fill($data);

        $productionProjectValueCourse->save();

        return FullProductionProjectValueCourse::collection(ProductionProjectValueCourse::where('production_project_id', $productionProjectValueCourse->production_project_id)->with('createdBy', 'productionProject')->orderBy('date')->get());
    }

    public function destroy(ProductionProjectValueCourse $productionProjectValueCourse)
    {
        $productionProjectValueCourse->forceDelete();
    }
}