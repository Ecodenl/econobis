<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;


use App\Eco\HousingFile\HousingFile;
use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\HousingFile\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\HousingFile\GridHousingFile;
use App\Http\Resources\HousingFile\IntakePeek;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;

class HousingFileController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $intakes = $requestQuery->get();

        $intakes->load(['address.contact', 'buildingType', 'energyLabel']);

        return GridHousingFile::collection($intakes)
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
            'buildingType',
            'roofType',
            'energyLabel',
            'energyLabelStatus',
        ]);

        return FullHousingFile::make($housingFile);
    }

    public function store(Request $request)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $request->validate([
            'addressId' => 'required|exists:addresses,id',
            'buildingTypeId' => 'exists:building_types,id',
            'buildYear' => 'integer|between:1500,3000',
            'surface' => 'integer',
            'roofTypeId' => 'exists:roof_types,id',
            'energyLabelId' => 'exists:energy_labels,id',
            'floors' => 'integer',
            'energyLabelStatusId' => 'exists:energy_label_status,id',
            'isMonument' => 'boolean',
        ]);

        //basic HousingFile
        $housingFile = new HousingFile();

        $housingFile->address_id = $data['addressId'];

        if ($data['buildingTypeId']) {
            $housingFile->building_type_id = $data['buildingTypeId'];
        }

        if ($data['buildYear']) {
            $housingFile->build_year = $data['buildYear'];
        }

        if ($data['surface']) {
            $housingFile->surface = $data['surface'];
        }

        if ($data['roofTypeId']) {
            $housingFile->roof_type_id = $data['roofTypeId'];
        }

        if ($data['energyLabelId']) {
            $housingFile->energy_label_id = $data['energyLabelId'];
        }

        if ($data['floors']) {
            $housingFile->floors = $data['floors'];
        }

        if ($data['energyLabelStatusId']) {
            $housingFile->energy_label_status_id = $data['energyLabelStatusId'];
        }

        if ($data['isMonument']) {
            $housingFile->is_monument = $data['isMonument'];
        }

        $housingFile->save();

        return $this->show($housingFile);
    }


    public function update(Request $request, HousingFile $housingFile)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $request->validate([
            'addressId' => 'required|exists:addresses,id',
            'buildingTypeId' => 'exists:building_types,id',
            'buildYear' => 'integer|between:1500,3000',
            'surface' => 'integer',
            'roofTypeId' => 'exists:roof_types,id',
            'energyLabelId' => 'exists:energy_labels,id',
            'floors' => 'integer',
            'energyLabelStatusId' => 'exists:energy_label_status,id',
            'isMonument' => 'boolean',
        ]);

        $housingFile->address_id = $data['addressId'];

        if ($data['buildingTypeId']) {
            $housingFile->building_type_id = $data['buildingTypeId'];
        }

        if ($data['buildYear']) {
            $housingFile->build_year = $data['buildYear'];
        }

        if ($data['surface']) {
            $housingFile->surface = $data['surface'];
        }

        if ($data['roofTypeId']) {
            $housingFile->roof_type_id = $data['roofTypeId'];
        }

        if ($data['energyLabelId']) {
            $housingFile->energy_label_id = $data['energyLabelId'];
        }

        if ($data['floors']) {
            $housingFile->floors = $data['floors'];
        }

        if ($data['energyLabelStatusId']) {
            $housingFile->energy_label_status_id = $data['energyLabelStatusId'];
        }

        if ($data['isMonument']) {
            $housingFile->is_monument = $data['isMonument'];
        }

        $housingFile->save();

        return $this->show($housingFile);
    }


    public function attachMeasureTaken(HousingFile $housingFile, Measure $measure)
    {
        $this->authorize('manage', HousingFile::class);

        $housingFile->measuresTaken()->attach($measure->id);

        return GenericResource::make($measure);
    }

    public function detachMeasureTaken(HousingFile $housingFile, Measure $measure)
    {
        $this->authorize('manage', Intake::class);

        $housingFile->measuresTaken()->detach($measure->id);

        return GenericResource::make($measure);
    }

    public function destroy(HousingFile $housingFile)
    {
        $this->authorize('manage', HousingFile::class);

        //delete many to many relations
        $housingFile->measuresTaken()->detach();

        //delete one to many relations
        //notes
        foreach($housingFile->notes as $note){
            $note->notes()->dissociate();
            $note->save();
        }
        //documents
        foreach($housingFile->emails as $email){
            $email->intake()->dissociate();
            $email->save();
        }

        //delete model itself
        $housingFile->delete();

        return true;
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