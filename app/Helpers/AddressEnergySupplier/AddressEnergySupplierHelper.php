<?php

namespace App\Helpers\AddressEnergySupplier;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Carbon\Carbon;

class AddressEnergySupplierHelper
{
    public static function getUpdateEndDateBlockingMessages(AddressEnergySupplier $addressEnergySupplier): array
    {
        $messages = [];

        if (self::wouldCauseMissingEnergySupplierAfterEndDateUpdate($addressEnergySupplier)) {
            $messages[] = 'Deze einddatum kan niet gewijzigd worden omdat daardoor voor een nog niet verwerkte opbrengstverdeling geen geldige energieleverancier-periode meer bestaat.';
        }

        return $messages;
    }

    protected static function wouldCauseMissingEnergySupplierAfterEndDateUpdate(AddressEnergySupplier $addressEnergySupplier): bool
    {
        if (!in_array((int) $addressEnergySupplier->energy_supply_type_id, [2, 3], true)) {
            return false;
        }

        if (!$addressEnergySupplier->address_id) {
            return false;
        }

        if (!$addressEnergySupplier->end_date) {
            return false;
        }

        $distributionParts = RevenueDistributionPartsKwh::query()
            ->with([
                'partsKwh:id,date_begin,date_end',
                'distributionKwh:id,participation_id',
                'distributionKwh.participation:id,address_id',
            ])
            ->where('status', '!=', 'processed')
            ->whereHas('distributionKwh.participation', function ($query) use ($addressEnergySupplier) {
                $query->where('address_id', $addressEnergySupplier->address_id);
            })
            ->whereHas('partsKwh', function ($query) use ($addressEnergySupplier) {
                $query->where(function ($query) use ($addressEnergySupplier) {
                    $query->whereNotNull('date_begin')
                        ->whereDate('date_begin', '>=', $addressEnergySupplier->end_date);
                })->orWhere(function ($query) use ($addressEnergySupplier) {
                    $query->whereNotNull('date_end')
                        ->whereDate('date_end', '>', $addressEnergySupplier->end_date);
                });
            })
            ->get();

        foreach ($distributionParts as $distributionPart) {
            $partBegin = $distributionPart->partsKwh?->date_begin;
            $partEnd = $distributionPart->partsKwh?->date_end;

            if (!$partBegin) {
                continue;
            }

            $firstUncoveredDate = Carbon::parse($addressEnergySupplier->end_date)->addDay()->format('Y-m-d');
            $checkDate = Carbon::parse($partBegin)->gt(Carbon::parse($firstUncoveredDate))
                ? Carbon::parse($partBegin)->format('Y-m-d')
                : $firstUncoveredDate;

            if (!self::existsAlternativeElectricityAddressEnergySupplierInPeriod(
                addressId: $addressEnergySupplier->address_id,
                dateBegin: $checkDate,
                dateEnd: $partEnd,
                excludeId: $addressEnergySupplier->id
            )) {
                return true;
            }
        }

        return false;
    }

    public static function getDeleteBlockingMessages(AddressEnergySupplier $addressEnergySupplier): array
    {
        $messages = [];

        if (self::wouldCauseMissingEnergySupplierInRevenueDistribution($addressEnergySupplier)) {
            $messages[] = 'Deze energieleverancier kan niet verwijderd worden omdat deze nog nodig is voor een nog niet verwerkte opbrengstverdeling.';
        }

        return $messages;
    }

    protected static function wouldCauseMissingEnergySupplierInRevenueDistribution(AddressEnergySupplier $addressEnergySupplier): bool
    {
        // Alleen relevant voor elektriciteit (2 of 3), conform bestaande check.
        if (!in_array((int) $addressEnergySupplier->energy_supply_type_id, [2, 3], true)) {
            return false;
        }

        if (!$addressEnergySupplier->address_id) {
            return false;
        }

        $distributionParts = RevenueDistributionPartsKwh::query()
            ->with([
                'partsKwh:id,date_begin,date_end',
                'distributionKwh:id,participation_id',
                'distributionKwh.participation:id,address_id',
            ])
            ->where('status', '!=', 'processed')
            ->whereHas('distributionKwh.participation', function ($query) use ($addressEnergySupplier) {
                $query->where('address_id', $addressEnergySupplier->address_id);
            })
            ->whereHas('partsKwh', function ($query) use ($addressEnergySupplier) {
                if ($addressEnergySupplier->member_since) {
                    $query->where(function ($query) use ($addressEnergySupplier) {
                        $query->whereNull('date_end')
                            ->orWhere('date_end', '>=', $addressEnergySupplier->member_since);
                    });
                }

                if ($addressEnergySupplier->end_date) {
                    $query->where(function ($query) use ($addressEnergySupplier) {
                        $query->whereNull('date_begin')
                            ->orWhere('date_begin', '<=', $addressEnergySupplier->end_date);
                    });
                }
            })
            ->get();

        foreach ($distributionParts as $distributionPart) {
            $partBegin = $distributionPart->partsKwh?->date_begin;
            $partEnd = $distributionPart->partsKwh?->date_end;

            if (!self::existsAlternativeElectricityAddressEnergySupplierInPeriod(
                addressId: $addressEnergySupplier->address_id,
                dateBegin: $partBegin,
                dateEnd: $partEnd,
                excludeId: $addressEnergySupplier->id
            )) {
                return true;
            }
        }

        return false;
    }

    protected static function existsAlternativeElectricityAddressEnergySupplierInPeriod(
        int $addressId,
        ?string $dateBegin,
        ?string $dateEnd,
        ?int $excludeId = null
    ): bool {
        $query = AddressEnergySupplier::query()
            ->where('address_id', $addressId)
            ->whereIn('energy_supply_type_id', [2, 3]);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        // Zelfde logica als bestaand checkscripts: check op begin van de part-periode
        $query->where(function ($query) use ($dateBegin) {
            $query->where(function ($query) use ($dateBegin) {
                $query->whereNotNull('member_since')
                    ->where('member_since', '<=', $dateBegin);
            })->orWhereNull('member_since');
        });

        $query->where(function ($query) use ($dateBegin) {
            $query->where(function ($query) use ($dateBegin) {
                $query->whereNotNull('end_date')
                    ->where('end_date', '>=', $dateBegin);
            })->orWhereNull('end_date');
        });

        return $query->exists();
    }

    public function checkDoubleEsNumber($addressEnergySupplierId, $addressEnergySupplierEsId, $addressEnergySupplierEsNumber)
    {
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('id', '!=', $addressEnergySupplierId)
            ->where('is_current_supplier', true)
            ->where('energy_supplier_id', $addressEnergySupplierEsId)
            ->where('es_number', $addressEnergySupplierEsNumber);
        return $otherAddressEnergySuppliers->exists();
    }

    public function addressEnergySuppliersWithDoubleEsNumber($addressEnergySupplierId, $addressEnergySupplierEsId, $addressEnergySupplierEsNumber)
    {
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('id', '!=', $addressEnergySupplierId)
            ->where('is_current_supplier', true)
            ->where('energy_supplier_id', $addressEnergySupplierEsId)
            ->where('es_number', $addressEnergySupplierEsNumber);
        if($otherAddressEnergySuppliers->exists()){
            $addressEnergySuppliersWithDoubleEsNumber = [];
            foreach ($otherAddressEnergySuppliers->get() as $otherAddressEnergySupplier){
                $addressEnergySuppliersWithDoubleEsNumber[] = [
                    'contactName' => $otherAddressEnergySupplier->address->contact->full_name,
                    'contactNumber' => $otherAddressEnergySupplier->address->contact->number,
                    'addressStreetPostalCodeCity' => $otherAddressEnergySupplier->address->street_postal_code_city,];
            };
            return $addressEnergySuppliersWithDoubleEsNumber;
        }

        return false;
    }

}