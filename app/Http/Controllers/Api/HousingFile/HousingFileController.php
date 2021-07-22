<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;


use App\Eco\Address\Address;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Helpers\Delete\Models\DeleteHousingFile;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\HousingFile\Grid\RequestQuery;
use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\HousingFile\GridHousingFile;
use App\Http\Resources\HousingFile\HousingFilePeek;
use App\Http\Resources\HousingFile\IntakePeek;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HousingFileController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $housingFiles = $requestQuery->get();

        $housingFiles->load(['address.contact', 'buildingType', 'energyLabel']);

        return GridHousingFile::collection($housingFiles)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuw woningdossier
     */
    public function getStore(Contact $contact)
    {
        $info[] = $contact->getPrettyAddresses();

        return $info;
    }

    public function show(HousingFile $housingFile)
    {
        $housingFile->load([
            'address.contact',
            'address.measuresTaken',
            'buildingType',
            'roofType',
            'energyLabel',
            'energyLabelStatus',
            'createdBy',
            'updatedBy',
            'notes',
            'documents'
        ]);

        return FullHousingFile::make($housingFile);
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('buildingTypeId')->validate('nullable|exists:building_types,id')->onEmpty(null)->whenMissing(null)->alias('building_type_id')->next()
            ->integer('buildYear')->validate('nullable|integer|between:1500,3000')->onEmpty(null)->whenMissing(null)->alias('build_year')->next()
            ->boolean('isHouseForSale')->validate('boolean')->alias('is_house_for_sale')->whenMissing(true)->next()
            ->integer('surface')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('surface')->next()
            ->integer('roofTypeId')->validate('nullable|exists:roof_types,id')->onEmpty(null)->whenMissing(null)->alias('roof_type_id')->next()
            ->integer('energyLabelId')->validate('nullable|exists:energy_labels,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_id')->next()
            ->integer('floors')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('floors')->next()
            ->integer('energyLabelStatusId')->validate('nullable|exists:energy_label_status,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_status_id')->next()
            ->boolean('isMonument')->validate('boolean')->alias('is_monument')->whenMissing(false)->next()
            ->get();

        $housingFile = new HousingFile($data);
        $housingFile->save();

        return $this->show($housingFile);
    }


    public function update(RequestInput $requestInput, HousingFile $housingFile)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('buildingTypeId')->validate('nullable|exists:building_types,id')->onEmpty(null)->whenMissing(null)->alias('building_type_id')->next()
            ->integer('buildYear')->validate('nullable|integer|between:1500,3000')->onEmpty(null)->whenMissing(null)->alias('build_year')->next()
            ->boolean('isHouseForSale')->validate('boolean')->alias('is_house_for_sale')->whenMissing(true)->next()
            ->integer('surface')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('surface')->next()
            ->integer('roofTypeId')->validate('nullable|exists:roof_types,id')->onEmpty(null)->whenMissing(null)->alias('roof_type_id')->next()
            ->integer('energyLabelId')->validate('nullable|exists:energy_labels,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_id')->next()
            ->integer('floors')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('floors')->next()
            ->integer('energyLabelStatusId')->validate('nullable|exists:energy_label_status,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_status_id')->next()
            ->boolean('isMonument')->validate('boolean')->alias('is_monument')->whenMissing(false)->next()
            ->get();

        $housingFile->fill($data);
        $housingFile->save();

        return $this->show($housingFile);
    }


    public function attachMeasureTaken(RequestInput $requestInput)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput
            ->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('measureDate')->whenMissing(null)->onEmpty(null)->alias('measure_date')->next()
            ->get();

        $address = Address::find($data['address_id']);
        $address->measuresTaken()->attach($data['measure_id'], ['measure_date' => $data['measure_date']]);

        $address->load('measuresTaken', 'contact');

        return FullAddress::make($address);
    }

    public function detachMeasureTaken(Address $address, Measure $measure)
    {
        $this->authorize('manage', HousingFile::class);

        $address->measuresTaken()->detach($measure->id);

        return GenericResource::make($measure);
    }

    public function destroy(HousingFile $housingFile)
    {
        $this->authorize('manage', HousingFile::class);

        try {
            DB::beginTransaction();

            $deleteHousingFile = new DeleteHousingFile($housingFile);
            $result = $deleteHousingFile->delete();

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

    public function notes(HousingFile $housingFile)
    {
        return SidebarTask::collection($housingFile->notes);
    }

    public function documents(HousingFile $housingFile)
    {
        return SidebarDocument::collection($housingFile->documents);
    }

    public function peek()
    {
        return HousingFilePeek::collection(HousingFile::orderBy('id')->get());
    }

    public function getAmountOfActiveHousingFiles(){
        return HousingFile::count();
    }
}