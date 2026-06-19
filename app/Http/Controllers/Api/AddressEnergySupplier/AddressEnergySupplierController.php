<?php

namespace App\Http\Controllers\Api\AddressEnergySupplier;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Helpers\Delete\Models\DeleteAddressEnergySupplier;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddressEnergySupplierController extends ApiController
{
    public function validateAddressEnergySupplierFormNew(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->date('endDate')->whenMissing(null)->onEmpty(null)->alias('end_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        $addressEnergySupplier = new AddressEnergySupplier();
        $addressEnergySupplier->fill($data);

        $hasOverlapPeriode = $this->validateOverlapPeriode($addressEnergySupplier, false);
        if($hasOverlapPeriode){
            $responseOverlap = ['hasOverlap' => true, 'message' => $hasOverlapPeriode];
        }else{
            $responseOverlap = ['hasOverlap' => false, 'message' => ''];
        }
        return ['responseOverlap' => $responseOverlap];
    }

    public function validateAddressEnergySupplierForm(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->date('endDate')->whenMissing(null)->onEmpty(null)->alias('end_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        $addressEnergySupplier->fill($data);

        $hasOverlapPeriode = $this->validateOverlapPeriode($addressEnergySupplier, false);
        if($hasOverlapPeriode){
            $responseOverlap = ['hasOverlap' => true, 'message' => $hasOverlapPeriode];
        }else{
            $responseOverlap = ['hasOverlap' => false, 'message' => ''];
        }

        return ['responseOverlap' => $responseOverlap];
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('energySupplierId')->alias('energy_supplier_id')->next()
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->date('endDate')->whenMissing(null)->onEmpty(null)->alias('end_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        $addressEnergySupplier = new AddressEnergySupplier();

        $addressEnergySupplier->fill($data);

        $this->authorize('create', $addressEnergySupplier);

        if ($this->validateOverlapPeriode($addressEnergySupplier, false)) {
            $this->setEndDateAddressEnergySupplier($addressEnergySupplier);
        }

        $addressEnergySupplier->save();

        $revenuePartsKwhArray = [];
        if(Carbon::parse($addressEnergySupplier->end_date_previous)->format('Y-m-d') != '1900-01-01'){
            $participations = $addressEnergySupplier->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();
                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
                    if($splitRevenuePartsKwhResponse){
                        $revenuePartsKwhArray [] = $splitRevenuePartsKwhResponse;
                    }
                }
            }
        }
        // LETOP: Laravel 7 uses a new date serialization format when using the toArray or toJson method on Eloquent models.
        // To format dates for serialization, the framework now uses Carbon's toJSON method, which produces an ISO-8601 compatible
        // date including timezone information and fractional seconds. In addition, this change provides better support and
        // integration with client-side date parsing libraries.
        // Previously, dates would be serialized to a format like the following: 2019-11-30 00:00:00.000000. Dates serialized using the
        // new format will appear like: 2019-11-29T23:00:00.000000Z. Please note that ISO-8601 dates are always expressed in UTC.
        //
        // We halen hierom voor teruggeven AddressEnergySupplier even opnieuw op, anders geven we verkeerde datum terug (nl. 2019-11-29 in
        // bovenstaand voorbeeld).
        $addressEnergySupplier = AddressEnergySupplier::find($addressEnergySupplier->id);
        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');

        if(count($revenuePartsKwhArray) > 0){
            $projectsArray = [];
            foreach ($revenuePartsKwhArray as $revenuePartsKwhItem){
                $projectsArray[] = ['projectMessage' => $revenuePartsKwhItem['projectMessage']];
            }
            $revenuePartsKwhRedirect = null;
            if(count($revenuePartsKwhArray) == 1){
                if($revenuePartsKwhArray[0]['success'] && $revenuePartsKwhArray[0]['newRevenue'] ){
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/nieuw/' . $revenuePartsKwhArray[0]['projectId']  . '/1';
                }
                if($revenuePartsKwhArray[0]['success'] && !$revenuePartsKwhArray[0]['newRevenue'] ){
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/' . $revenuePartsKwhArray[0]['revenuesId']  . '/deelperiode/' . $revenuePartsKwhArray[0]['revenuePartsId'];
                }
            }

            $responseParticipations = ['hasParticipations' => true, 'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,  'projectsArray' => $projectsArray];
        }else{
            $responseParticipations = ['hasParticipations' => false, null, 'projectsArray' => []];
        }
        return ['addressEnergySupplier' => FullAddressEnergySupplier::make($addressEnergySupplier), 'responseParticipations' => $responseParticipations];
    }

    public function update(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
    {
        $this->authorize('update', $addressEnergySupplier);

        $data = $requestInput
            ->string('energySupplyTypeId')->validate('required|exists:energy_supply_types,id')->alias('energy_supply_type_id')->next()
            ->date('memberSince')->whenMissing(null)->onEmpty(null)->alias('member_since')->next()
            ->string('energySupplyStatusId')->validate('nullable|exists:energy_supply_statuses,id')->whenMissing(null)->onEmpty(null)->alias('energy_supply_status_id')->next()
            ->date('switchDate')->whenMissing(null)->onEmpty(null)->alias('switch_date')->next()
            ->date('endDate')->whenMissing(null)->onEmpty(null)->alias('end_date')->next()
            ->string('esNumber')->alias('es_number')->next()
            ->boolean('isCurrentSupplier')->alias('is_current_supplier')->next()
            ->get();

        $addressEnergySupplier->fill($data);

        if ($this->validateOverlapPeriode($addressEnergySupplier, false)) {
            $this->setEndDateAddressEnergySupplier($addressEnergySupplier);
        }

        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since') ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d') : '1900-01-01';

        $addressEnergySupplier->save();

        $revenuePartsKwhArray = [];
        // indien membersince gewijzigd en er was een vorige einddatum, dan check voor splitsen opbrengstverdelingen.
        if($aesMemberSince!=$aesMemberSinceOriginal && Carbon::parse($addressEnergySupplier->end_date_previous)->format('Y-m-d') != '1900-01-01' ) {
            $participations = $addressEnergySupplier->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();
                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
                    if($splitRevenuePartsKwhResponse){
                        $revenuePartsKwhArray [] = $splitRevenuePartsKwhResponse;
                    }
                }
            }
        }

        // LETOP: Laravel 7 uses a new date serialization format when using the toArray or toJson method on Eloquent models.
        // To format dates for serialization, the framework now uses Carbon's toJSON method, which produces an ISO-8601 compatible
        // date including timezone information and fractional seconds. In addition, this change provides better support and
        // integration with client-side date parsing libraries.
        // Previously, dates would be serialized to a format like the following: 2019-11-30 00:00:00.000000. Dates serialized using the
        // new format will appear like: 2019-11-29T23:00:00.000000Z. Please note that ISO-8601 dates are always expressed in UTC.
        //
        // We halen hierom voor teruggeven AddressEnergySupplier even opnieuw op, anders geven we verkeerde datum terug (nl. 2019-11-29 in
        // bovenstaand voorbeeld).
        $addressEnergySupplier = AddressEnergySupplier::find($addressEnergySupplier->id);
        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');

        if(count($revenuePartsKwhArray) > 0){
            $projectsArray = [];
            foreach ($revenuePartsKwhArray as $revenuePartsKwhItem){
                $projectsArray[] = ['projectMessage' => $revenuePartsKwhItem['projectMessage']];
            }
            $revenuePartsKwhRedirect = null;
            if(count($revenuePartsKwhArray) == 1){
                if($revenuePartsKwhArray[0]['success'] && $revenuePartsKwhArray[0]['newRevenue'] ){
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/nieuw/' . $revenuePartsKwhArray[0]['projectId']  . '/1';
                }
                if($revenuePartsKwhArray[0]['success'] && !$revenuePartsKwhArray[0]['newRevenue'] ){
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/' . $revenuePartsKwhArray[0]['revenuesId']  . '/deelperiode/' . $revenuePartsKwhArray[0]['revenuePartsId'];
                }
            }

            $responseParticipations = ['hasParticipations' => true, 'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,  'projectsArray' => $projectsArray];
        }else{
            $responseParticipations = ['hasParticipations' => false, null, 'projectsArray' => []];
        }
        return ['addressEnergySupplier' => FullAddressEnergySupplier::make($addressEnergySupplier), 'responseParticipations' => $responseParticipations];
    }

    public function destroy(AddressEnergySupplier $addressEnergySupplier)
    {
        $this->authorize('delete', $addressEnergySupplier);

        try {
            DB::beginTransaction();

            $deleteAddressEnergySupplier = new DeleteAddressEnergySupplier($addressEnergySupplier);
            $result = $deleteAddressEnergySupplier->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     */
    public function validateAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier, $withAbort = true)
    {
        return $this->validateOverlapPeriode($addressEnergySupplier, $withAbort);
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     * @param boolean $withAbort
     */
    protected function validateOverlapPeriode(AddressEnergySupplier $addressEnergySupplier, $withAbort = true)
    {
        $otherAddressEnergySuppliers = $this->getOtherAddressEnergySuppliersWithOverlap($addressEnergySupplier);

        if ($otherAddressEnergySuppliers->exists()) {
            if($withAbort){
                abort('422', "Periode 'Klant sinds' t/m 'Eind datum' overlapt met een andere periode voor hetzelfde adres en leverancierstype Elektriciteit en/of Gas.");
            }else{
                return "Periode 'Klant sinds' t/m 'Eind datum' overlapt met een andere periode voor hetzelfde adres en leverancierstype Elektriciteit en/of Gas.";
            }
        }
        return false;
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     */
    public function setEndDateAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier)
    {
        $newEndDate = Carbon::parse($addressEnergySupplier->member_since)->subDay();

        $otherAddressEnergySuppliers = $this->getOtherAddressEnergySuppliersWithOverlap($addressEnergySupplier);
        foreach ($otherAddressEnergySuppliers->get() as $otherAddressEnergySupplier) {
            if($otherAddressEnergySupplier->member_since <= $newEndDate){
                $otherAddressEnergySupplier->end_date = $newEndDate;
                $otherAddressEnergySupplier->save();
            }
        }
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     * @return mixed
     */
    private function getOtherAddressEnergySuppliersWithOverlap(AddressEnergySupplier $addressEnergySupplier)
    {
        $currentId = $addressEnergySupplier ? $addressEnergySupplier->id : 0;
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('address_id', '=', $addressEnergySupplier->address_id)
            ->where('id', '!=', $currentId);
        if ($otherAddressEnergySuppliers->exists()) {

            // check periode member since till end date not overlapping for same energy supplier
            $dateFrom = $addressEnergySupplier->member_since;
            if ($dateFrom == null) {
                $dateFrom = Carbon::parse('1900-01-01');
            }
            $dateTo = $addressEnergySupplier->end_date;
            if ($dateTo == null) {
                $dateTo = Carbon::parse('9999-12-31');
            }

            $otherAddressEnergySuppliers
                ->where(function ($otherAddressEnergySuppliers) use ($dateTo) {
                    $otherAddressEnergySuppliers
                        ->where(function ($otherAddressEnergySuppliers) use ($dateTo) {
                            $otherAddressEnergySuppliers->whereNotNull('member_since')
                                ->where('member_since', '<=', $dateTo);
                        })
                        ->orWhereNull('member_since');
                })
                ->where(function ($otherAddressEnergySuppliers) use ($dateFrom) {
                    $otherAddressEnergySuppliers
                        ->where(function ($otherAddressEnergySuppliers) use ($dateFrom) {
                            $otherAddressEnergySuppliers->whereNotNull('end_date')
                                ->where('end_date', '>=', $dateFrom);
                        })
                        ->orWhereNull('end_date');
                });

            // 1 = Gas
            // 2 = Elektriciteit
            // 3 = Elektriciteit en gas
            if ($addressEnergySupplier->energy_supply_type_id == 1) {
                // huidige type Gas, controleer op overlap met andere met typen Gas en Elektriciteit en Gas
                $types = [1, 3];
            } else if ($addressEnergySupplier->energy_supply_type_id == 2) {
                // huidige type Elektriciteit, controleer op overlap met andere met typen Elektriciteit en Elektriciteit en Gas
                $types = [2, 3];
            } else {
                // huidige type Elektriciteit en gas, controleer op overlap met alle typen Gas, Elektriciteit en Elektriciteit en Gas
                $types = [1, 2, 3];
            }
            $otherAddressEnergySuppliers->whereIn('energy_supply_type_id', $types);
        }
        return $otherAddressEnergySuppliers;
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     */
    public function determineIsCurrentSupplier(AddressEnergySupplier $addressEnergySupplier)
    {
        $today = Carbon::today()->format('Y-m-d');

        if ($addressEnergySupplier->member_since == null) {
            $dateFrom = Carbon::parse('1900-01-01')->format('Y-m-d');
        }else{
            $dateFrom = Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d');
        }
        if ($addressEnergySupplier->end_date == null) {
            $dateTo = Carbon::parse('9999-12-31')->format('Y-m-d');
        }else{
            $dateTo = Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d');
        }

        if($dateFrom <= $today && $dateTo >= $today){
            if($addressEnergySupplier->is_current_supplier == false) {
                $addressEnergySupplier->is_current_supplier = true;
                $addressEnergySupplier->save();
//                Log::info('AddressEnergySupplier ' . $addressEnergySupplier->id . ' is Huidige leverancier geworden!');
            }
        }else{
            if($addressEnergySupplier->is_current_supplier == true)
            {
                $addressEnergySupplier->is_current_supplier = false;
                $addressEnergySupplier->save();
//                Log::info('AddressEnergySupplier ' . $addressEnergySupplier->id . ' is niet langer meer Huidige leverancier!');
            }
        }
    }

}
