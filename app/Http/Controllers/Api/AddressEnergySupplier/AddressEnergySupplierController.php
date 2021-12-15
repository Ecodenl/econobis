<?php

namespace App\Http\Controllers\Api\AddressEnergySupplier;

use App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AddressEnergySupplier\FullAddressEnergySupplier;
use Carbon\Carbon;
//use Illuminate\Support\Facades\Log;

class AddressEnergySupplierController extends ApiController
{

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

        $this->validateAddressEnergySupplier($addressEnergySupplier, true);

        $addressEnergySupplier->save();

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

        // determine is current_supplier
        $this->determineIsCurrentSupplier($addressEnergySupplier);

        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');
        return FullAddressEnergySupplier::make($addressEnergySupplier);
    }

    public function update(RequestInput $requestInput, AddressEnergySupplier $addressEnergySupplier)
    {
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

        $this->validateAddressEnergySupplier($addressEnergySupplier, true);

        $addressEnergySupplier->save();

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

        // determine is current_supplier
        $this->determineIsCurrentSupplier($addressEnergySupplier);

        $addressEnergySupplier->load('energySupplier', 'energySupplyStatus', 'createdBy', 'address', 'energySupplyType');
        return FullAddressEnergySupplier::make($addressEnergySupplier);
    }

    public function destroy(AddressEnergySupplier $addressEnergySupplier)
    {
        $addressEnergySupplier->forceDelete();
    }

    /**
     * @param AddressEnergySupplier $addressEnergySupplier
     */
    public function validateAddressEnergySupplier(AddressEnergySupplier $addressEnergySupplier, $withAbort = true)
    {
        $otherAddressEnergySuppliers = AddressEnergySupplier::where('address_id', '=', $addressEnergySupplier->address_id)
            ->where('id', '!=', $addressEnergySupplier->id);
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
            // 2 = Electriciteit
            // 3 = Electriciteit en gas
            if ($addressEnergySupplier->energy_supply_type_id == 1) {
                // huidige type Gas, controleer op overlap met andere met typen Gas en Electriciteit en Gas
                $types = [1, 3];
            } else if($addressEnergySupplier->energy_supply_type_id == 2){
                // huidige type Electriciteit, controleer op overlap met andere met typen Electriciteit en Electriciteit en Gas
                $types = [2, 3];
            } else {
                // huidige type Electriciteit en gas, controleer op overlap met alle typen Gas, Electriciteit en Electriciteit en Gas
                $types = [1, 2, 3];
            }
            $otherAddressEnergySuppliers->whereIn('energy_supply_type_id', $types);
        }

        if ($otherAddressEnergySuppliers->exists()) {
            if($withAbort){
                abort('422', "Periode 'Klant sinds' t/m 'Eind datum' overlapt met een andere periode voor zelfde adres en leverancierstype Electriciteit en/of Gas");
            }else{
                return "Periode 'Klant sinds' t/m 'Eind datum' overlapt met een andere periode voor zelfde adres en leverancierstype Electriciteit en/of Gas";
            }
        }
        return false;
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
