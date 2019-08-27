<?php

namespace App\Http\Controllers\Api\VatCode;

use App\Eco\VatCode\VatCode;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;

class VatCodeController extends Controller
{

    public function jory()
    {
        return Jory::on(VatCode::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', VatCode::class);

        $data = $input->string('startDate')->validate('required|date')->alias('start_date')->next()
            ->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('percentage')->alias('percentage')->next()
            ->string('twinfieldCode')->whenMissing('')->onEmpty('')->alias('twinfield_code')->next()
            ->string('twinfieldLedgerCode')->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $vatcode = new VatCode($data);
        $vatcode->save();

        return Jory::on($vatcode);
    }

    public function update(RequestInput $input, VatCode $vatCode)
    {
        $this->authorize('update', VatCode::class);

        $data = $input->string('startDate')->validate('required|date')->alias('start_date')->next()
            ->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('percentage')->alias('percentage')->next()
            ->string('twinfieldCode')->whenMissing('')->onEmpty('')->alias('twinfield_code')->next()
            ->string('twinfieldLedgerCode')->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $vatCode->fill($data);
        $vatCode->save();

        return GenericResource::make($vatCode);
    }

}