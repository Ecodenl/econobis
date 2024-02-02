<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\HousingFile;


use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\HousingFile\HousingFile;
use App\Eco\HousingFile\HousingFileSpecification;
use App\Eco\HousingFile\HousingFileSpecificationStatus;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeSource;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Helpers\Excel\HousingFileExcel2Helper;
use App\Helpers\Excel\HousingFileExcel2SpecificationsHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\HousingFileSpecification\Grid\RequestQuery;
use App\Http\Resources\HousingFile\GridHousingFileSpecification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HousingFileSpecificationController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $housingFileSpecifications = $requestQuery->get();

        $housingFileSpecifications->load(['housingFile.address', 'housingFile.address.contact', 'status', 'floor', 'side']);

        $specificationStatusDesirable = HousingFileSpecificationStatus::where('code_ref', 'desirable')->first();
        $specificationIdsTotal = $requestQuery->getQueryNoPagination()->where('housing_file_specifications.status_id', $specificationStatusDesirable->id)->get()->pluck('id');

        return GridHousingFileSpecification::collection($housingFileSpecifications)
            ->additional(['meta' => [
                'total' => $requestQuery->total(),
                'specificationIdsTotal' => $specificationIdsTotal,
            ]
        ]);
    }

    public function createOpportunities(Request $request, Campaign $campaign)
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
                $housingFile = $housingFileSpecification->housingFile;
                $measure = Measure::find($housingFileSpecification->measure_id);

                $intake = Intake::create([
                    'contact_id' => $housingFile->address->contact->id,
                    'address_id' => $housingFile->address->id,
                    'intake_status_id' => $intakeStatusIdClosedWithOpportunity,
                    'campaign_id' => $campaign->id,
                    'note' => 'Intake gemaakt vanuit woningdossier specificatie',
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

    public function createQuotationRequests(Request $request, Contact $contact)
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
                $quotationRequest->quotation_amount = 0;
                $quotationRequest->save();
            }
        }
    }

    public function excelSpecifications(RequestQuery $requestQuery)
    {
        set_time_limit(0);
        $housingFileSpecifications = $requestQuery->getQueryNoPagination()->get();

        $housingFileSpecifications->load(['housingFile.address', 'housingFile.address.contact', 'status', 'floor', 'side']);

        $housingFileExcelSpecificationsHelper = new HousingFileExcel2SpecificationsHelper($housingFileSpecifications);

        return $housingFileExcelSpecificationsHelper->downloadExcel();
    }


}