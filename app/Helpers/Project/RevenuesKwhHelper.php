<?php

namespace App\Helpers\Project;


use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Jobs\RevenueKwh\UpdateRevenuePartsKwh;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RevenuesKwhHelper
{

    /**
     * @param string $request
     * @param $revenuesKwh
     */
    public function createStartRevenueValuesKwh(array $valuesKwhData, RevenuesKwh $revenuesKwh): void
    {
        RevenueValuesKwh::create([
            'revenue_id' => $revenuesKwh->id,
            'date_registration' => $valuesKwhData['valuesDateBegin'],
            'is_simulated' => false,
            'kwh_start' => $valuesKwhData['kwhStart'],
            'kwh_start_high' => $valuesKwhData['kwhStartHigh'],
            'kwh_start_low' => $valuesKwhData['kwhStartLow'],
            'status' => 'concept',
        ]);

    }

    /**
     * @param string $request
     * @param $revenuesKwh
     */
    public function createStartRevenuePartsKwh(RevenuesKwh $revenuesKwh): void
    {
        $fromDate = Carbon::parse($revenuesKwh->date_begin)->format('Y-m-d');
        $toDate = Carbon::parse($revenuesKwh->date_end)->format('Y-m-d');
        $this->createNewParts($revenuesKwh, $fromDate, $toDate);
    }

    /**
     * @param string $request
     * @param $revenuesKwh
     */
    public function createNewLastRevenuePartsKwh(RevenuesKwh $revenuesKwh)
    {
        $oldLastPartKwh = $revenuesKwh->last_parts_kwh;
        if(!$oldLastPartKwh){
            return false;
        }
        $fromDate = Carbon::parse($oldLastPartKwh->date_end)->addDay()->format('Y-m-d');
        if($oldLastPartKwh->date_begin >= $fromDate){
            return false;
        }
        $toDate = Carbon::parse($revenuesKwh->date_end)->format('Y-m-d');
        $this->createNewParts($revenuesKwh, $fromDate, $toDate);

        foreach ($oldLastPartKwh->distributionPartsKwh as $distributionPartsKwh) {
            $distributionPartsKwh->is_end_total_period = false;
            $distributionPartsKwh->is_visible = $this->determineIsVisible($distributionPartsKwh);
            $distributionPartsKwh->save();
        }

        return true;
    }

    /**
     * @param null $valuesKwhData
     * @param RevenuePartsKwh $revenuePartsKwh
     */
    public function createOrUpdateRevenueValuesKwh($valuesKwhData = null, RevenuePartsKwh $revenuePartsKwh): void
    {
        $createOrUpdateNextRevenueValuesKwh = $this->doCreateOrUpdateRevenueValuesKwh($valuesKwhData, $revenuePartsKwh, false);
        if($createOrUpdateNextRevenueValuesKwh && $revenuePartsKwh->next_revenue_parts_kwh && !$revenuePartsKwh->next_revenue_parts_kwh->confirmed && $revenuePartsKwh->next_revenue_parts_kwh->status == 'concept') {
            $valuesKwhDataNext = [
                'kwhStart' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStart'],
                'kwhStartHigh' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStartHigh'],
                'kwhStartLow' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_start['kwhStartLow'],
                'kwhEnd' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEnd'],
                'kwhEndHigh' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEndHigh'],
                'kwhEndLow' => $revenuePartsKwh->next_revenue_parts_kwh->values_kwh_end['kwhEndLow'],
            ];
            $revenuesKwhHelper = new RevenuesKwhHelper();
            $revenuesKwhHelper->doCreateOrUpdateRevenueValuesKwh($valuesKwhDataNext, $revenuePartsKwh->next_revenue_parts_kwh, true);
            UpdateRevenuePartsKwh::dispatch($revenuePartsKwh->next_revenue_parts_kwh, Auth::id());
        }
    }

    /**
     * @param null $valuesKwhData
     * @param RevenuePartsKwh $revenuePartsKwh
     * @param $alwaysRecalculate
     * @return bool
     */
    protected function doCreateOrUpdateRevenueValuesKwh($valuesKwhData = null, RevenuePartsKwh $revenuePartsKwh, $alwaysRecalculate): bool
    {
        $createOrUpdateNextRevenueValuesKwh = false;

        if($valuesKwhData != null) {

            $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $beginRevenueValuesKwhOriginal = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
            if (!$beginRevenueValuesKwhOriginal || in_array($beginRevenueValuesKwhOriginal->status, ['confirmed', 'processed'])) {
                return $createOrUpdateNextRevenueValuesKwh;
            }

            $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');
            $endRevenueValuesKwhOriginal = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
            if ($endRevenueValuesKwhOriginal && in_array($endRevenueValuesKwhOriginal->status, ['confirmed', 'processed'])) {
                return $createOrUpdateNextRevenueValuesKwh;
            }

            // Als Eindstanden gewijzigd zijn, dan niet langer meer simulated.
            if(
                $endRevenueValuesKwhOriginal
                && $endRevenueValuesKwhOriginal->is_simulated == true
                && ($endRevenueValuesKwhOriginal->kwh_start != $valuesKwhData['kwhEnd']
                    || $endRevenueValuesKwhOriginal->kwh_start_high != $valuesKwhData['kwhEndHigh']
                    || $endRevenueValuesKwhOriginal->kwh_start_low != $valuesKwhData['kwhEndLow'])
            ){
                $endRevenueValuesKwhOriginal->is_simulated = false;
                $endRevenueValuesKwhOriginal->save();
            }

            if($alwaysRecalculate
                || !$beginRevenueValuesKwhOriginal
                || $beginRevenueValuesKwhOriginal->kwh_start_high != $valuesKwhData['kwhStartHigh']
                || $beginRevenueValuesKwhOriginal->kwh_start_low != $valuesKwhData['kwhStartLow']
                || !$endRevenueValuesKwhOriginal
                || $endRevenueValuesKwhOriginal->kwh_start_high != $valuesKwhData['kwhEndHigh']
                || $endRevenueValuesKwhOriginal->kwh_start_low != $valuesKwhData['kwhEndLow']
            ){

                if(!$endRevenueValuesKwhOriginal
                    || $endRevenueValuesKwhOriginal->kwh_start_high != $valuesKwhData['kwhEndHigh']
                    || $endRevenueValuesKwhOriginal->kwh_start_low != $valuesKwhData['kwhEndLow']
                ) {
                    $createOrUpdateNextRevenueValuesKwh = true;
                }
                // Delete bestaande gesimuleerde values kwh
                $partDateDateAfterBegin =  Carbon::parse($revenuePartsKwh->date_begin)->addDay(1)->format('Y-m-d');
                $partDateEnd =  Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
                if( !($revenuePartsKwh->date_begin == $revenuePartsKwh->date_end) ){
                    $conceptSimulatedValuesKwh =  RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->whereBetween('date_registration', [$partDateDateAfterBegin, $partDateEnd])->where('is_simulated', true)->where('status', 'concept');
                    $conceptSimulatedValuesKwh->delete();
                }

                // Bijwerken of aanmaken start values kwh.
                if ($beginRevenueValuesKwhOriginal) {
                    $beginRevenueValuesKwhOriginal->kwh_start = $valuesKwhData['kwhStart'];
                    $beginRevenueValuesKwhOriginal->kwh_start_high = $valuesKwhData['kwhStartHigh'];
                    $beginRevenueValuesKwhOriginal->kwh_start_low = $valuesKwhData['kwhStartLow'];
                    $beginRevenueValuesKwhOriginal->save();
                }

                // Bijwerken of aanmaken end values kwh (deze plaatsen we in start values kwh 1 dag na einddatum.
                if ($endRevenueValuesKwhOriginal) {
                    $endRevenueValuesKwhOriginal->kwh_start = $valuesKwhData['kwhEnd'];
                    $endRevenueValuesKwhOriginal->kwh_start_high = $valuesKwhData['kwhEndHigh'];
                    $endRevenueValuesKwhOriginal->kwh_start_low = $valuesKwhData['kwhEndLow'];
                    $endRevenueValuesKwhOriginal->save();
                } else {
                    RevenueValuesKwh::create([
                        'revenue_id' => $revenuePartsKwh->revenue_id,
                        'date_registration' => $dateRegistrationDayAfterEnd,
                        'is_simulated' => false,
                        'kwh_start' => $valuesKwhData['kwhEnd'],
                        'kwh_start_high' => $valuesKwhData['kwhEndHigh'],
                        'kwh_start_low' => $valuesKwhData['kwhEndLow'],
                        'status' => 'concept',
                        'delivered_kwh' => 0
                    ]);
                }

                // Opnieuw aanmaken simulated values kwh tussen begin en eind datum.
                $this->createOrUpdateRevenueValuesKwhSimulate($revenuePartsKwh->revenue_id, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd);

            }
        }
        return $createOrUpdateNextRevenueValuesKwh;
    }

    /**
     * @param $revenueDistributionPartsKwh
     */
    protected function createOrUpdateRevenueValuesKwhSimulate($revenueId, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd): void
    {
        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin));
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

        $deliveredHighPerDay = round((($endRevenueValuesKwh->kwh_start_high - $beginRevenueValuesKwh->kwh_start_high) / $daysOfPeriod), 6);
        $deliveredLowPerDay = round((($endRevenueValuesKwh->kwh_start_low - $beginRevenueValuesKwh->kwh_start_low) / $daysOfPeriod), 6);
        $deliveredTotalPerDay = round((($endRevenueValuesKwh->kwh_start - $beginRevenueValuesKwh->kwh_start) / $daysOfPeriod), 6);

        $kwhStart = $beginRevenueValuesKwh->kwh_start;
        $kwhEnd = $beginRevenueValuesKwh->kwh_start + $deliveredTotalPerDay;
        $kwhStartHigh = $beginRevenueValuesKwh->kwh_start_high;
        $kwhEndHigh = $beginRevenueValuesKwh->kwh_start_high + $deliveredHighPerDay;
        $kwhStartLow = $beginRevenueValuesKwh->kwh_start_low;
        $kwhEndLow = $beginRevenueValuesKwh->kwh_start_low + $deliveredLowPerDay;
        // Iterate over the period

        $period = CarbonPeriod::create($partDateBegin, $partDateEnd);
        foreach ($period as $date) {
            $dateRegistration = $date->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistration)->first();
            if($revenueValuesKwh) {
                if($revenueValuesKwh->date_registration == $partDateBegin){
                    $revenueValuesKwh->delivered_kwh = $deliveredTotalPerDay;
                    $revenueValuesKwh->save();
                }
            } else {
                // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
                if($dateRegistration == $partDateEnd){
                    $deliveredTotal = $kwhEnd - $kwhStart;
                } else {
                    $deliveredTotal = $deliveredTotalPerDay;
                }

                RevenueValuesKwh::create([
                    'revenue_id' => $revenueId,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'status' => 'concept',
                    'delivered_kwh' => $deliveredTotal,
                ]);
            }
            $kwhStart = $kwhEnd;
            $kwhEnd = $kwhStart + $deliveredTotalPerDay;
            $kwhStartHigh = $kwhEndHigh;
            $kwhEndHigh = $kwhStartHigh + $deliveredHighPerDay;
            $kwhStartLow = $kwhEndLow;
            $kwhEndLow = $kwhStartLow + $deliveredLowPerDay;
        }
    }

    public function saveParticipantsOfDistributionParts(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(300);

        $revenuesKwh = $revenuePartsKwh->revenuesKwh;
        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
            $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
        }
    }

    public function saveNewDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        // Bepalen energiesupplier
        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $daysOfPeriod = Carbon::parse($revenuePartsKwh->date_end)->addDay(1)->diffInDays(Carbon::parse($revenuePartsKwh->date_begin));

        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionKwh->participation->address_id)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $partDateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $partDateBegin);
                    })
                    ->orWhereNull('end_date');
            })->first();
        // indien geen geldige addressEnergySupplier gevonden, dan aanmaken met onbekende energieleverancier
        if(!$addressEnergySupplier) {
            $energySupplierUnknown = EnergySupplier::where('name', 'Onbekend')->first();
            $energySupplierTypeElectriciteit = EnergySupplierType::where('name', 'Elektriciteit')->first();
            $firstNextAddressEnergySupplier = $this->getFirstNextAddressEnergySupplier($distributionKwh->participation->address_id, $partDateBegin);
            $addressEnergySupplierData = [
                'address_id' => $distributionKwh->participation->address_id,
                'energy_supplier_id' => $energySupplierUnknown->id,
                'es_number' => '',
                'energy_supply_type_id' => $energySupplierTypeElectriciteit ? $energySupplierTypeElectriciteit->id : 2,
                'member_since' => $partDateBegin,
                'end_date' => $firstNextAddressEnergySupplier ? Carbon::parse($firstNextAddressEnergySupplier->member_since)->subDay()->format('Y-m-d') : null,
            ];
            $addressEnergySupplier = new AddressEnergySupplier();
            $addressEnergySupplier->fill($addressEnergySupplierData);
            $addressEnergySupplierController = new AddressEnergySupplierController();
            // voor zekerheid nog even controleren met validateAddressEnergySupplier
            $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);

            if($response){
                Log::error('Koppeling adres met energieleverancier ' . $energySupplierUnknown->name . ' NIET gemaakt.');
                Log::info($response);
                return;
            } else {
                $addressEnergySupplier->save();
            }
        }
        $isEnergySupplierSwitch = false;
        $isEndParticipation = false;
        $isEndTotalPeriod = false;
        $isEndYearPeriod = false;
        $isVisible = false;
        if ($addressEnergySupplier->end_date == $revenuePartsKwh->date_end) {
            $isEnergySupplierSwitch = true;
        }
        if ($distributionKwh->participation->date_terminated == $revenuePartsKwh->date_end) {
            $isEndParticipation = true;
        }
        if ($revenuePartsKwh->date_end && $revenuePartsKwh->date_end == $revenuePartsKwh->revenuesKwh->date_end) {
            $isEndTotalPeriod = true;
        }
        if ($revenuePartsKwh->date_end && Carbon::parse($revenuePartsKwh->date_end)->day == 31 && Carbon::parse($revenuePartsKwh->date_end)->month == 12) {
            $isEndYearPeriod = true;
        }

        if ($isEnergySupplierSwitch || $isEndParticipation || $isEndTotalPeriod || $isEndYearPeriod) {
            $isVisible = true;
        }

        $distributionPartsKwh = RevenueDistributionPartsKwh::create(
            [
                'parts_id' => $revenuePartsKwh->id,
                'distribution_id' => $distributionKwh->id,
                'revenue_id' => $revenuePartsKwh->revenue_id,
                'status' => (($revenuePartsKwh->status == 'concept-to-update') ? 'concept' : $revenuePartsKwh->status),
                'participations_quantity_at_start' => 0,
                'participations_quantity' => 0,
                'delivered_kwh' => 0,
                'es_id' => ($addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null),
                'energy_supplier_name' => ($addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null),
                'energy_supplier_number' => ($addressEnergySupplier ? $addressEnergySupplier->es_number: null),
                'is_energy_supplier_switch' => $isEnergySupplierSwitch,
                'is_end_participation' => $isEndParticipation,
                'is_end_total_period' => $isEndTotalPeriod,
                'is_end_year_period' => $isEndYearPeriod,
                'is_visible' => $isVisible,
            ]);
        $distributionValuesKwh = RevenueDistributionValuesKwh::create(
            [
                'date_begin' => $partDateBegin,
                'date_end' => $partDateEnd,
                'distribution_id' => $distributionPartsKwh->distribution_id,
                'revenue_id' => $distributionPartsKwh->revenue_id,
                'parts_id' => $distributionPartsKwh->parts_id,
                'status' => $distributionPartsKwh->status,
                'days_of_period' => $daysOfPeriod,
                'participations_quantity' => 0,
                'quantity_multiply_by_days' => 0,
                'delivered_kwh' => 0
            ]);
        $partsToUpdate = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_begin', '>=', $partDateBegin)->get();
        foreach($partsToUpdate as $partToUpdate) {
            if($partToUpdate->status == 'concept'){
                $partToUpdate->status = 'concept-to-update';
                $partToUpdate->save();
            }
        }
    }

    protected function saveDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        // Bepalen energiesupplier
        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionKwh->participation->address_id)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $partDateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $partDateBegin);
                    })
                    ->orWhereNull('end_date');
            })->first();
        // If RevenueDistributionPartsKwh already is added to project revenue distribution then update
        if(RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->exists()) {
            $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->first();
        } else {
            $distributionPartsKwh = new RevenueDistributionPartsKwh();
            $distributionPartsKwh->revenue_id = $revenuePartsKwh->revenue_id;
            $distributionPartsKwh->parts_id = $revenuePartsKwh->id;
            $distributionPartsKwh->distribution_id = $distributionKwh->id;
            $distributionPartsKwh->status = 'concept';
            $distributionPartsKwh->save();
        }

        // Voor de zekerheid, we willen geen distributionPartsKwh records meer wijzigen qua aantallen die reeds status confirmed of processed hebben.
        if(!in_array($distributionPartsKwh->status, ['confirmed', 'processed'])){
            $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
            list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, $distributionPartsKwh);
            $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
            $distributionPartsKwh->participations_quantity = $quantityOfParticipations;
            $distributionPartsKwh->delivered_kwh = 0;

            $distributionPartsKwh->distributionKwh->newOrConceptDistributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->delete();
            $this->saveDistributionValuesKwh($partDateBegin, $partDateEnd, $distributionPartsKwh);
            $distributionPartsKwh->save();
        }

        // Address energy supplier niet meer wijzigen bij distributionPartsKwh als status processed is
        if(!in_array($distributionPartsKwh->status, ['processed'])){
            // Indien geen $addressEnergySupplier gevonden, dan adhoc hier aanmaken met energySupllier Onbekend.
            if(!$addressEnergySupplier){
                $energySupplierUnknown = EnergySupplier::where('name', 'Onbekend')->first();
                $energySupplierTypeElectriciteit = EnergySupplierType::where('name', 'Elektriciteit')->first();
                $firstNextAddressEnergySupplier = $this->getFirstNextAddressEnergySupplier($distributionPartsKwh->distributionKwh->participation->address_id, $distributionPartsKwh->partsKwh->date_begin);

                // todo WM: hier direct onbekende energysupplier toevoegen aan addressEnergySupplier
                $addressEnergySupplierData = [
                    'address_id' => $distributionPartsKwh->distributionKwh->participation->address_id,
                    'energy_supplier_id' => $energySupplierUnknown->id,
                    'es_number' => '',
                    'energy_supply_type_id' => $energySupplierTypeElectriciteit ? $energySupplierTypeElectriciteit->id : 2,
                    'member_since' => $distributionPartsKwh->partsKwh->date_begin,
                    'end_date' => $firstNextAddressEnergySupplier ? Carbon::parse($firstNextAddressEnergySupplier->member_since)->subDay()->format('Y-m-d') : null,
                ];
                $addressEnergySupplier = new AddressEnergySupplier();
                $addressEnergySupplier->fill($addressEnergySupplierData);
                $addressEnergySupplierController = new AddressEnergySupplierController();
                // voor zekerheid nog even controleren met validateAddressEnergySupplier
                $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);
                $addressEnergySupplier->save();
            }
            $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
            $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
            $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

            // hier nieuwe checks op is_energy_supplier_switch, is_end_participa
            $this->setIndicatorFields($distributionPartsKwh->distributionKwh->participation, $distributionPartsKwh, $revenuePartsKwh);
        }
    }

    /**
     * @param RevenueDistributionKwh $distributionKwh
     * @return int[]
     */
    protected function determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh): array
    {
        // startwaardes uit distributionKwh halen (die zijn al bepaald en dan hoeven we niet weer helemaal bij date_register datum van participation te beginnen.)
        $quantityOfParticipationsAtStart = $distributionPartsKwh->distributionKwh->participations_quantity_at_start;
        $quantityOfParticipations = $distributionPartsKwh->distributionKwh->participations_quantity_at_start;

        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$dateBeginRevenues, $partDateEnd]);

        foreach ($mutations as $mutation) {
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry < $partDateBegin) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry <= $partDateEnd) {
                $quantityOfParticipations += $mutation->quantity;
            }
        }

        return array($quantityOfParticipationsAtStart, $quantityOfParticipations);
    }

    protected function saveDistributionValuesKwh($partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh): void
    {
        // startwaardes uit distributionKwh halen (die zijn al bepaald en dan hoeven we niet weer helemaal bij date_register datum van participation te beginnen.)
        $participationsQuantity = $distributionPartsKwh->participations_quantity_at_start;

        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$partDateBegin, $partDateEnd]);
        $dateBegin = Carbon::parse($partDateBegin);  // dateBegin = 01-06-2024
        $dateEnd = Carbon::parse($partDateEnd);      // dateEnd   = 10-06-2024
        foreach ($mutations as $mutation) {
            $dateEndMutation = Carbon::parse($mutation->date_entry)->subDay(); // dateEnd   = 05-06-2024

            $dateEndForPeriod = clone $dateEndMutation;
            $dateEndForPeriod->endOfDay();
            $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);
            if($dateBegin->format('Y-m-d') <= $dateEndMutation->format('Y-m-d')) {
                RevenueDistributionValuesKwh::create(
                    [
                        'date_begin' => $dateBegin->format('Y-m-d'),
                        'date_end' => $dateEndMutation->format('Y-m-d'),
                        'distribution_id' => $distributionPartsKwh->distribution_id,
                        'revenue_id' => $distributionPartsKwh->revenue_id,
                        'parts_id' => $distributionPartsKwh->parts_id,
                        'status' => 'concept',
                        'days_of_period' => $daysOfPeriod,
                        'participations_quantity' => $participationsQuantity,
                        'quantity_multiply_by_days' => $participationsQuantity * $daysOfPeriod,
                        'delivered_kwh' => 0
                    ]);
            }

            $participationsQuantity += $mutation->quantity;
            $dateBegin = Carbon::parse($mutation->date_entry); // dateBegin = 06-06-2024
        }

        $dateEndForPeriod = clone $dateEnd;
        $dateEndForPeriod->endOfDay();
        $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);

        RevenueDistributionValuesKwh::create(
            [
                'date_begin' => $dateBegin->format('Y-m-d'),
                'date_end' => $dateEnd->format('Y-m-d'),
                'distribution_id' => $distributionPartsKwh->distribution_id,
                'revenue_id' => $distributionPartsKwh->revenue_id,
                'parts_id' => $distributionPartsKwh->parts_id,
                'status' => 'concept',
                'days_of_period' => $daysOfPeriod,
                'participations_quantity' => $participationsQuantity,
                'quantity_multiply_by_days' => $participationsQuantity * $daysOfPeriod,
                'delivered_kwh' => 0
            ]);
    }

    public function checkAndSplitRevenuePartsKwh(ParticipantProject $participant, $splitDate, AddressEnergySupplier $addressEnergySupplier = null)
    {
        $projectName = $participant ? $participant->project->name : '?';
        $projectId = $participant ? $participant->project->id : 'onbekend';
// todo WM: clenanup
//        $projectDateNextRevenuesKwh = $participant ? $participant->project->date_interest_bearing_kwh : Carbon::parse($splitDate)->startOfYear()->format('Y-m-d');
        $splitDateString = Carbon::parse($splitDate)->format('Y-m-d');
// todo WM: clenanup
//        $endDateBeforeSplitDate = Carbon::parse($splitDate)->subDay()->format('Y-m-d');
        $splitDateReadable = Carbon::parse($splitDate)->format('d-m-Y');

        $dateTerminated = $participant->date_terminated ? Carbon::parse($participant->date_terminated)->format('Y-m-d') : null;

        // Zoek revenue part waar splitdatum in valt.
        $revenuePartsKwh = RevenuePartsKwh::where('date_begin', '<=', $splitDateString)
            ->where('date_end', '>=', $splitDateString)
            ->whereHas('revenuesKwh', function ($query) use($participant) {
                $query->where('project_id', $participant->project_id);
            })->first();

        // indien part niet gevonden, dan hoeven we niet te spitsen.
        if(!$revenuePartsKwh){
            return false;
        }
        // indien part wel gevonden.
        if($revenuePartsKwh){
            // indien ES switch en splitdatum na beeindigsdatum participant, dan hoeven we niet te splitsen.
            if($addressEnergySupplier != null && $dateTerminated != null && $splitDateString > $dateTerminated) {
                return false;
            }

            // indien begindatum is splitdatum, dan hoeven we niet opnieuw te splitsen.
            if($splitDateString == Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d')) {

                $previousRevenuePartsKwh = $revenuePartsKwh->previous_revenue_parts_kwh;

                // indien gevonden part helemaal verwerkt, dan geen splitsing meer.
                if(!$previousRevenuePartsKwh || $previousRevenuePartsKwh->status == 'processed'){
                    return false;
                }
                $message = 'Periode ' . Carbon::parse($previousRevenuePartsKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($previousRevenuePartsKwh->date_end)->format('d-m-Y');

                // Wel evt. bijwerken indicator fields
                $distributionPreviousPartKwhThisParticipant = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                    ->where('parts_id', $previousRevenuePartsKwh->id)
                    ->whereHas('distributionKwh', function ($query) use($participant) {
                        $query->where('participation_id', $participant->id)
                            ->where('status', '!=', 'processed');
                    })->first();

                if ($distributionPreviousPartKwhThisParticipant) {
                    // hier nieuwe checks op is_energy_supplier_switch, is_end_participa
                    $this->setIndicatorFields($participant, $distributionPreviousPartKwhThisParticipant, $revenuePartsKwh->previous_revenue_parts_kwh);
                }

                return [
                    'success' => true,
                    'newRevenue' => false,
                    'revenuesId' => $previousRevenuePartsKwh->revenue_id,
                    'revenuePartsId' => $previousRevenuePartsKwh->id,
                    'projectId' => $projectId,
                    'projectMessage' => 'Project: ' . $projectName . ' melding: ' . $message
                ];
            }
            // indien gevonden part helemaal verwerkt, dan geen splitsing meer.
            if($revenuePartsKwh->status == 'processed'){
                $message = 'Datum ' . $splitDateReadable . ' valt in een reeds verwerkte opbrengstverdeling.';
                return [
                    'success' => false,
                    'errorMessage' => $message,
                    'projectMessage' => 'Project: ' . $projectName . ' melding: ' . $message
                ];
            }
            // anders gevonden part splitsen
            $splitedRevenueParts = $this->splitRevenuePartsKwh($revenuePartsKwh, $participant, $splitDate, $addressEnergySupplier);
            if($splitedRevenueParts){
                $message = 'Periode ' . Carbon::parse($splitedRevenueParts->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($splitedRevenueParts->date_end)->format('d-m-Y');
                return [
                    'success' => true,
                    'newRevenue' => false,
                    'revenuesId' => $splitedRevenueParts->revenue_id,
                    'revenuePartsId' => $splitedRevenueParts->id,
                    'projectId' => $projectId,
                    'projectMessage' => 'Project: ' . $projectName . ' melding: ' . $message
                ];
            } else {
                $message = 'Onbekende fout bij splitsen bestaande opbrengstverdeling.';
                return [
                    'success' => false,
                    'errorMessage' => $message,
                    'projectMessage' => 'Project: ' . $projectName . ' melding: ' . $message
                ];
            }

        }

        return ['success' => false, 'errorMessage' => 'Onbekende fout'];

    }
    public function updateIndicatorFieldEndParticipation(ParticipantProject $participant, $originalSplitDate)
    {
        $splitDateString = Carbon::parse($originalSplitDate)->format('Y-m-d');

        $distributionsKwhThisParticipantIds = RevenueDistributionKwh::where('participation_id', $participant->id)
            ->whereIn('status', ['concept', 'confirmed'])
            ->pluck('id')->toArray();

        // Wel evt. bijwerken indicator fields
        $distributionPartsKwhThisParticipant = RevenueDistributionPartsKwh::whereIn('distribution_id', $distributionsKwhThisParticipantIds)
            ->where('is_end_participation', true)
            ->whereIn('status', ['concept', 'confirmed'])
            ->whereHas('partsKwh', function ($query) use($splitDateString) {
                $query->where('date_end', '=', $splitDateString);
            })
            ->get();

        foreach ($distributionPartsKwhThisParticipant as $distributionPartsKwh){
            $distributionPartsKwh->is_end_participation = false;
            $distributionPartsKwh->is_visible = $this->determineIsVisible($distributionPartsKwh);
            $distributionPartsKwh->save();
        }

    }

    protected function splitRevenuePartsKwh(RevenuePartsKwh $revenuePartsKwhToSplit, ParticipantProject $participant, $splitDate, AddressEnergySupplier $addressEnergySupplier = null)
    {
        $splitDateString = Carbon::parse($splitDate)->format('Y-m-d');

        // Zoek revenue part waar splitdatum in valt. Indien splitdatum is bestaande begindatum van een part,
        // dan hoeft er niet gesplitst te worden. We splitsen ook niet meer als distribution van deelname
        // al verwerkt is.
        // Perioden: A: 01-01-2020 t/m 31-12-2020
        //           B: 01-01-2021 t/m 31-12-2021
        // Split datum: 01-07-2020 => splitsing A: 01-01-2020 t/m 30-06-2020 en 01-07-2020 t/m 31-12-2020
        // Split datum: 31-12-2020 => splitsing A: 01-01-2020 t/m 30-12-2020 en 31-12-2020 t/m 31-12-2020
        // Split datum: 01-01-2021 => geen splitsing nodig
        // Split datum: 02-01-2021 => splitsing B: 01-01-2021 t/m 01-01-2021 en 02-01-2021 t/m 31-12-2021
        // Split datum: 01-07-2021 => splitsing B: 01-01-2021 t/m 30-06-2021 en 01-07-2021 t/m 31-12-2021
        //
        //                                         01-07-2020  31-12-2020  01-01-2021  02-01-2021  01-07-2021
        // Perioden: A: 01-01-2020 t/m 31-12-2020  true/true*  true/true*  true/false  true/false  true/false
        //           B: 01-01-2021 t/m 31-12-2021  false/false false/true  false/true  true/true*  true/true*
        $revenuePartsKwh = RevenuePartsKwh::where('date_begin', '<', $splitDateString)
            ->where('date_end', '>=', $splitDateString)
            ->whereHas('revenuesKwh', function ($query) use($participant) {
                $query->whereHas('distributionKwh', function ($query) use($participant) {
                    $query->where('participation_id', $participant->id)
                        ->where('status', '!=', 'processed');
                });
            })->first();

        // indien niet gevonden, klaar.
        if(!$revenuePartsKwh){
            return false;
        }

        // indien gevonden part helemaal verwerkt, dan geen splitsing meer.
        if($revenuePartsKwh->status == 'processed'){
            return false;
        }

        //  1 oude einddatum originele revenuePartsKwh bewaren
        //    nieuwe einddatum originele revenuePartsKwh:: Splitsdatum - 1 dag.
        //    indien status concept, dan originele revenuePartsKwh op new zetten (ze moeten eindstanden nog toevoegen)
        $oldEndDateOriginalPartsKwh = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $newRevenuePartsKwh = $revenuePartsKwh->replicate();
        $newEndDateOriginalPartsKwh = Carbon::parse($splitDate)->subDay()->format('Y-m-d');
        $revenuePartsKwh->date_end = $newEndDateOriginalPartsKwh;

        if($revenuePartsKwh->status == 'new' || $revenuePartsKwh->status == 'concept'){
            $revenuePartsKwh->delivered_total_concept = 0;
            $revenuePartsKwh->delivered_total_confirmed = 0;
            $revenuePartsKwh->delivered_total_processed = 0;
        }
        $revenuePartsKwh->save();

        //  2 Values op splitDate van simulated afhalen (indien nog niet definitief).
//        $revenueValuesKwhOnSplitDate = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
//            ->where('date_registration', $splitDateString)
//            ->first();
//        if ($revenueValuesKwhOnSplitDate) {
//            if($revenueValuesKwhOnSplitDate->status == 'concept'){
//                $revenueValuesKwhOnSplitDate->is_simulated = false;
//                $revenueValuesKwhOnSplitDate->save();
//            }
//        }

        //  3 Nieuw revenuePartsKwh:
        //    begindatum = splitsdatum, einddatum = oude einddatum originele revenuePartsKwh, delivered totalen op 0 (alleen bij concept).
        //    overige gegevens overnemen originele revenuePartsKwh.
        $newRevenuePartsKwh->date_begin = $splitDateString;
        $newRevenuePartsKwh->date_end = $oldEndDateOriginalPartsKwh;

        if($newRevenuePartsKwh->status == 'new' || $newRevenuePartsKwh->status == 'concept'){
            $newRevenuePartsKwh->delivered_total_concept = 0;
            $newRevenuePartsKwh->delivered_total_confirmed = 0;
            $newRevenuePartsKwh->delivered_total_processed = 0;
        }
        $newRevenuePartsKwh->save();

        //  Stappen 4, 4b en 5 hoeven niet als revenuePartsKwh status new heeft.
        if($revenuePartsKwh->status != 'new') {

            //  4 Doorlezen distributionPartsKwh van originele distributionPartsKwh en nieuwe aanmaken met:
            //    parts_id = (id_new).
            //    delivered_kwh op 0.
            //    address energy supplier data uit binnenkomende parm mits meegegeven en alleen voor participant waar we mee bezig zijn !!!
            //    overige gegevens overnemen originele distributionPartsKwh.
            //
            $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
            foreach ($revenuePartsKwh->distributionPartsKwh as $distributionPartsKwh) {
                $newDistributionPartsKwh = $distributionPartsKwh->replicate();
                $newDistributionPartsKwh->parts_id = $newRevenuePartsKwh->id;
                $newDistributionPartsKwh->delivered_kwh = 0;
                if ($addressEnergySupplier && $distributionPartsKwh->distributionKwh->participation_id ==$participant->id) {
                    $newDistributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
                    $newDistributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
                    $newDistributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number : null;
                }
                $newDistributionPartsKwh->save();
                list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, Carbon::parse($newRevenuePartsKwh->date_begin)->format('Y-m-d'), Carbon::parse($newRevenuePartsKwh->date_end)->format('Y-m-d'), $newDistributionPartsKwh);
                $newDistributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                $newDistributionPartsKwh->participations_quantity = $quantityOfParticipations;
                $newDistributionPartsKwh->save();

                //  4b Bij originele distributionPartsKwh records participations_quantity opnieuw bepalen voor split datum.
                $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
                list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d'), Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d'), $distributionPartsKwh);
                $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                $distributionPartsKwh->participations_quantity = $quantityOfParticipations;
                $distributionPartsKwh->save();

                //  5a Concept -> delete distributions bij orignele part en maak ze opnieuw bij originele en nieuwe.
                //
                if($revenuePartsKwh->status == 'concept') {
                    $distributionPartsKwh->distributionKwh->newOrConceptDistributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->delete();
                    $this->saveDistributionValuesKwh($revenuePartsKwh->date_begin, $revenuePartsKwh->date_end, $distributionPartsKwh);
                }else{
                    //  5b Doorlezen distributionValuesKwh voor van originele revenuePartsKwh voor datums nieuwe aanpassen:
                    //    parts_id = (id_new).
                    //    overige gegevens overnemen originele distributionValuesKwh.
                    //
                    foreach ($revenuePartsKwh->distributionValuesKwh->sortBy('date_begin') as $distributionValuesKwh) {
                        // Splitdatum na einddatum, dan geen splitsing en behouden bij originele.
                        if($splitDateString > Carbon::parse($distributionValuesKwh->date_end)->format('Y-m-d') ){
                        }
                        // Splitdatum gelijk aan of na begindatum maar voor einddatum, dan splitsen.
                        if($splitDateString >= Carbon::parse($distributionValuesKwh->date_begin)->format('Y-m-d') && $splitDateString < Carbon::parse($distributionValuesKwh->date_end)){
                            $newDistributionValuesKwh = $distributionValuesKwh->replicate();
                            $newDistributionValuesKwh->date_begin = $splitDateString;
                            $newDistributionValuesKwh->date_end = $oldEndDateOriginalPartsKwh;
                            $newDistributionValuesKwh->parts_id = $newRevenuePartsKwh->id;
                            $dateEndForPeriodNew = clone Carbon::parse($oldEndDateOriginalPartsKwh);
                            $dateEndForPeriodNew->endOfDay();
                            $newDistributionValuesKwh->days_of_period = $dateEndForPeriodNew->addDay()->diffInDays(Carbon::parse($splitDateString));
                            $newDistributionValuesKwh->quantity_multiply_by_days = $newDistributionValuesKwh->participations_quantity * $newDistributionValuesKwh->days_of_period;
                            $newDistributionValuesKwh->delivered_kwh = round($newDistributionValuesKwh->delivered_kwh / $distributionValuesKwh->days_of_period * $newDistributionValuesKwh->days_of_period, 6);
                            $newDistributionValuesKwh->save();

                            //  Bij originele distributionValuesKwh
                            $dateEndForPeriodOriginal = clone Carbon::parse($newEndDateOriginalPartsKwh);
                            $dateEndForPeriodOriginal->endOfDay();
                            $distributionValuesKwh->date_end = $newEndDateOriginalPartsKwh;
                            $distributionValuesKwh->days_of_period = $dateEndForPeriodOriginal->addDay()->diffInDays(Carbon::parse($revenuePartsKwh->date_begin));
                            $distributionValuesKwh->quantity_multiply_by_days =$distributionValuesKwh->participations_quantity * $distributionValuesKwh->days_of_period;
                            $distributionValuesKwh->delivered_kwh = $distributionValuesKwh->delivered_kwh - $newDistributionValuesKwh->delivered_kwh;
                            $distributionValuesKwh->save();

                        }
                        // Splitdatum voor begin, dan overzetten naar nieuwe part.
                        if($splitDateString < Carbon::parse($distributionValuesKwh->date_begin)->format('Y-m-d')){
                            // overzetten naar nieuwe part.
                            $distributionValuesKwh->parts_id = $newRevenuePartsKwh->id;
                            $distributionValuesKwh->save();
                        }
                    }

                }
                $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
                $distributionPartsKwh->delivered_kwh = $totalDeliveredKwh;
                // hier nieuwe checks op is_energy_supplier_switch, is_end_participation, is_end_total_period, is_end_year_period en is_visible
                $this->setIndicatorFields($distributionPartsKwh->distributionKwh->participation, $distributionPartsKwh, $distributionPartsKwh->partsKwh);

                $newTotalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $newRevenuePartsKwh->revenue_id)->where('distribution_id', $newDistributionPartsKwh->distribution_id)->where('parts_id', $newRevenuePartsKwh->id)->sum('delivered_kwh');
                $newDistributionPartsKwh->delivered_kwh = $newTotalDeliveredKwh;
                $newDistributionPartsKwh->is_visible = $this->determineIsVisible($newDistributionPartsKwh);
                $newDistributionPartsKwh->save();
            }
            $revenuePartsKwhForRecalculate = RevenuePartsKwh::find($revenuePartsKwh->id);
            if($revenuePartsKwhForRecalculate->status == 'concept'){
                UpdateRevenuePartsKwh::dispatch($revenuePartsKwhForRecalculate, Auth::id());
            } else {
                $revenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();
            }
            $newRevenuePartsKwhForRecalculate = RevenuePartsKwh::find($newRevenuePartsKwh->id);
            if($newRevenuePartsKwhForRecalculate->status == 'concept'){
                UpdateRevenuePartsKwh::dispatch($newRevenuePartsKwhForRecalculate, Auth::id());
            } else {
                $newRevenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();
            }
        }
        return $revenuePartsKwh;
    }

    /**
     * @param RevenuesKwh $revenuesKwh
     * @return array
     */
    protected function createNewParts(RevenuesKwh $revenuesKwh, $fromDate, $toDate): array
    {
        $splitDates = [];
        $splitDates[] = $fromDate;

        $dateStartNextCalendarYear = Carbon::parse($revenuesKwh->date_end)->startOfYear()->format('Y-m-d');
        if ($fromDate < $dateStartNextCalendarYear) {
            $splitDates[] = $dateStartNextCalendarYear;
        }

        $participations = $revenuesKwh->project->participantsProject;
        foreach ($participations as $participation) {
            if ($participation->date_terminated) {
                $participationDateTerminated = Carbon::parse($participation->date_terminated)->format('Y-m-d');
                $participationDateTerminatedNextDay = Carbon::parse($participationDateTerminated)->addDay()->format('Y-m-d');
                if ($participationDateTerminatedNextDay >= $fromDate && $participationDateTerminatedNextDay <= $toDate) {
                    $splitDates[] = $participationDateTerminatedNextDay;
                }
            }
            $addressEnergySuppliers = AddressEnergySupplier::where('address_id', '=', $participation->address_id)
                ->whereIn('energy_supply_type_id', [2, 3])
                ->where(function ($addressEnergySupplier) use ($fromDate) {
                    $addressEnergySupplier
                        ->where(function ($addressEnergySupplier) use ($fromDate) {
                            $addressEnergySupplier->whereNotNull('member_since')
                                ->where('member_since', '>=', $fromDate);
                        })
                        ->orWhereNull('member_since');
                })
                ->where(function ($addressEnergySupplier) use ($toDate) {
                    $addressEnergySupplier
                        ->where(function ($addressEnergySupplier) use ($toDate) {
                            $addressEnergySupplier->whereNotNull('member_since')
                                ->where('member_since', '<=', $toDate);
                        })
                        ->orWhereNull('member_since');
                })->get();

            // Alleen splitDates voor member_since dates die voor date terminated liggen (of gelijk)
            foreach ($addressEnergySuppliers as $addressEnergySupplier) {
                if($participation->date_terminated == null || Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') <= $participationDateTerminated){
                    $splitDates[] = $addressEnergySupplier->member_since;
                }
            }
        }

        $uniqueSplitDates = array_unique($splitDates);
        rsort($uniqueSplitDates);

        $periodParts = [];
        $saveDate = null;
        foreach ($uniqueSplitDates as $splitDate) {
            if ($saveDate == null) {
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $toDate];
            } else {
                $endDate = Carbon::parse($saveDate)->subDay()->format('Y-m-d');;
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $endDate];
            }
            $saveDate = $splitDate;
        }

        sort($periodParts);
        foreach ($periodParts as $periodPart) {
            RevenuePartsKwh::create([
                'revenue_id' => $revenuesKwh->id,
                'date_begin' => $periodPart['startDate'],
                'date_end' => $periodPart['endDate'],
                'confirmed' => false,
                'status' => 'new',
                'dateConfirmed' => null,
                'datePayout' => null,
                'payout_kwh' => $revenuesKwh->payout_kwh,
                'delivered_total_concept' => 0,
                'delivered_total_confirmed' => 0,
                'delivered_total_processed' => 0,
                'created_at' => $revenuesKwh->created_at,
                'updated_at' => $revenuesKwh->updated_at,
            ]);
        }
        return array($uniqueSplitDates, $periodParts);
    }

    /**
     * @param RevenueDistributionPartsKwh $distributionPartsKwh
     */
    protected function determineIsVisible(RevenueDistributionPartsKwh $distributionPartsKwh): bool
    {
        if ($distributionPartsKwh->is_energy_supplier_switch
            || $distributionPartsKwh->is_end_participation
            || $distributionPartsKwh->is_end_total_period
            || $distributionPartsKwh->is_end_year_period) {
            return true;
        } else {
            return false;
        }
    }

    protected function getFirstNextAddressEnergySupplier($addressId, $dateBegin)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', $addressId)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '>', $dateBegin);
                    });
            })->orderBy('member_since', 'asc')->first();
        return $addressEnergySupplier;
    }

    /**
     * @param ParticipantProject $participant
     * @param $distributionPartsKwh
     * @param $checkRevenuePartsKwh
     * @return void
     */
    private function setIndicatorFields(ParticipantProject $participant, $distributionPartsKwh, $checkRevenuePartsKwh): void
    {
        // hier nieuwe checks op is_energy_supplier_switch, is_end_participation, is_end_total_period, is_end_year_period en is_visible
        if (AddressEnergySupplier::where('address_id', $participant->address_id)->where('energy_supplier_id', $distributionPartsKwh->es_id)->where('end_date', $checkRevenuePartsKwh->date_end)->exists()) {
            $distributionPartsKwh->is_energy_supplier_switch = true;
        } else {
            $distributionPartsKwh->is_energy_supplier_switch = false;
        }
        if ($participant->date_terminated == $checkRevenuePartsKwh->date_end) {
            $distributionPartsKwh->is_end_participation = true;
        } else {
            $distributionPartsKwh->is_end_participation = false;
        }
        if ($checkRevenuePartsKwh->date_end && $checkRevenuePartsKwh->date_end == $checkRevenuePartsKwh->revenuesKwh->date_end) {
            $distributionPartsKwh->is_end_total_period = true;
        } else {
            $distributionPartsKwh->is_end_total_period = false;
        }
        if ($checkRevenuePartsKwh->date_end && Carbon::parse($checkRevenuePartsKwh->date_end)->day == 31 && Carbon::parse($checkRevenuePartsKwh->date_end)->month == 12) {
            $distributionPartsKwh->is_end_year_period = true;
        } else {
            $distributionPartsKwh->is_end_year_period = false;
        }
        $distributionPartsKwh->is_visible = $this->determineIsVisible($distributionPartsKwh);
        $distributionPartsKwh->save();
    }

}
