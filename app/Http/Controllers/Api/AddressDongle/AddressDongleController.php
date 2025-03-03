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
        $this->authorize('view', AddressDongle::class);

        $addressDongles = $requestQuery->get();

        $addressDongles->load(['address', 'address.contact', 'dongleType', 'dongleReadOutType']);

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
        $this->authorize('manage', AddressDongle::class);

        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('typeReadOutId')->alias('type_read_out_id')->next()
            ->string('macNumber')->whenMissing(null)->onEmpty(null)->alias('mac_number')->next()
            ->integer('typeDongleId')->whenMissing(null)->onEmpty(null)->alias('type_dongle_id')->next()
            ->integer('energyId')->whenMissing(null)->onEmpty(null)->alias('energy_id')->next()
            ->date('dateSigned')->whenMissing(null)->onEmpty(null)->alias('date_signed')->next()
            ->date('dateStart')->whenMissing(null)->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->whenMissing(null)->onEmpty(null)->alias('date_end')->next()
            ->get();

        $addressDongle = new AddressDongle();

        $addressDongle->fill($data);

        $addressDongle->save();

        return ['addressDongle' => FullAddressDongle::make($addressDongle)];
    }

    public function update(RequestInput $requestInput, AddressDongle $addressDongle)
    {
        $this->authorize('manage', AddressDongle::class);

        $data = $requestInput
            ->integer('typeReadOutId')->alias('type_read_out_id')->next()
            ->string('macNumber')->whenMissing(null)->onEmpty(null)->alias('mac_number')->next()
            ->integer('typeDongleId')->whenMissing(null)->onEmpty(null)->alias('type_dongle_id')->next()
            ->integer('energyId')->whenMissing(null)->onEmpty(null)->alias('energy_id')->next()
            ->date('dateSigned')->whenMissing(null)->onEmpty(null)->alias('date_signed')->next()
            ->date('dateStart')->whenMissing(null)->onEmpty(null)->alias('date_start')->next()
            ->date('dateEnd')->whenMissing(null)->onEmpty(null)->alias('date_end')->next()
            ->get();

        $addressDongle->fill($data);

        $addressDongle->save();

        return ['addressDongle' => FullAddressDongle::make($addressDongle)];
    }

    public function destroy(AddressDongle $addressDongle)
    {
        $this->authorize('manage', AddressDongle::class);

        $addressDongle->delete();
    }
}
