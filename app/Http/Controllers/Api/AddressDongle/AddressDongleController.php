<?php

namespace App\Http\Controllers\Api\AddressDongle;

use App\Eco\AddressDongle\AddressDongle;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AddressDongle\FullAddressDongle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddressDongleController extends ApiController
{
    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('typeReadOut')->alias('type_read_out')->next()
            ->string('macNumber')->whenMissing(null)->onEmpty(null)->alias('mac_number')->next()
            ->integer('typeDongle')->alias('type_dongle')->next()
            ->integer('energieId')->alias('energie_id')->next()
            ->date('dateSigned')->alias('date_signed')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $addressDongle = new AddressDongle();

        $addressDongle->fill($data);
        $addressDongle->created_by_id = Auth::id();
        $addressDongle->updated_by_id = Auth::id();

        Log::info($addressDongle);

//        $this->authorize('create', $addressDongle);

        $addressDongle->save();

        return ['addressDongle' => FullAddressDongle::make($addressDongle)];
    }

//    public function update(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
//    {
//        $this->authorize('update', $addressEnergySupplier);
//
//        $data = $requestInput
//            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
//            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
//            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
//            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
//            ->date('endDate')->whenMissing(null)->onEmpty(null)->alias('end_date')->next()
//            ->string('esNumber')->alias('es_number')->next()
//            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
//            ->get();
//
//        $addressEnergySupplier->fill($data);
//
//        if ($this->validateOverlapPeriode($addressEnergySupplier, false)) {
//            $this->setEndDateAddressEnergySupplier($addressEnergySupplier);
//        }
//
//        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
//        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since') ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d') : '1900-01-01';
//
//        $addressEnergySupplier->save();
//
//        $revenuePartsKwhArray = [];
//        // indien membersince gewijzigd en er was een vorige einddatum, dan check voor splitsen opbrengstverdelingen.
//        if($aesMemberSince!=$aesMemberSinceOriginal && Carbon::parse($addressEnergySupplier->end_date_previous)->format('Y-m-d') != '1900-01-01' ) {
//            $participations = $addressEnergySupplier->address->participations;
//            foreach ($participations as $participation) {
//                $projectType = $participation->project->projectType;
//                if ($projectType->code_ref === 'postalcode_link_capital') {
//                    $revenuesKwhHelper = new RevenuesKwhHelper();
//                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
//                    if($splitRevenuePartsKwhResponse){
//                        $revenuePartsKwhArray [] = $splitRevenuePartsKwhResponse;
//                    }
//                }
//            }
//        }
//
//        // LETOP: Laravel 7 uses a new date serialization format when using the toArray or toJson method on Eloquent models.
//        // To format dates for serialization, the framework now uses Carbon's toJSON method, which produces an ISO-8601 compatible
//        // date including timezone information and fractional seconds. In addition, this change provides better support and
//        // integration with client-side date parsing libraries.
//        // Previously, dates would be serialized to a format like the following: 2019-11-30 00:00:00.000000. Dates serialized using the
//        // new format will appear like: 2019-11-29T23:00:00.000000Z. Please note that ISO-8601 dates are always expressed in UTC.
//        //
//        // We halen hierom voor teruggeven AddressEnergySupplier even opnieuw op, anders geven we verkeerde datum terug (nl. 2019-11-29 in
//        // bovenstaand voorbeeld).
//        $addressEnergySupplier = AddressEnergySupplier::find($addressEnergySupplier->id);
//        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');
//
//        if(count($revenuePartsKwhArray) > 0){
//            $projectsArray = [];
//            foreach ($revenuePartsKwhArray as $revenuePartsKwhItem){
//                $projectsArray[] = ['projectMessage' => $revenuePartsKwhItem['projectMessage']];
//            }
//            $revenuePartsKwhRedirect = null;
//            if(count($revenuePartsKwhArray) == 1){
//                if($revenuePartsKwhArray[0]['success'] && $revenuePartsKwhArray[0]['newRevenue'] ){
//                    $revenuePartsKwhRedirect = 'project/opbrengst-kwh/nieuw/' . $revenuePartsKwhArray[0]['projectId']  . '/1';
//                }
//                if($revenuePartsKwhArray[0]['success'] && !$revenuePartsKwhArray[0]['newRevenue'] ){
//                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/' . $revenuePartsKwhArray[0]['revenuesId']  . '/deelperiode/' . $revenuePartsKwhArray[0]['revenuePartsId'];
//                }
//            }
//
//            $responseParticipations = ['hasParticipations' => true, 'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,  'projectsArray' => $projectsArray];
//        }else{
//            $responseParticipations = ['hasParticipations' => false, null, 'projectsArray' => []];
//        }
//        return ['addressEnergySupplier' => FullAddressDongle::make($addressEnergySupplier), 'responseParticipations' => $responseParticipations];
//    }
//
    public function destroy(AddressDongle $addressDongle)
    {
//        $this->authorize('delete', $addressDongle);

        $addressDongle->delete();
    }
}
