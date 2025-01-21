<?php

namespace App\Http\Controllers\Api\AddressDongle;

use App\Eco\AddressDongle\AddressDongle;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\AddressDongle\Grid\RequestQuery;
use App\Http\Resources\AddressDongle\FullAddressDongle;
use App\Http\Resources\AddressDongle\GridAddressDongle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AddressDongleController extends ApiController
{
    public function grid(RequestQuery $requestQuery)
    {
        $addressDongles = $requestQuery->get();

        $addressDongles->load(['address', 'address.contact']);

        $addressDongleIdsTotal = $requestQuery->getQueryNoPagination()->get()->pluck('id');

        return GridAddressDongle::collection($addressDongles)
            ->additional(['meta' =>
                [
                    'total' => $requestQuery->total(),
                    'addressDongleIdsTotal' => $addressDongleIdsTotal,
                ]
            ]);
    }

    public function store(RequestInput $requestInput)
    {
        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('typeReadOut')->alias('type_read_out')->next()
            ->string('macNumber')->whenMissing(null)->onEmpty(null)->alias('mac_number')->next()
            ->integer('typeDongle')->alias('type_dongle')->next()
            ->integer('energyId')->alias('energy_id')->next()
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

    public function update(RequestInput $requestInput, AddressDongle $addressDongle)
    {
//        $this->authorize('update', $addressDongle);

        $data = $requestInput
            ->integer('typeReadOut')->alias('type_read_out')->next()
            ->string('macNumber')->whenMissing(null)->onEmpty(null)->alias('mac_number')->next()
            ->integer('typeDongle')->alias('type_dongle')->next()
            ->integer('energyId')->alias('energy_id')->next()
            ->date('dateSigned')->alias('date_signed')->next()
            ->date('dateStart')->alias('date_start')->next()
            ->date('dateEnd')->alias('date_end')->next()
            ->get();

        $addressDongle->fill($data);

        $addressDongle->save();

        return ['addressDongle' => FullAddressDongle::make($addressDongle)];
    }

    public function destroy(AddressDongle $addressDongle)
    {
//        $this->authorize('delete', $addressDongle);

        $addressDongle->delete();
    }
}
