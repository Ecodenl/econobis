<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;


use App\Eco\Campaign\Campaign;
use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Contact\Contact;
use App\Eco\HousingFile\HousingFileHoomHousingStatus;
use App\Eco\HousingFile\HousingFileHousingStatus;
use App\Eco\HousingFile\HousingFileSpecification;
use App\Eco\HousingFile\HousingFileSpecificationStatus;
use App\Eco\HousingFile\RoofType;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeSource;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\Delete\Models\DeleteHousingFile;
use App\Helpers\Excel\HousingFileExcelHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\HousingFile\Grid\RequestQuery;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\HousingFile\FullHousingFileHousingStatus;
use App\Http\Resources\HousingFile\FullHousingFileSpecification;
use App\Http\Resources\HousingFile\GridHousingFile;
use App\Http\Resources\HousingFile\HousingFilePeek;
use App\Http\Resources\HousingFile\HousingFileSelectionPeek;
use App\Http\Resources\Task\SidebarTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            'housingFileSpecifications',
            'housingFileSpecifications.measure',
            'housingFileSpecifications.measure.measureCategory',
            'housingFileSpecifications.status',
            'housingFileSpecifications.floor',
            'housingFileSpecifications.side',
            'housingFileHousingStatuses',
            'housingFileHousingStatuses.housingFileHoomLink',
            'buildingType',
            'roofType',
            'energyLabel',
            'energyLabelStatus',
            'frameType',
            'cookType',
            'heatSource',
            'waterComfort',
            'pitchedRoofHeating',
            'flatRoofHeating',
            'hr3pGlassFrameCurrentGlass',
            'glassInLeadReplaceRoomsHeated',
            'boilerSettingComfortHeat',
            'createdBy',
            'updatedBy',
            'notes',
            'documents'
        ]);

        $teamDocumentCreatedFromIds = Auth::user()->getDocumentCreatedFromIds();
        if($teamDocumentCreatedFromIds){
            $housingFile->relatedDocuments = $housingFile->documents()->whereIn('document_created_from_id', $teamDocumentCreatedFromIds)->get();
        } else{
            $housingFile->relatedDocuments = $housingFile->documents()->get();
        }

        return FullHousingFile::make($housingFile);
    }

    public function excelHousingFiles(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $housingFiles = $requestQuery->getQueryNoPagination()->get();

        $housingFiles->load(['address.contact', 'buildingType', 'energyLabel']);

        $housingFileExcelHelper = new HousingFileExcelHelper($housingFiles);

        return $housingFileExcelHelper->downloadExcel();
    }

    public function store(Request $request, RequestInput $requestInput)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput->integer('addressId')->validate('required|exists:addresses,id')->alias('address_id')->next()
            ->integer('buildingTypeId')->validate('nullable|exists:building_types,id')->onEmpty(null)->whenMissing(null)->alias('building_type_id')->next()
            ->integer('buildYear')->validate('nullable|integer|between:1500,3000')->onEmpty(null)->whenMissing(null)->alias('build_year')->next()
            ->boolean('isHouseForSale')->validate('boolean')->alias('is_house_for_sale')->whenMissing(true)->next()
            ->numeric('surface')->validate('nullable|numeric')->onEmpty(null)->whenMissing(null)->alias('surface')->next()
            ->integer('roofTypeId')->validate('nullable|exists:roof_types,id')->onEmpty(null)->whenMissing(null)->alias('roof_type_id')->next()
            ->integer('energyLabelId')->validate('nullable|exists:energy_labels,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_id')->next()
            ->integer('floors')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('floors')->next()
            ->integer('energyLabelStatusId')->validate('nullable|exists:energy_label_status,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_status_id')->next()
            ->boolean('isMonument')->validate('boolean')->alias('is_monument')->whenMissing(false)->next()
            ->integer('revenueSolarPanels')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('revenue_solar_panels')->next()
            ->string('remark')->validate('string')->onEmpty('')->whenMissing('')->alias('remark')->next()
            ->string('remarkCoach')->validate('string')->onEmpty('')->whenMissing('')->alias('remark_coach')->next()
            ->integer('hoomBuildingId')->validate('integer')->onEmpty(null)->whenMissing(null)->alias('hoom_building_id')->next()
            ->string('wallSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('wall_surface')->next()
            ->string('totalWindowSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('total_window_surface')->next()
            ->string('frameType')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('frame_type')->next()
            ->string('floorSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('floor_surface')->next()
            ->string('pitchedRoofSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('pitched_roof_surface')->next()
            ->string('flatRoofSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('flat_roof_surface')->next()
            ->string('cookType')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('cook_type')->next()
            ->string('heatSource')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('heat_source')->next()
            ->string('waterComfort')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('water_comfort')->next()
            ->string('pitchedRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('pitched_roof_heating')->next()
            ->string('flatRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('flat_roof_heating')->next()
            ->string('hr3pGlassFrameCurrentGlass')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('hr3p_glass_frame_current_glass')->next()
            ->string('glassInLeadReplaceRoomsHeated')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('glass_in_lead_replace_rooms_heated')->next()
            ->integer('numberOfResidents')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('number_of_residents')->next()
            ->string('boilerSettingComfortHeat')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('boiler_setting_comfort_heat')->next()
            ->string('amountGas')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_gas')->next()
            ->string('amountElectricity')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_electricity')->next()
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
            ->numeric('surface')->validate('nullable|numeric')->onEmpty(null)->whenMissing(null)->alias('surface')->next()
            ->integer('roofTypeId')->validate('nullable|exists:roof_types,id')->onEmpty(null)->whenMissing(null)->alias('roof_type_id')->next()
            ->integer('energyLabelId')->validate('nullable|exists:energy_labels,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_id')->next()
            ->integer('floors')->validate('nullable|integer')->onEmpty(null)->whenMissing(null)->alias('floors')->next()
            ->integer('energyLabelStatusId')->validate('nullable|exists:energy_label_status,id')->onEmpty(null)->whenMissing(null)->alias('energy_label_status_id')->next()
            ->boolean('isMonument')->validate('boolean')->alias('is_monument')->whenMissing(false)->next()
            ->integer('revenueSolarPanels')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('revenue_solar_panels')->next()
            ->string('remark')->validate('string')->onEmpty('')->whenMissing('')->alias('remark')->next()
            ->string('remarkCoach')->validate('string')->onEmpty('')->whenMissing('')->alias('remark_coach')->next()
//            ->integer('hoomBuildingId')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('hoom_building_id')->next()
            ->string('wallSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('wall_surface')->next()
            ->string('totalWindowSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('total_window_surface')->next()
            ->string('frameType')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('frame_type')->next()
            ->string('floorSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('floor_surface')->next()
            ->string('pitchedRoofSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('pitched_roof_surface')->next()
            ->string('flatRoofSurface')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('flat_roof_surface')->next()
            ->string('cookType')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('cook_type')->next()
            ->string('heatSource')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('heat_source')->next()
            ->string('waterComfort')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('water_comfort')->next()
//            ->string('pitchedRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('pitched_roof_heating')->next()
//            ->string('flatRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('flat_roof_heating')->next()
//            ->string('hr3pGlassFrameCurrentGlass')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('hr3p_glass_frame_current_glass')->next()
//            ->string('glassInLeadReplaceRoomsHeated')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('glass_in_lead_replace_rooms_heated')->next()
//            ->integer('numberOfResidents')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('number_of_residents')->next()
//            ->string('boilerSettingComfortHeat')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('boiler_setting_comfort_heat')->next()
//            ->string('amountGas')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_gas')->next()
//            ->string('amountElectricity')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_electricity')->next()
            ->get();

        $housingFile->fill($data);
        $housingFile->save();

        return $this->show($housingFile);
    }

    public function updateUse(RequestInput $requestInput, HousingFile $housingFile)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput->string('pitchedRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('pitched_roof_heating')->next()
            ->string('flatRoofHeating')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('flat_roof_heating')->next()
            ->string('hr3pGlassFrameCurrentGlass')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('hr3p_glass_frame_current_glass')->next()
            ->string('glassInLeadReplaceRoomsHeated')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('glass_in_lead_replace_rooms_heated')->next()
            ->integer('numberOfResidents')->validate('integer')->onEmpty(0)->whenMissing(0)->alias('number_of_residents')->next()
            ->string('boilerSettingComfortHeat')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('boiler_setting_comfort_heat')->next()
            ->string('amountGas')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_gas')->next()
            ->string('amountElectricity')->validate('nullable')->onEmpty(null)->whenMissing(null)->alias('amount_electricity')->next()
            ->get();

        $housingFile->fill($data);
        $housingFile->save();

        return $this->show($housingFile);
    }

    public function addHousingFileSpecification(RequestInput $requestInput)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput
            ->integer('housingFileId')->validate('required|exists:housing_files,id')->alias('housing_file_id')->next()
            ->integer('measureId')->validate('required|exists:measures,id')->alias('measure_id')->next()
            ->string('measureDate')->whenMissing(null)->onEmpty(null)->alias('measure_date')->next()
            ->string('answer')->whenMissing(null)->onEmpty(null)->alias('answer')->next()
            ->integer('statusId')->validate('nullable|exists:housing_file_specification_statuses,id')->whenMissing(null)->onEmpty(null)->alias('status_id')->next()
            ->integer('floorId')->validate('nullable|exists:housing_file_specification_floors,id')->whenMissing(null)->onEmpty(null)->alias('floor_id')->next()
            ->integer('sideId')->validate('nullable|exists:housing_file_specification_sides,id')->whenMissing(null)->onEmpty(null)->alias('side_id')->next()
//            ->string('externalHoomName')->whenMissing(null)->onEmpty(null)->alias('external_hoom_name')->next()
            ->string('typeOfExecution')->whenMissing(null)->onEmpty(null)->alias('type_of_execution')->next()
            ->numeric('savingsGas')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('savings_gas')->next()
            ->numeric('savingsElectricity')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('savings_electricity')->next()
            ->numeric('co2Savings')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('co2_savings')->next()
            ->integer('campaignId')->validate('nullable|exists:campaigns,id')->whenMissing(null)->onEmpty(null)->alias('campaign_id')->next()
            ->get();

        $housingFileSpecification = new HousingFileSpecification($data);
        $housingFileSpecification->save();

        $housingFileSpecification->load([
            'measure',
            'measure.measureCategory',
            'status',
            'floor',
            'side',
        ]);
        return FullHousingFileSpecification::make($housingFileSpecification);
   }

    public function updateHousingFileSpecification(RequestInput $requestInput, HousingFileSpecification $housingFileSpecification)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput
            ->string('measureDate')->whenMissing(null)->onEmpty(null)->alias('measure_date')->next()
            ->string('answer')->whenMissing(null)->onEmpty(null)->alias('answer')->next()
            ->integer('statusId')->validate('nullable|exists:housing_file_specification_statuses,id')->whenMissing(null)->onEmpty(null)->alias('status_id')->next()
            ->integer('floorId')->validate('nullable|exists:housing_file_specification_floors,id')->whenMissing(null)->onEmpty(null)->alias('floor_id')->next()
            ->integer('sideId')->validate('nullable|exists:housing_file_specification_sides,id')->whenMissing(null)->onEmpty(null)->alias('side_id')->next()
            ->string('typeBrand')->whenMissing(null)->onEmpty(null)->alias('type_brand')->next()
//            ->string('externalHoomName')->whenMissing(null)->onEmpty(null)->alias('external_hoom_name')->next()
            ->string('typeOfExecution')->whenMissing(null)->onEmpty(null)->alias('type_of_execution')->next()
            ->numeric('savingsGas')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('savings_gas')->next()
            ->numeric('savingsElectricity')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('savings_electricity')->next()
            ->numeric('co2Savings')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('co2_savings')->next()
            ->integer('campaignId')->validate('nullable|exists:campaigns,id')->whenMissing(null)->onEmpty(null)->alias('campaign_id')->next()
            ->get();

        $housingFileSpecification->fill($data);
        $housingFileSpecification->save();

        $housingFileSpecification->load([
            'measure',
            'measure.measureCategory',
            'status',
            'floor',
            'side',
        ]);
        return FullHousingFileSpecification::make($housingFileSpecification);
    }

    public function deleteHousingFileSpecification(HousingFileSpecification $housingFileSpecification)
    {
        $this->authorize('manage', HousingFile::class);

       $housingFileSpecification->delete();
    }

    public function addHousingFileHousingStatus(RequestInput $requestInput)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput
            ->integer('housingFileId')->validate('required|exists:housing_files,id')->alias('housing_file_id')->next()
            ->integer('housingFileHoomLinksId')->validate('required|exists:housing_file_hoom_links,id')->alias('housing_file_hoom_links_id')->next()
            ->string('status')->whenMissing(null)->onEmpty(null)->alias('status')->next()
//            ->numeric('numberOrM2')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('number_or_m2')->next()
            ->get();

        $housingFileHousingStatus = new HousingFileHousingStatus($data);
        $housingFileHousingStatus->save();

        $housingFileHousingStatus->load([
            'housingFileHoomLink',
        ]);
        return FullHousingFileHousingStatus::make($housingFileHousingStatus);
    }

    public function updateHousingFileHousingStatus(RequestInput $requestInput, HousingFileHousingStatus $housingFileHousingStatus)
    {
        $this->authorize('manage', HousingFile::class);

        $data = $requestInput
//            ->integer('housingFileId')->validate('required|exists:housing_files,id')->alias('housing_file_id')->next()
//            ->integer('housingFileHoomLinksId')->validate('required|exists:housing_file_hoom_links,id')->alias('housing_file_hoom_links_id')->next()
            ->string('status')->whenMissing(null)->onEmpty(null)->alias('status')->next()
//            ->numeric('numberOrM2')->validate('nullable|numeric')->whenMissing(null)->onEmpty(null)->alias('number_or_m2')->next()
            ->get();

        $housingFileHousingStatus->fill($data);
        $housingFileHousingStatus->save();

        $housingFileHousingStatus->load([
            'housingFileHoomLink',
        ]);
        return FullHousingFileHousingStatus::make($housingFileHousingStatus);
    }

    public function deleteHousingFileHousingStatus(HousingFileHousingStatus $housingFileHousingStatus)
    {
        $this->authorize('manage', HousingFile::class);

        $housingFileHousingStatus->delete();
    }

    public function createOpportunities(Request $request, HousingFile $housingFile, Campaign $campaign)
    {
        $this->authorize('manage', HousingFile::class);

        $intakeStatusIdClosedWithOpportunity = IntakeStatus::where('code_Ref', 'closed_with_opportunity')->first()->id;
        $housingFileIntakeSource = IntakeSource::where('code_ref', 'housing_file')->first()->id;
        $opportunityStatusIdActive = OpportunityStatus::where('code_ref', 'active')->first()->id;
        $specificationStatusIdOpportunityCreated = HousingFileSpecificationStatus::where('code_ref', 'opportunity_created')->first()->id;

        $specificationIds = $request->input('ids');
        $opportunityIds = [];

        foreach ($specificationIds as $specificationId){
            $housingFileSpecification = HousingFileSpecification::find($specificationId);
            if($housingFileSpecification){
                $measure = Measure::find($housingFileSpecification->measure_id);

                $intake = Intake::create([
                    'contact_id' => $housingFile->address->contact->id,
                    'address_id' => $housingFile->address->id,
                    'intake_status_id' => $intakeStatusIdClosedWithOpportunity,
                    'campaign_id' => $campaign->id,
                    'note' => 'Intake gemaakt vanuit woningdossier',
                ]);
                $intake->sources()->sync($housingFileIntakeSource);

                $intake->measuresRequested()->sync($measure->measureCategory->id);

                $opportunity = Opportunity::create([
                    'measure_category_id' => $measure->measureCategory->id,
                    'status_id' => $opportunityStatusIdActive,
                    'housing_file_specification_id' => $housingFileSpecification->id,
                    'intake_id' => $intake->id,
                    'quotation_text' => $housingFileSpecification->external_hoom_name ? $housingFileSpecification->external_hoom_name : '',
                    'desired_date' => null,
                    'evaluation_agreed_date' => null,
                ]);
                $opportunity->measures()->sync($measure->id);
                $opportunityIds[] = $opportunity->id;

                $housingFileSpecification->status_id = $specificationStatusIdOpportunityCreated;
                $housingFileSpecification->save();
            }
        }
        return ['opportunityIds' => $opportunityIds];
    }

    public function createQuotationRequests(Request $request, HousingFile $housingFile, Contact $contact)
    {
        $this->authorize('manage', HousingFile::class);

        $quotationRequestStatus = QuotationRequestStatus::orderBy('order')->first();
        $offerteverzoekAction = OpportunityAction::where('code_ref', 'quotation-request')->first();
        $opportunityIds = $request->input('ids');

        foreach ($opportunityIds as $opportunityId){
            $opportunity = Opportunity::find($opportunityId);
            if($opportunity){
                $quotationRequest = new QuotationRequest();
                $quotationRequest->contact_id = $contact->id;
                $quotationRequest->opportunity_id = $opportunity->id;
                $quotationRequest->opportunity_action_id = $offerteverzoekAction->id;
                $quotationRequest->date_recorded = null;
                $quotationRequest->date_released = null;
                $quotationRequest->status_id = $quotationRequestStatus->id;
                $quotationRequest->date_planned_to_send_wf_email_status = null;
                $quotationRequest->quotation_text = $opportunity = '';
                $quotationRequest->save();
            }
        }

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
        $teamContactIds = Auth::user()->getTeamContactIds();
        if ($teamContactIds){
            $housingFiles = HousingFile::whereHas('address', function($query) use($teamContactIds){
                $query->whereIn('contact_id', $teamContactIds);
            })->orderBy('id')->get();
        }else{
            $housingFiles = HousingFile::orderBy('id')->get();
        }

        return HousingFilePeek::collection($housingFiles);
    }
    public function buildingTypesPeek()
    {
        return HousingFileSelectionPeek::collection(BuildingType::orderBy('order')->get());
    }
    public function roofTypesPeek()
    {
        return HousingFileSelectionPeek::collection(RoofType::orderBy('order')->get());
    }
    public function energyLabelsPeek()
    {
        return HousingFileSelectionPeek::collection(EnergyLabel::orderBy('order')->get());
    }
    public function energyLabelStatusPeek()
    {
        return HousingFileSelectionPeek::collection(EnergyLabelStatus::orderBy('id')->get());
    }
//    public function frameTypeSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'frame-type')->get());
//    }
    public function cookTypeSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'cook-type')->get());
    }
    public function heatSourceSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'heat-source')->get());
    }
    public function waterComfortSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'water-comfort')->get());
    }

//    public function pitchedRoofHeatingSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'pitched-roof-heating')->get());
//    }
//    public function flatRoofHeatingSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'flat-roof-heating')->get());
//    }
//    public function hr3pGlassFrameCurrentGlassSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'hr3p-glass-frame-current-glass')->get());
//    }
//    public function glassInLeadReplaceRoomsHeatedSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'glass-in-lead-replace-rooms-heated')->get());
//    }

    public function boilerSettingComfortHeatSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'boiler-setting-comfort-heat')->get());
    }

    public function crackSealingTypeSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'crack-sealing-type')->get());
    }
    public function currentFloorInsulationSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-floor-insulation')->get());
    }
//    public function buildingHeatingApplicationSelectionPeek()
//    {
//        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'building-heating-application-selection')->get());
//    }
    public function ventilationTypeSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'ventilation-type')->get());
    }
    public function currentLivingRoomsWindowsSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-living-rooms-windows')->get());
    }
    public function currentWallInsulationSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-wall-insulation')->get());
    }
    public function currentRoofInsulationSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-roof-insulation')->get());
    }
    public function currentSleepingRoomsWindowsSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'current-sleeping-rooms-windows')->get());
    }
    public function hasCavityWallSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'has-cavity-wall')->get());
    }
    public function hasSolarPanelsSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'has-solar-panels')->get());
    }
    public function heatSourceWarmTapWaterSelectionPeek()
    {
        return HousingFileSelectionPeek::collection(HousingFileHoomHousingStatus::select(['hoom_status_value as key', 'hoom_status_name as name'])->where('external_hoom_short_name', 'heat-source-warm-tap-water')->get());
    }

    public function getAmountOfActiveHousingFiles(){
        return HousingFile::count();
    }
}