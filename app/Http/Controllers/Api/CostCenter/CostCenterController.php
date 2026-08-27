<?php

namespace App\Http\Controllers\Api\CostCenter;

use App\Eco\CostCenter\CostCenter;
use App\Helpers\Delete\Models\DeleteCostCenter;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use JosKolenberg\LaravelJory\Facades\Jory;

class CostCenterController extends Controller
{

    public function jory()
    {
        $this->authorize('view', CostCenter::class);

        return Jory::on(CostCenter::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', CostCenter::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->string('twinfieldCostCenterCode')->validate('unique:cost_centers,twinfield_cost_center_code,0,id,deleted_at,NULL')->whenMissing('')->onEmpty('')->alias('twinfield_cost_center_code')->next()
            ->get();

        $costCenter = new CostCenter($data);
        $costCenter->save();

        return Jory::on($costCenter);
    }

    public function update(RequestInput $input, CostCenter $costCenter)
    {
        $this->authorize('manage', CostCenter::class);
        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->string('twinfieldCostCenterCode')->validate('unique:cost_centers,twinfield_cost_center_code,' . $costCenter->id . ',id,deleted_at,NULL' )->whenMissing('')->onEmpty('')->alias('twinfield_cost_center_code')->next()
            ->get();

        $costCenter->fill($data);
        $costCenter->save();

        return GenericResource::make($costCenter);
    }

    public function destroy(CostCenter $costCenter)
    {
        $this->authorize('manage', CostCenter::class);

        try {
            DB::beginTransaction();

            $deleteCostCenter = new DeleteCostCenter($costCenter);
            $result = $deleteCostCenter->delete();

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