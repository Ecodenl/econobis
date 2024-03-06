<?php

namespace App\Http\Controllers\Api\Ledger;

use App\Eco\Ledger\Ledger;
use App\Helpers\Delete\Models\DeleteLedger;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use JosKolenberg\LaravelJory\Facades\Jory;

class LedgerController extends Controller
{

    public function jory()
    {
        return Jory::on(Ledger::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', Ledger::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('vatCodeId')->validate('nullable|exists:vat_codes,id')->onEmpty(null)->whenMissing(null)->alias('vat_code_id')->next()
            ->string('twinfieldLedgerCode')->validate('unique:ledgers,twinfield_ledger_code,0,id,deleted_at,NULL')->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $ledger = new Ledger($data);
        $ledger->save();

        return Jory::on($ledger);
    }

    public function update(RequestInput $input, Ledger $ledger)
    {
        $this->authorize('manage', Ledger::class);
        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->integer('vatCodeId')->validate('nullable|exists:vat_codes,id')->onEmpty(null)->whenMissing(null)->alias('vat_code_id')->next()
            ->string('twinfieldLedgerCode')->validate('unique:ledgers,twinfield_ledger_code,' . $ledger->id . ',id,deleted_at,NULL' )->whenMissing('')->onEmpty('')->alias('twinfield_ledger_code')->next()
            ->get();

        $ledger->fill($data);
        $ledger->save();

        return GenericResource::make($ledger);
    }

    public function destroy(Ledger $ledger)
    {
        $this->authorize('manage', Ledger::class);

        try {
            DB::beginTransaction();

            $deleteLedger = new DeleteLedger($ledger);
            $result = $deleteLedger->delete();

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

}