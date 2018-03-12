<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\ProductionProject\FullProductionProjectRevenue;
use Carbon\Carbon;

class ProductionProjectRevenueController extends ApiController
{
    public function show(ProductionProjectRevenue $productionProjectRevenue)
    {
        $productionProjectRevenue->load([
            'type',
            'category',
            'createdBy',
            'distribution.contact',
            'productionProject.participantsProductionProject.contact.primaryAddress',
            'productionProject.participantsProductionProject.contact.primaryContactEnergySupplier.energySupplier',
            'productionProject.participantsProductionProject.participantProductionProjectPayoutType',
        ]);

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

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
            ->date('datePayed')->validate('nullable|date')->alias('date_payed')->onEmpty(null)->next()
            ->integer('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->integer('typeId')->validate('nullable|exists:production_project_revenue_type,id')->onEmpty(null)->alias('type_id')->next()
            ->get();

        $productionProjectRevenue = new ProductionProjectRevenue();

        $productionProjectRevenue->fill($data);

        $productionProjectRevenue->save();

        if($productionProjectRevenue->confirmed){
            $this->saveDistribution($productionProjectRevenue);
            $productionProjectRevenue->load('distribution');
        }

        $productionProjectRevenue->load('createdBy', 'productionProject');

        return FullProductionProjectRevenue::make($productionProjectRevenue);
    }


    public function update(RequestInput $requestInput, ProductionProjectRevenue $productionProjectRevenue)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

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

        $productionProjectRevenue->confirmed && $this->saveDistribution($productionProjectRevenue);

        return FullProductionProjectRevenue::collection(ProductionProjectRevenue::where('production_project_id', $productionProjectRevenue->production_project_id)->with('createdBy', 'productionProject', 'type', 'distribution')->orderBy('date_begin')->get());
    }

    public function saveDistribution(
        ProductionProjectRevenue $productionProjectRevenue
    ) {

        $productionProjectRevenue->date_payed = new Carbon();
        $productionProjectRevenue->save();

        $productionProject = $productionProjectRevenue->productionProject;
        $participants = $productionProject->participantsProductionProject;

        $totalParticipations = 0;

        foreach ($participants as $participant) {
            $totalParticipations .= $participant->participations_current;
        }

        foreach ($participants as $participant) {
            $contact = Contact::find($participant->contact_id);
            $primaryAddress = $contact->primaryAddress;
            $primaryContactEnergySupplier
                = $contact->primaryContactEnergySupplier;

            $distribution = new ProductionProjectRevenueDistribution();

            $distribution->revenue_id
                = $productionProjectRevenue->id;
            $distribution->contact_id = $contact->id;

            if ($primaryAddress) {
                $distribution->address = $primaryAddress->present()
                    ->streetAndNumber();
                $distribution->postal_code = $primaryAddress->postal_code;
                $distribution->city = $primaryAddress->city;
            }

            $distribution->status = $contact->getStatus()->name;
            $distribution->participations_amount
                = $participant->participations_current;

            $distribution->payout = (($productionProjectRevenue->revenue
                        * ($productionProjectRevenue->pay_percentage / 100))
                    / $totalParticipations)
                * $participant->participations_current;

            $distribution->payout_type = $participant->participantProductionProjectPayoutType->name;
            $distribution->date_payout = $productionProjectRevenue->date_payed;

            if ($primaryContactEnergySupplier) {
                $distribution->energy_supplier_name
                    = $primaryContactEnergySupplier->energySupplier->name;
            }

            $distribution->save();
        }
    }

    public function destroy(ProductionProjectRevenue $productionProjectRevenue)
    {
        $this->authorize('manage', ProductionProjectRevenue::class);

        $productionProjectRevenue->forceDelete();
    }
}