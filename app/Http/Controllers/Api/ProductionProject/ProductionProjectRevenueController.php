<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\ProductionProject\ProductionProjectValueCourse;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ProductionProject\FullProductionProjectRevenue;

class ProductionProjectRevenueController extends ApiController
{
    public function show(ProductionProjectRevenue $productionProjectRevenue)
    {
        $productionProjectRevenue->load([
            'type',
            'category',
            'createdBy',
            'productionProject.participantsProductionProject.contact.primaryAddress'
        ]);

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('categoryId')->validate('required|exists:production_project_revenue_category,id')->alias('category_id')->next()
            ->integer('productionProjectId')->validate('required|exists:production_projects,id')->alias('production_project_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')->next()
            ->date('dateEntry')->validate('required|date')->alias('date_entry')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->integer('revenue')->onEmpty(null)->next()
            ->date('datePayed')->validate('nullable|date')->alias('date_payed')->next()
            ->integer('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->integer('typeId')->validate('nullable|exists:production_project_revenue_type,id')->onEmpty(null)->alias('type_id')->next()
            ->get();

        $productionProjectRevenue = new ProductionProjectRevenue();

        $productionProjectRevenue->fill($data);

        $productionProjectRevenue->save();

        $productionProjectRevenue->load('createdBy', 'productionProject');

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }


    public function update(RequestInput $requestInput, ProductionProjectRevenue $productionProjectRevenue)
    {
        $data = $requestInput
            ->integer('categoryId')->validate('required|exists:production_project_revenue_category,id')->alias('category_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('required|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('required|date')->alias('date_end')->next()
            ->date('dateEntry')->validate('required|date')->alias('date_entry')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->integer('revenue')->onEmpty(null)->next()
            ->date('datePayed')->validate('nullable|date')->alias('date_payed')->next()
            ->integer('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->integer('typeId')->validate('nullable|exists:production_project_revenue_type,id')->onEmpty(null)->alias('type_id')->next()
            ->get();

        $productionProjectRevenue->fill($data);

        $productionProjectRevenue->save();

        $productionProjectRevenue->load('createdBy', 'productionProject');

        return FullProductionProjectRevenue::collection(ProductionProjectRevenue::where('production_project_id', $productionProjectRevenue->production_project_id)->with('createdBy', 'productionProject', 'type')->orderBy('date_begin')->get());
    }

    public function destroy(ProductionProjectRevenue $productionProjectRevenue)
    {
        $productionProjectRevenue->forceDelete();
    }
}