<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Intake;


use App\Eco\Address\Address;
use App\Eco\Measure\MeasureRequested;
use App\Eco\Measure\MeasureTaken;
use App\Eco\Intake\Intake;
use App\Eco\Contact\Contact;
use App\Eco\Intake\IntakeNote;
use App\Eco\Task\Jobs\DeleteTask;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Intake\Grid\RequestQuery;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Intake\GridIntake;
use App\Http\Resources\Intake\IntakePeek;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use App\Helpers\RequestInput\RequestInput;

class IntakeController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $intakes = $requestQuery->get();

        $intakes->load(['sources', 'address', 'status']);

        return GridIntake::collection($intakes)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    /**
     * Geef de data die React nodig heeft om het scherm op te bouwen voor een nieuwe intake
     */
    public function getStore(Request $request)
    {
        $contact = Contact::find($request->contact);
        $info[] = $contact->getPrettyAddresses();

        return $info;
    }

    public function store(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'addressId' => 'required|exists:addresses,id',
            'statusId' => 'exists:intake_status,id',
            'campaignId' => 'exists:campaigns,id',
            'buildingTypeId' => 'exists:building_types,id',
            'buildYear' => 'integer|between:1500,3000',
            'owner' => 'boolean',
            'sourceIds' => '',
            'intakeReasonIds' => ''
        ]);

        //basic intake
        $intake = new Intake();
        $intake->address_id = $data['addressId'];
        if ($data['statusId']) {
            $intake->intake_status_id
                = $data['statusId'];
        }
        if ($data['campaignId']) {
            $intake->campaign_id = $data['campaignId'];
        }
        $intake->save();

        //relations
        if ($data['sourceIds']) {
            foreach ($data['sourceIds'] as $source_id) {
                $intake->sources()->attach($source_id);
            }
        }
        if ($data['intakeReasonIds']) {
            foreach ($data['intakeReasonIds'] as $intake_reason) {
                $intake->reasons()->attach($intake_reason);
            }
        }

        //rest is saved on Address
        $address = Address::find($data['addressId']);
        if ($data['buildingTypeId']) {
            $address->building_type_id = $data['buildingTypeId'];
        }
        if ($data['buildYear']) {
            $address->build_year = $data['buildYear'];
        }
        if ($data['owner']) {
            $address->owner = $data['owner'];
        }

        $address->save();

        return $intake;
    }

    public function storeMeasureTaken(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Intake::class);

        $data = $requestInput->string('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->string('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('measureDate')->whenMissing(null)->onEmpty(null)->alias('measure_date')->next()
            ->string('energyLabelId')->whenMissing(null)->onEmpty(null)->alias('energy_label_id')->next()
            ->get();

        $measureTaken = new MeasureTaken($data);
        try {
            $measureTaken->save();
        } catch (\Exception $e) {
            if ($e->getCode() == 23000) {
                return abort(409, 'Maatregel genomen bestaat al op dit adres');
            } else {
                return abort(500, 'Er is een onbekende fout opgetreden');
            }
        }

        return \App\Http\Resources\Measure\MeasureTaken::make($measureTaken->fresh());
    }

    public function storeMeasureRequested(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', Intake::class);

        $data = $requestInput->string('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->string('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('desiredDate')->whenMissing(null)->onEmpty(null)->alias('desired_date')->next()
            ->string('degreeInterest')->whenMissing(0)->onEmpty(0)->alias('degree_interest')->next()
            ->get();
        $measureRequested = new \App\Eco\Measure\MeasureRequested($data);
        try {
            $measureRequested->save();
        } catch (\Exception $e) {
            if ($e->getCode() == 23000) {
                return abort(409, 'Deze maatregel is al aangevraagd op dit adres');
            } else {
                return abort(500, 'Er is een onbekende fout opgetreden');
            }
        }
        return \App\Http\Resources\Measure\MeasureRequested::make($measureRequested->fresh());
    }

    public function storeNote(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'intakeId' => 'required|exists:intakes,id',
            'note' => 'required',
        ]);
        $intakeNote = new IntakeNote();
        $intakeNote->intake_id = $data['intakeId'];
        $intakeNote->note = $data['note'];
        $intakeNote->save();

        return $intakeNote;
    }

    public function show(Request $request, Intake $intake)
    {
        $intake->load([
            'address.building_type',
            'address.measures_taken',
            'address.measures_requested',
            'sources',
            'status',
            'notes',
            'campaign',
            'reasons',
            'documents',
        ]);

        return FullIntake::make($intake);
    }

    public function update(Request $request, Intake $intake)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'intakeStatusId' => 'nullable|exists:intake_status,id',
            'campaignId' => 'nullable|exists:campaigns,id',
            'buildingTypeId' => 'nullable|exists:building_types,id',
            'buildYear' => 'nullable|integer|between:1500,3000',
            'owner' => 'nullable|boolean',
            'sourceIds' => 'nullable',
            'intakeReasonIds' => 'nullable',
            'statusId' => '',
        ]);

        if (array_key_exists('addressId', $data)
            || array_key_exists('intakeStatusId', $data)
            || array_key_exists('campaignId', $data)
        ) {
            if (array_key_exists('addressId', $data)) {
                $intake->address_id = $data['addressId'];
            }
            if (array_key_exists('intakeStatusId', $data)) {
                $intake_status_id = $data['intakeStatusId'];
                if (empty($intake_status_id)) $intake_status_id = null;
                $intake->intake_status_id
                    = $intake_status_id;
            }
            if (array_key_exists('campaignId', $data)) {
                $campaign_id = $data['campaignId'];
                if (empty($campaign_id)) $campaign_id = null;
                $intake->campaign_id = $campaign_id;
            }
            if (array_key_exists('statusId', $data)) {
                $statusId = $data['statusId'];
                if (empty($statusId)) $statusId = null;
                $intake->intake_status_id = $statusId;
            }
            $intake->save();
        }

        //relations
        if (array_key_exists('sourceIds', $data)) {
            $source_ids = $data['sourceIds'];
            if (empty($source_ids)) $source_ids = null;
            $intake->sources()->sync($source_ids);
        }
        if (array_key_exists('intakeReasonIds', $data)) {
            $intake_reason_ids = $data['intakeReasonIds'];
            if (empty($intake_reason_ids)) $intake_reason_ids = null;
            $intake->reasons()->sync($intake_reason_ids);

        }

        //rest is saved on Address
        if (array_key_exists('buildingTypeId', $data)
            || array_key_exists('buildYear', $data)
            || array_key_exists('owner', $data)
        ) {
            $address = $intake->address;
            if (array_key_exists('buildingTypeId', $data)) {
                $building_type_id = $data['buildingTypeId'];
                if (empty($building_type_id)) $building_type_id = null;
                $address->building_type_id = $building_type_id;
            }
            if (array_key_exists('buildYear', $data)) {
                $address->build_year = $data['buildYear'];
            }
            if (array_key_exists('owner', $data)) {
                $address->owner = $data['owner'];
            }

            $address->save();
        }

        $intake = $intake->fresh();
        $intake->load([
            'address.building_type',
            'address.measures_taken',
            'address.measures_requested',
            'sources',
            'status',
            'notes',
            'campaign',
            'reasons',
        ]);

        return FullIntake::make($intake);
    }

    public function deleteMeasureTaken(MeasureTaken $measureTaken)
    {
        $this->authorize('manage', Intake::class);

        $measureTaken->delete();
    }

    public function deleteMeasureRequested(MeasureRequested $measureRequested)
    {
        $this->authorize('manage', Intake::class);

        $measureRequested->delete();
    }

    public function updateNote(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'note' => 'required',
            'id' => 'required',
        ]);
        $note = intakeNote::find($request->id);
        $note->note = $data['note'];
        $note->save();

        return $note;
    }

    public function deleteNote(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $note = IntakeNote::find($request->note);
        $note->delete();

        return null;
    }

    public function destroy(Request $request)
    {
        $this->authorize('manage', Intake::class);

        $intake = Intake::find($request->intake);
        $intake->notes()->delete();
        $intake->sources()->delete();
        $intake->reasons()->delete();
        DeleteTask::collection($intake->tasks, true);
        $intake->delete();

        return null;
    }

    public function tasks(Intake $intake)
    {
        return SidebarTask::collection($intake->tasks);
    }

    public function peek()
    {
        return IntakePeek::collection(Intake::orderBy('id')->get());
    }

    public function getAmountOfActiveIntakes(){
        return Intake::count();
    }

    public function updateMeasureRequested(Request $request, MeasureRequested $measureRequested)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'desiredDateNew' => '',
            'degreeInterest' => 'integer',
        ]);

        $measureRequested->desired_date = $data['desiredDateNew'];
        $measureRequested->degree_interest = $data['degreeInterest'];

        $measureRequested->save();

        return $measureRequested;
    }

    public function updateMeasureTaken(Request $request, MeasureTaken $measureTaken)
    {
        $this->authorize('manage', Intake::class);

        $data = $request->validate([
            'measureDateNew' => '',
            'energyLabelId' => 'integer|exists:energy_labels,id',
        ]);

        $measureTaken->measure_date = $data['measureDateNew'];
        $measureTaken->energy_label_id = $data['energyLabelId'];

        $measureTaken->save();

        return $measureTaken;
    }


}