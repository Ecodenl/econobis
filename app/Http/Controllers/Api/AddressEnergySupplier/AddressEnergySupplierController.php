<?php

namespace App\Http\Controllers\Api\AddressEnergySupplier;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Helpers\AddressEnergySupplier\AddressEnergySupplierHelper;
use App\Helpers\Delete\Models\DeleteAddressEnergySupplier;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;

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

        $message = $this->validateOwnPeriod($addressEnergySupplier, false);

        if (!$message) {
            if ($addressEnergySupplier->end_date) {
                try {
                    $this->validateEndDateDoesNotBreakRevenueDistributions($addressEnergySupplier);
                } catch (HttpException $e) {
                    $message = $e->getMessage();
                }
            }
        }

        return [
            'responseValidation' => [
                'hasErrors' => (bool) $message,
                'message' => $message ?: '',
            ]
        ];
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

        $message = $this->validateOwnPeriod($addressEnergySupplier, false);

        if (!$message) {
            try {
                $this->validateAllowedUpdateAddressEnergySupplier($addressEnergySupplier, $data);
            } catch (HttpException $e) {
                $message = $e->getMessage();
            }
        }

        if (!$message) {
            $memberSinceChanged = $this->hasDateFieldChanged($addressEnergySupplier, 'member_since');

            // Bij wijziging van member_since wordt overlap automatisch opgelost in update()
            if (!$memberSinceChanged) {
                $message = $this->validateOverlapPeriode($addressEnergySupplier, false);
            }
        }

        if (!$message) {
            if ($this->hasDateFieldChanged($addressEnergySupplier, 'end_date')) {
                try {
                    $this->validateEndDateDoesNotBreakRevenueDistributions($addressEnergySupplier);
                } catch (HttpException $e) {
                    $message = $e->getMessage();
                }
            }
        }

        return [
            'responseValidation' => [
                'hasErrors' => (bool) $message,
                'message' => $message ?: '',
            ]
        ];
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

        // Nieuwe periode moet altijd aansluiten op vorige relevante periode
        if ($addressEnergySupplier->member_since) {
            $this->syncPreviousAddressEnergySupplierEndDate($addressEnergySupplier);
        }

        if ($addressEnergySupplier->end_date) {
            $this->validateEndDateDoesNotBreakRevenueDistributions($addressEnergySupplier);
        }
        $this->validateAddressEnergySupplier($addressEnergySupplier, true);

        $addressEnergySupplier->save();

        $revenuePartsKwhArray = [];
        if (Carbon::parse($addressEnergySupplier->end_date_previous)->format('Y-m-d') != '1900-01-01') {
            $participations = $addressEnergySupplier->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();
                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh(
                        $participation,
                        $addressEnergySupplier->member_since,
                        $addressEnergySupplier
                    );

                    $revenuesKwhHelper->refreshDistributionPartsKwhEnergySupplierDataForParticipation($participation);

                    if ($splitRevenuePartsKwhResponse) {
                        $revenuePartsKwhArray[] = $splitRevenuePartsKwhResponse;
                    }
                }
            }
        }

        $addressEnergySupplier = AddressEnergySupplier::find($addressEnergySupplier->id);
        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');

        if (count($revenuePartsKwhArray) > 0) {
            $projectsArray = [];
            foreach ($revenuePartsKwhArray as $revenuePartsKwhItem) {
                $projectsArray[] = ['projectMessage' => $revenuePartsKwhItem['projectMessage']];
            }

            $revenuePartsKwhRedirect = null;
            if (count($revenuePartsKwhArray) == 1) {
                if ($revenuePartsKwhArray[0]['success'] && $revenuePartsKwhArray[0]['newRevenue']) {
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/nieuw/' . $revenuePartsKwhArray[0]['projectId'] . '/1';
                }
                if ($revenuePartsKwhArray[0]['success'] && !$revenuePartsKwhArray[0]['newRevenue']) {
                    $revenuePartsKwhRedirect = '/project/opbrengst-kwh/' . $revenuePartsKwhArray[0]['revenuesId'] . '/deelperiode/' . $revenuePartsKwhArray[0]['revenuePartsId'];
                }
            }

            $responseParticipations = [
                'hasParticipations' => true,
                'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,
                'projectsArray' => $projectsArray
            ];
        } else {
            $responseParticipations = [
                'hasParticipations' => false,
                'revenuePartsKwhRedirect' => null,
                'projectsArray' => []];
        }

        return [
            'addressEnergySupplier' => FullAddressEnergySupplier::make($addressEnergySupplier),
            'responseParticipations' => $responseParticipations
        ];
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

        $this->validateAllowedUpdateAddressEnergySupplier($addressEnergySupplier, $data);

        $memberSinceChanged = $this->hasDateFieldChanged($addressEnergySupplier, 'member_since');

        if ($memberSinceChanged) {
            $this->syncPreviousAddressEnergySupplierEndDate($addressEnergySupplier);
        }

        if ($this->hasDateFieldChanged($addressEnergySupplier, 'end_date')) {
            $this->validateEndDateDoesNotBreakRevenueDistributions($addressEnergySupplier);
        }
        $this->validateAddressEnergySupplier($addressEnergySupplier, true);

        $aesMemberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';
        $aesMemberSinceOriginal = $addressEnergySupplier->getOriginal('member_since') ? Carbon::parse($addressEnergySupplier->getOriginal('member_since'))->format('Y-m-d') : '1900-01-01';

        $addressEnergySupplier->save();

        $revenuePartsKwhArray = [];
        // indien membersince gewijzigd en er was een vorige einddatum, dan check voor splitsen opbrengstverdelingen.
        if($aesMemberSince != $aesMemberSinceOriginal && Carbon::parse($addressEnergySupplier->end_date_previous)->format('Y-m-d') != '1900-01-01') {
            $participations = $addressEnergySupplier->address->participations;
            foreach ($participations as $participation) {
                $projectType = $participation->project->projectType;
                if ($projectType->code_ref === 'postalcode_link_capital') {
                    $revenuesKwhHelper = new RevenuesKwhHelper();

                    $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh(
                        $participation,
                        $addressEnergySupplier->member_since,
                        $addressEnergySupplier
                    );

                    $revenuesKwhHelper->refreshDistributionPartsKwhEnergySupplierDataForParticipation($participation);

                    if($splitRevenuePartsKwhResponse){
                        $revenuePartsKwhArray[] = $splitRevenuePartsKwhResponse;
                    }
                }
            }
        }

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

            $responseParticipations = [
                'hasParticipations' => true,
                'revenuePartsKwhRedirect' => $revenuePartsKwhRedirect,
                'projectsArray' => $projectsArray
            ];
        }else{
            $responseParticipations = [
                'hasParticipations' => false,
                'revenuePartsKwhRedirect' => null,
                'projectsArray' => []
            ];
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

            if (count($result) > 0) {
                DB::rollBack();
                abort(412, implode('; ', array_unique($result)));
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
        $message = $this->validateOwnPeriod($addressEnergySupplier, false);
        if ($message) {
            if ($withAbort) {
                 abort(422, $message);
            }
            return $message;
        }

        $message = $this->validateOverlapPeriode($addressEnergySupplier, false);
        if ($message) {
            if ($withAbort) {
                abort(422, $message);
            }
            return $message;
        }

        return false;
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
            }
        }else{
            if($addressEnergySupplier->is_current_supplier == true)
            {
                $addressEnergySupplier->is_current_supplier = false;
                $addressEnergySupplier->save();
            }
        }
    }

    private function getRelevantEnergySupplyTypeIds(int $energySupplyTypeId): array
    {
        if ($energySupplyTypeId === 1) {
            return [1, 3];
        }

        if ($energySupplyTypeId === 2) {
            return [2, 3];
        }

        return [1, 2, 3];
    }

    private function getMostRecentRelevantAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier): ?AddressEnergySupplier
    {
        $types = $this->getRelevantEnergySupplyTypeIds((int) $addressEnergySupplier->energy_supply_type_id);

        return AddressEnergySupplier::query()
            ->where('address_id', $addressEnergySupplier->address_id)
            ->whereIn('energy_supply_type_id', $types)
            ->orderByRaw('CASE WHEN member_since IS NULL THEN 0 ELSE 1 END DESC')
            ->orderBy('member_since', 'desc')
            ->orderBy('id', 'desc')
            ->first();
    }

    private function isMostRecentRelevantAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier): bool
    {
        $mostRecent = $this->getMostRecentRelevantAddressEnergySupplier($addressEnergySupplier);

        return $mostRecent && (int) $mostRecent->id === (int) $addressEnergySupplier->id;
    }

    private function getPreviousRelevantAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier): ?AddressEnergySupplier
    {
        if (!$addressEnergySupplier->member_since) {
            return null;
        }

        $types = $this->getRelevantEnergySupplyTypeIds((int) $addressEnergySupplier->energy_supply_type_id);

        $query = AddressEnergySupplier::query()
            ->where('address_id', $addressEnergySupplier->address_id)
            ->whereIn('energy_supply_type_id', $types)
            ->whereNotNull('member_since')
            ->where('member_since', '<', $addressEnergySupplier->member_since)
            ->orderBy('member_since', 'desc')
            ->orderBy('id', 'desc');

        if ($addressEnergySupplier->id) {
            $query->where('id', '!=', $addressEnergySupplier->id);
        }

        return $query->first();
    }

    private function validateAllowedUpdateAddressEnergySupplier(
        AddressEnergySupplier $addressEnergySupplier,
        array $data
    ): void {
        $typeChanged = array_key_exists('energy_supply_type_id', $data)
            && $addressEnergySupplier->isDirty('energy_supply_type_id');

        if ($typeChanged) {
            abort(422, 'Wijzigen van leverancierstype is niet toegestaan. Maak hiervoor een nieuwe periode aan.');
        }

        $memberSinceChanged = array_key_exists('member_since', $data)
            && $this->hasDateFieldChanged($addressEnergySupplier, 'member_since');

        $endDateChanged = array_key_exists('end_date', $data)
            && $this->hasDateFieldChanged($addressEnergySupplier, 'end_date');



        if (($memberSinceChanged || $endDateChanged) && !$this->isMostRecentRelevantAddressEnergySupplier($addressEnergySupplier)) {
            abort(422, 'Alleen de meest recente periode voor hetzelfde adres en leverancierstype Elektriciteit en/of Gas mag gewijzigd worden.');
        }
    }

    private function validateOwnPeriod(AddressEnergySupplier $addressEnergySupplier, $withAbort = true)
    {
        if (
            $addressEnergySupplier->member_since
            && $addressEnergySupplier->end_date
            && Carbon::parse($addressEnergySupplier->end_date)->lt(Carbon::parse($addressEnergySupplier->member_since))
        ) {
            $message = "Eind datum mag niet vóór 'Klant sinds' liggen.";

            if ($withAbort) {
                abort(422, $message);
            }

            return $message;
        }

        return false;
    }

    private function syncPreviousAddressEnergySupplierEndDate(AddressEnergySupplier $addressEnergySupplier): void
    {
        if (!$addressEnergySupplier->member_since) {
            return;
        }

        $previousAddressEnergySupplier = $this->getPreviousRelevantAddressEnergySupplier($addressEnergySupplier);

        if (!$previousAddressEnergySupplier) {
            return;
        }

        $newEndDate = Carbon::parse($addressEnergySupplier->member_since)->subDay()->format('Y-m-d');

        $previousAddressEnergySupplier->end_date = $newEndDate;
        $previousAddressEnergySupplier->save();
    }

    private function validateEndDateDoesNotBreakRevenueDistributions(AddressEnergySupplier $addressEnergySupplier): void
    {
        $messages = AddressEnergySupplierHelper::getEndDateBlockingMessages($addressEnergySupplier);
        if (!empty($messages)) {
            abort(422, implode('; ', array_unique($messages)));
        }
    }

    private function hasDateFieldChanged(AddressEnergySupplier $addressEnergySupplier, string $field): bool
    {
        $originalValue = $addressEnergySupplier->getOriginal($field);
        $currentValue = $addressEnergySupplier->{$field};

        $originalDate = $originalValue ? Carbon::parse($originalValue)->format('Y-m-d') : null;
        $currentDate = $currentValue ? Carbon::parse($currentValue)->format('Y-m-d') : null;

        return $originalDate !== $currentDate;
    }

}
