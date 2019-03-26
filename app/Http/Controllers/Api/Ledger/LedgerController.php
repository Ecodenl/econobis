<?php

namespace App\Http\Controllers\Api\Ledger;

use App\Eco\Ledger\Ledger;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;

class LedgerController extends Controller
{

    public function jory(Request $request)
    {
        return Ledger::jory()->applyRequest($request);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('create', Ledger::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('vatCodeId')->validate('nullable|exists:vat_codes,id')->onEmpty(null)->whenMissing(null)->alias('vat_code_id')->next()
            ->string('twinfieldLedgerCode')->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $ledger = new Ledger($data);
        $ledger->save();

        return Ledger::jory()->onModel($ledger)->applyRequest($request);
    }

    public function update(RequestInput $input, Ledger $ledger)
    {
        $this->authorize('update', Ledger::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('vatCodeId')->validate('nullable|exists:vat_codes,id')->onEmpty(null)->whenMissing(null)->alias('vat_code_id')->next()
            ->string('twinfieldLedgerCode')->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $ledger->fill($data);
        $ledger->save();

        return GenericResource::make($ledger);
    }

}