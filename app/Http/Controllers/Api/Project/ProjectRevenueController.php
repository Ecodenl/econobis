<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Occupation\OccupationContact;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use App\Eco\PaymentInvoice\PaymentInvoice;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Project\ProjectRevenueDeliveredKwhPeriod;
use App\Eco\Project\ProjectType;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionCSVHelper;
use App\Helpers\CSV\RevenueParticipantsCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Excel\EnergySupplierExcelHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProject\FullRevenueParticipantProject;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullProjectRevenue;
use App\Http\Resources\Project\FullProjectRevenueDistribution;
use App\Jobs\Revenue\CreatePaymentInvoices;
use App\Jobs\Revenue\CreateRevenueReport;
use Barryvdh\DomPDF\Facade as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ProjectRevenueController extends ApiController
{
    public function show(ProjectRevenue $projectRevenue)
    {
        $projectRevenue->load([
            'type',
            'category',
            'project.administration',
            'project.projectType',
            'participantProjectPayoutType',
            'createdBy',
        ]);

        return FullProjectRevenue::make($projectRevenue);
    }

    public function csv(ProjectRevenue $projectRevenue)
    {
        set_time_limit(0);

        //todo WM Volgens mij kan RevenueParticipantsCSVHelper dan helemaal weg cq opgeschoond worden, toch?
//        if ($projectRevenue->confirmed) {
//            $projectRevenue = new RevenueDistributionCSVHelper($projectRevenue->distribution);
//        } else {
//            $projectRevenue = new RevenueParticipantsCSVHelper($projectRevenue->project->participantsProject, $projectRevenue);
//        }
            $projectRevenue = new RevenueDistributionCSVHelper($projectRevenue->distribution, $projectRevenue->project->project_type_id);


        return $projectRevenue->downloadCSV();
    }

    public function getRevenueDistribution(ProjectRevenue $projectRevenue, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distribution = $projectRevenue->distribution()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionIdsTotal = $projectRevenue->distribution()->pluck('id')->toArray();
        $total = $projectRevenue->distribution()->count();

        return FullProjectRevenueDistribution::collection($distribution)
            ->additional(['meta' => [
                'total' => $total,
                'distributionIdsTotal' => $distributionIdsTotal,
            ]
            ]);

    }

    public function store(RequestInput $requestInput)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $data = $requestInput
            ->integer('categoryId')->validate('required|exists:project_revenue_category,id')->alias('category_id')->next()
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->integer('projectId')->validate('required|exists:projects,id')->alias('project_id')->next()
            ->integer('participationId')->validate('nullable|exists:participation_project,id')->onEmpty(null)->alias('participation_id')->next()
            ->integer('contactEnergySupplierId')->validate('nullable|exists:contact_energy_supplier,id')->onEmpty(null)->alias('contact_energy_supplier_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateReference')->validate('required|date')->alias('date_reference')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndCalendarYearHigh')->alias('kwh_end_calendar_year_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->integer('kwhEndCalendarYearLow')->alias('kwh_end_calendar_year_low')->onEmpty(null)->next()
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')->alias('date_payed')->whenMissing(null)->onEmpty(null)->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->double('payAmount')->onEmpty(null)->alias('pay_amount')->next()
            ->double('keyAmountFirstPercentage')->onEmpty(null)->alias('key_amount_first_percentage')->next()
            ->double('payPercentageValidFromKeyAmount')->onEmpty(null)->alias('pay_percentage_valid_from_key_amount')->next()
            ->integer('typeId')->validate('nullable|exists:project_revenue_type,id')->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->integer('payoutTypeId')->onEmpty(null)->alias('payout_type_id')->next()
            ->get();

        $projectRevenue = new ProjectRevenue();

        $projectRevenue->fill($data);

        $projectRevenue->save();

        $this->saveParticipantsOfDistribution($projectRevenue, false);

//                ->where(function ($query) use($projectRevenue) {
//                    $query->where('date_end', '>=', $projectRevenue->date_begin)
//                        ->orwhere('date_end', '>=', $projectRevenue->date_begin)
//                    });

        if ($projectRevenue->confirmed) {
            $projectRevenue->load('distribution');
        }

        $projectRevenue->load('createdBy', 'project');

        return FullProjectRevenue::make($projectRevenue);
    }


    public function update(
        RequestInput $requestInput,
        ProjectRevenue $projectRevenue
    )
    {
        $this->authorize('manage', ProjectRevenue::class);

        $data = $requestInput
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->boolean('confirmed')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateReference')->validate('required|date')->alias('date_reference')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->integer('kwhStart')->alias('kwh_start')->onEmpty(null)->next()
            ->integer('kwhEnd')->alias('kwh_end')->onEmpty(null)->next()
            ->integer('kwhStartHigh')->alias('kwh_start_high')->onEmpty(null)->next()
            ->integer('kwhEndCalendarYearHigh')->alias('kwh_end_calendar_year_high')->onEmpty(null)->next()
            ->integer('kwhEndHigh')->alias('kwh_end_high')->onEmpty(null)->next()
            ->integer('kwhStartLow')->alias('kwh_start_low')->onEmpty(null)->next()
            ->integer('kwhEndCalendarYearLow')->alias('kwh_end_calendar_year_low')->onEmpty(null)->next()
            ->integer('kwhEndLow')->alias('kwh_end_low')->onEmpty(null)->next()
            ->double('revenue')->onEmpty(null)->next()
            ->string('datePayed')->validate('nullable|date')->onEmpty(null)->whenMissing(null)->alias('date_payed')->next()
            ->double('payPercentage')->onEmpty(null)->alias('pay_percentage')->next()
            ->double('payAmount')->onEmpty(null)->alias('pay_amount')->next()
            ->double('keyAmountFirstPercentage')->onEmpty(null)->alias('key_amount_first_percentage')->next()
            ->double('payPercentageValidFromKeyAmount')->onEmpty(null)->alias('pay_percentage_valid_from_key_amount')->next()
            ->integer('typeId')->validate('nullable|exists:project_revenue_type,id')->onEmpty(null)->alias('type_id')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->integer('payoutTypeId')->onEmpty(null)->alias('payout_type_id')->next()
            ->get();

        $projectRevenue->fill($data);

        $projectRevenueConfirmedIsDirty = false;
        if($projectRevenue->isDirty('confirmed')){
            $projectRevenueConfirmedIsDirty = true;
        }

        $recalculateDistribution = false;
        if($projectRevenue->isDirty('date_begin') ||
            $projectRevenue->isDirty('date_end') ||
            $projectRevenue->isDirty('date_reference') ||
            $projectRevenue->isDirty('kwh_start') ||
            $projectRevenue->isDirty('kwh_end') ||
            $projectRevenue->isDirty('payout_kwh') ||
            $projectRevenue->isDirty('pay_percentage') ||
            $projectRevenue->isDirty('pay_amount') ||
            $projectRevenue->isDirty('key_amount_first_percentage') ||
            $projectRevenue->isDirty('pay_percentage_valid_from_key_amount') ||
            $projectRevenue->isDirty('distribution_type_id') ||
            $projectRevenueConfirmedIsDirty) {
            $recalculateDistribution = true;
        }

        // If period is changed then remove all values from revenue distribution period
        if($projectRevenue->category->code_ref != 'revenueKwhSplit') {
            if ($projectRevenue->isDirty('date_begin') ||
                $projectRevenue->isDirty('date_end')) {
                $projectRevenue->deliveredKwhPeriod()->delete();
            }
        }
        $projectRevenue->save();

        if($recalculateDistribution) $this->saveParticipantsOfDistribution($projectRevenue, false);

        if($projectRevenueConfirmedIsDirty &&
            $projectRevenue->confirmed
        ) {
            if($projectRevenue->category->code_ref == 'revenueKwh'){
                $projectRevenueCategory = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first();
                $listSplitedParticipationIds = ProjectRevenue::where('project_id', $projectRevenue->project_id)
                    ->whereNotNull('participation_id')
                    ->where('category_id', $projectRevenueCategory->id)
                    ->where('date_end', '>=', $projectRevenue->date_begin)
                    ->where('date_end', '<', $projectRevenue->date_end)
                    ->where('confirmed', true)
                    ->orderBy('date_end', 'desc')->get()->pluck('participation_id')->toArray();

                foreach ($listSplitedParticipationIds as $participationId){
                    $projectRevenueCategory = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first();
                    $projectRevenuesKhwSplit = ProjectRevenue::where('project_id', $projectRevenue->project_id)
                        ->where('participation_id', $participationId)
                        ->where('category_id', $projectRevenueCategory->id)
                        ->where('date_end', '>=', $projectRevenue->date_begin)
                        ->where('date_end', '<', $projectRevenue->date_end)
                        ->where('confirmed', true)
                        ->orderBy('date_end', 'desc');
                    // revenue khw split present, then make closing revenue khw splits
                    if ($projectRevenuesKhwSplit->exists()) {
                        $lastProjectRevenueKhwSplit = $projectRevenuesKhwSplit->first();
                        if ($lastProjectRevenueKhwSplit && $lastProjectRevenueKhwSplit->date_end != $projectRevenue->date_end){

                            $contactEnergySupplier = $lastProjectRevenueKhwSplit->participant->contact->primaryContactEnergySupplier;
                            $closingReveneuKhwSplit = new ProjectRevenue();
                            $closingReveneuKhwSplit->category_id = $lastProjectRevenueKhwSplit->category_id;
                            $closingReveneuKhwSplit->project_id = $lastProjectRevenueKhwSplit->project_id;
                            $closingReveneuKhwSplit->participation_id = $lastProjectRevenueKhwSplit->participation_id;
                            $closingReveneuKhwSplit->contact_energy_supplier_id = $contactEnergySupplier->id;
                            $closingReveneuKhwSplit->distribution_type_id = $lastProjectRevenueKhwSplit->distribution_type_id;
                            $closingReveneuKhwSplit->confirmed = true;
                            $closingReveneuKhwSplit->date_begin = Carbon::parse($lastProjectRevenueKhwSplit->date_end)->addDay();
                            $closingReveneuKhwSplit->date_end = Carbon::parse($projectRevenue->date_end);
                            $closingReveneuKhwSplit->date_reference = Carbon::parse($projectRevenue->date_reference);
                            $closingReveneuKhwSplit->date_confirmed = Carbon::parse($projectRevenue->date_confirmed);
                            $closingReveneuKhwSplit->kwh_start = $lastProjectRevenueKhwSplit->kwh_end;
                            $closingReveneuKhwSplit->kwh_end = $projectRevenue->kwh_end;
                            $closingReveneuKhwSplit->kwh_start_high = $lastProjectRevenueKhwSplit->kwh_end_high;
                            $closingReveneuKhwSplit->kwh_end_high = $projectRevenue->kwh_end_high;
                            $closingReveneuKhwSplit->kwh_start_low = $lastProjectRevenueKhwSplit->kwh_end_low;
                            $closingReveneuKhwSplit->kwh_end_low = $projectRevenue->kwh_end_low;
                            $closingReveneuKhwSplit->payout_kwh = $projectRevenue->payout_kwh;

                            $closingReveneuKhwSplit->save();
                            $this->saveParticipantsOfDistribution($closingReveneuKhwSplit, true);
                        }
                    }
                }
            }
            if($projectRevenue->category->code_ref == 'revenueKwhSplit'){
                $projectRevenueCategory = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first();
                $projectRevenuesKhw = ProjectRevenue::where('project_id', $projectRevenue->project_id)
                    ->whereNull('participation_id')
                    ->where('category_id', $projectRevenueCategory->id)
                    ->where('date_begin', '<=', $projectRevenue->date_begin)
                    ->where('date_end', '>', $projectRevenue->date_begin)
                    ->where('confirmed', true)
                    ->orderBy('date_end', 'desc');

                // revenue khw present, then make closing revenue khw splits
                if ($projectRevenuesKhw->exists()) {
                    $projectRevenueKhw = $projectRevenuesKhw->first();
                    if ($projectRevenueKhw && $projectRevenueKhw->date_end != $projectRevenue->date_end){

                        $contactEnergySupplier = $projectRevenue->participant->contact->primaryContactEnergySupplier;
                        $closingReveneuKhwSplit = new ProjectRevenue();
                        $closingReveneuKhwSplit->category_id = $projectRevenue->category_id;
                        $closingReveneuKhwSplit->project_id = $projectRevenue->project_id;
                        $closingReveneuKhwSplit->participation_id = $projectRevenue->participation_id;
                        $closingReveneuKhwSplit->contact_energy_supplier_id = $contactEnergySupplier->id;
                        $closingReveneuKhwSplit->distribution_type_id = $projectRevenue->distribution_type_id;
                        $closingReveneuKhwSplit->confirmed = true;
                        $closingReveneuKhwSplit->date_begin = Carbon::parse($projectRevenue->date_end)->addDay();
                        $closingReveneuKhwSplit->date_end = Carbon::parse($projectRevenueKhw->date_end);
                        $closingReveneuKhwSplit->date_reference = Carbon::parse($projectRevenue->date_reference);
                        $closingReveneuKhwSplit->date_confirmed = Carbon::parse($projectRevenue->date_confirmed);
                        $closingReveneuKhwSplit->kwh_start = $projectRevenue->kwh_end;
                        $closingReveneuKhwSplit->kwh_end = $projectRevenueKhw->kwh_end;
                        $closingReveneuKhwSplit->kwh_start_high = $projectRevenue->kwh_end_high;
                        $closingReveneuKhwSplit->kwh_end_high = $projectRevenueKhw->kwh_end_high;
                        $closingReveneuKhwSplit->kwh_start_low = $projectRevenue->kwh_end_low;
                        $closingReveneuKhwSplit->kwh_end_low = $projectRevenueKhw->kwh_end_low;
                        $closingReveneuKhwSplit->payout_kwh = $projectRevenue->payout_kwh;

                        $closingReveneuKhwSplit->save();
                        $this->saveParticipantsOfDistribution($closingReveneuKhwSplit, true);

                    }
                }
            }

        }

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveParticipantsOfDistribution(ProjectRevenue $projectRevenue, $closing)
    {
        set_time_limit(300);
        $project = $projectRevenue->project;

        if($projectRevenue->category->code_ref == 'revenueKwhSplit') {

            $projectRevenueKhwCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first()->id;
            $projectRevenueKhwSplitCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first()->id;

            if(!$closing) {
                // Calculate total kwh
                $totalKwh = $projectRevenue->kwh_end - $projectRevenue->kwh_start;

                // Calculate total kwh end calendar year
                $kwhEndCalendarYear = $projectRevenue->kwh_end_calendar_year_high + $projectRevenue->kwh_end_calendar_year_low;
                $totalKwhEndCalendarYear = 0;
                $totalKwhRest = 0;
                if ($kwhEndCalendarYear > 0) {
                    $totalKwhEndCalendarYear = $kwhEndCalendarYear - $projectRevenue->kwh_start;
                    $totalKwhRest = $totalKwh - $totalKwhEndCalendarYear;
                }
                $totalSumOfParticipationsAndDays = 0;
                $totalDeliveredKwhPeriodThisParticipant = 0;
                $quantityOfParticipationsThisParticipant = 0;
                $totalSumOfParticipationsAndDaysEndCalendarYear = 0;
                $totalDeliveredKwhPeriodThisParticipantEndCalendarYear = 0;
                $quantityOfParticipationsThisParticipantEndCalendarYear = 0;
                $totalDeliveredKwhPeriodThisParticipantRest = 0;
                $totalSumOfParticipationsAndDaysRest = 0;

                foreach ($project->participantsProject as $participant) {

                    $projectRevenuesKhw = ProjectRevenue::where('project_id', $projectRevenue->project_id)
                        ->whereNull('participation_id')
                        ->where('category_id', $projectRevenueKhwCategoryId)
                        ->where('date_begin', '<=', $projectRevenue->date_begin)
                        ->where('date_end', '>', $projectRevenue->date_begin)
                        ->where('confirmed', true)
                        ->orderBy('date_end', 'desc');
                    if ($projectRevenuesKhw->exists()) {
                        $projectRevenueKhw = $projectRevenuesKhw->first();
                        $participantInDistribution = ProjectRevenueDistribution::where('revenue_id', $projectRevenueKhw->id)
                            ->where('participation_id', $participant->id)
                            ->whereIn('status', ['confirmed'])
                            ->exists();
                        if (!$participantInDistribution) {
                            continue;
                        }
                    }

                    $result = $this->determineTotalDistribution($projectRevenue, $participant);
                    $totalDeliveredKwhPeriod = $result['totalDeliveredKwhPeriod'];
                    $quantityOfParticipations = $result['quantityOfParticipations'];
                    if ($kwhEndCalendarYear > 0) {
                        $totalDeliveredKwhPeriodEndCalendarYear = $result['totalDeliveredKwhPeriodEndCalendarYear'];
                        $quantityOfParticipationsEndCalendarYear = $result['quantityOfParticipationsEndCalendarYear'];
                        $totalDeliveredKwhPeriodRest = $totalDeliveredKwhPeriod - $totalDeliveredKwhPeriodEndCalendarYear;
                    }

                    if ($participant->id == $projectRevenue->participant->id) {
                        $totalDeliveredKwhPeriodThisParticipant = $totalDeliveredKwhPeriod;
                        $quantityOfParticipationsThisParticipant = $quantityOfParticipations;
                        if ($kwhEndCalendarYear > 0) {
                            $totalDeliveredKwhPeriodThisParticipantEndCalendarYear = $totalDeliveredKwhPeriodEndCalendarYear;
                            $quantityOfParticipationsThisParticipantEndCalendarYear = $quantityOfParticipationsEndCalendarYear;
                            $totalDeliveredKwhPeriodThisParticipantRest = $totalDeliveredKwhPeriodRest;
                        }
                    }

                    $totalSumOfParticipationsAndDays = $totalSumOfParticipationsAndDays + $totalDeliveredKwhPeriod;
                    if ($kwhEndCalendarYear > 0) {
                        $totalSumOfParticipationsAndDaysEndCalendarYear = $totalSumOfParticipationsAndDaysEndCalendarYear + $totalDeliveredKwhPeriodEndCalendarYear;
                    }
                }

                if ($kwhEndCalendarYear > 0) {
                    $totalSumOfParticipationsAndDaysRest = $totalSumOfParticipationsAndDays - $totalSumOfParticipationsAndDaysEndCalendarYear;
                }

                // Save returns per Kwh period
                $deliveredKwh = 0;
                $deliveredKwhEndCalendarYear = 0;
                $deliveredKwhRest = 0;

                if ($kwhEndCalendarYear > 0) {
                    // Save returns per Kwh period
                    if ($totalSumOfParticipationsAndDaysEndCalendarYear != 0) {
                        $deliveredKwhEndCalendarYear = round(($totalKwhEndCalendarYear / $totalSumOfParticipationsAndDaysEndCalendarYear) * $totalDeliveredKwhPeriodThisParticipantEndCalendarYear, 2);
                        if ($totalSumOfParticipationsAndDaysRest != 0) {
                            $deliveredKwhRest = round(($totalKwhRest / $totalSumOfParticipationsAndDaysRest) * $totalDeliveredKwhPeriodThisParticipantRest, 2);
                        }
                        $deliveredKwh = $deliveredKwhEndCalendarYear + $deliveredKwhRest;
                    }
                } else {
                    if ($totalSumOfParticipationsAndDays != 0) {
                        $deliveredKwh = round(($totalKwh / $totalSumOfParticipationsAndDays) * $totalDeliveredKwhPeriodThisParticipant, 2);
                    }
                }

                $distribution = $this->saveDistribution($projectRevenue, $projectRevenue->participant, $closing);
            }

            if($closing){

                $projectRevenuesKhw = ProjectRevenue::where('project_id', $projectRevenue->project_id)
                    ->whereNull('participation_id')
                    ->where('category_id', $projectRevenueKhwCategoryId)
                    ->where('date_begin', '<=', $projectRevenue->date_begin)
                    ->where('date_end', '>', $projectRevenue->date_begin)
                    ->where('confirmed', true)
                    ->orderBy('date_end', 'desc');
                if ($projectRevenuesKhw->exists()) {
                    $projectRevenueKhw = $projectRevenuesKhw->first();
                    $projectRevenueKhwDateBegin = $projectRevenueKhw->date_begin;
                    $projectRevenueKhwDateEnd = $projectRevenueKhw->date_end;

                    $distributionProjectRevenueKhw = ProjectRevenueDistribution::where('participation_id', $projectRevenue->participation_id)
                        ->where('revenue_id', $projectRevenueKhw->id)
                        ->first();
                    if($distributionProjectRevenueKhw){
                        $distributionProjectRevenueKhw->delivered_total_last_es = 0;
                        $distributionProjectRevenueKhw->delivered_total_last_es_end_calendar_year = 0;
                    }

                    $distribution = $this->saveDistribution($projectRevenue, $projectRevenue->participant, $closing);

                    $distributionsParticipation = ProjectRevenueDistribution::where('participation_id', $projectRevenue->participation_id)
//                        ->where('id', '!=', $distribution->id)
                        ->whereHas('revenue', function ($q) use($projectRevenueKhwCategoryId, $projectRevenueKhwSplitCategoryId, $projectRevenueKhwDateBegin, $projectRevenueKhwDateEnd){
                            $q->whereIn('project_revenues.category_id', [$projectRevenueKhwCategoryId, $projectRevenueKhwSplitCategoryId ])
                                ->where('date_begin', '>=', $projectRevenueKhwDateBegin)
                                ->where('date_end', '<=', $projectRevenueKhwDateEnd)
                                ->where('confirmed', true)
                                ->orderBy('date_end', 'desc');
                        });

                    foreach ($distributionsParticipation->get() as $distributionParticipation) {
                        if($distributionParticipation->revenue->participation_id == null){
                            $distribution->delivered_total += $distributionParticipation->delivered_total;
                            $distribution->delivered_total_end_calendar_year += $distributionParticipation->delivered_total_end_calendar_year;
                            $distribution->participations_amount = $distributionParticipation->participations_amount;
                            $distribution->participations_amount_end_calendar_year = $distributionParticipation->participations_amount_end_calendar_year;
                            if($distributionProjectRevenueKhw && $distributionProjectRevenueKhw->es_id == $distributionParticipation->es_id) {
                                $distributionProjectRevenueKhw->delivered_total_last_es += $distributionParticipation->delivered_total;
                            }
                        }else{
                            $distribution->delivered_total -= $distributionParticipation->delivered_total;
                            $distribution->delivered_total_end_calendar_year -= $distributionParticipation->delivered_total_end_calendar_year;
                            if($distributionProjectRevenueKhw && $distributionProjectRevenueKhw->es_id != $distributionParticipation->es_id) {
                                $distributionProjectRevenueKhw->delivered_total_last_es -= $distributionParticipation->delivered_total;
                            }
                        }
                    }

                    if($distributionProjectRevenueKhw
                        && $distributionProjectRevenueKhw->delivered_total_last_es != 0
                        && $distributionProjectRevenueKhw->delivered_total != 0
                        && $distributionProjectRevenueKhw->delivered_total_end_calendar_year != 0
                        && $distributionProjectRevenueKhw->delivered_total != $distributionProjectRevenueKhw->delivered_total_end_calendar_year) {
                        $engerySupplierFactor = $distributionProjectRevenueKhw->delivered_total_last_es / $distributionProjectRevenueKhw->delivered_total;
                        $deliveredTotalLastEsEndCalendarYear = round($distributionProjectRevenueKhw->delivered_total_end_calendar_year * $engerySupplierFactor, 2);

                        $distributionProjectRevenueKhw->delivered_total_last_es_end_calendar_year = $deliveredTotalLastEsEndCalendarYear;
                        $distributionProjectRevenueKhw->date_begin_last_es = $projectRevenue->date_begin;
                        $distributionProjectRevenueKhw->save();
                    }
                }
            }else{
                $distribution->delivered_total = $deliveredKwh;
                $distribution->delivered_total_end_calendar_year = $deliveredKwhEndCalendarYear;
                $distribution->participations_amount = $quantityOfParticipationsThisParticipant;
                $distribution->participations_amount_end_calendar_year = $quantityOfParticipationsThisParticipantEndCalendarYear;
            }
            $distribution->payout_kwh = $projectRevenue->payout_kwh;
            $distribution->save();

        }else {
            if ($projectRevenue->category->code_ref == 'revenueKwh') {
                $participants = $project->participantsProject;
            } else {
                $participants = $project->participantsProjectDefinitive;
            }
            foreach ($participants as $participant) {
                $this->saveDistribution($projectRevenue, $participant, $closing);
            }
        }

        $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
        if($projectRevenue->category->code_ref == 'revenueEuro'
            && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital')) {
            foreach($projectRevenue->distribution as $distribution) {
                $distribution->calculator()->runRevenueCapitalResult();
                $distribution->save();
            }
            foreach($projectRevenue->distribution as $distribution) {
                if($distribution->payout == 0)
                {
                    $distribution->forceDelete();
                }
            }
        }

        if($projectRevenue->category->code_ref == 'redemptionEuro'
            && ($projectTypeCodeRef === 'loan' || $projectTypeCodeRef === 'obligation')) {
            foreach($projectRevenue->distribution as $distribution) {
                $distribution->calculator()->runRevenueEuro();
                $distribution->save();
            }
            foreach($projectRevenue->distribution as $distribution) {
                if($distribution->payout == 0)
                {
                    $distribution->forceDelete();
                }
            }
        }

        if($projectRevenue->category->code_ref == 'revenueKwh' || $projectRevenue->category->code_ref == 'revenueKwhSplit') {
            foreach($projectRevenue->distribution as $distribution) {
                $distribution->calculator()->runRevenueKwh();
                $distribution->save();
            }
        }

    }

    public function determineTotalDistribution(ProjectRevenue $projectRevenue, ParticipantProject $participant)
    {
        $dateBeginFromRevenue = Carbon::parse($projectRevenue->date_begin);
        $dateEndFromRevenue = Carbon::parse($projectRevenue->date_end);
        $dateEndCalendarYearFromRevenue = Carbon::parse($projectRevenue->date_begin)->endOfYear();

        if (!$dateBeginFromRevenue || !$dateEndFromRevenue) return 0;

        $quantityOfParticipations = 0;
        $totalDeliveredKwhPeriod = 0;
        $quantityOfParticipationsEndCalendarYear = 0;
        $totalDeliveredKwhPeriodEndCalendarYear = 0;

        $mutations = $participant->mutationsDefinitiveForKhwPeriod;
        foreach ($mutations as $index => $mutation) {
            $dateBegin = $dateBeginFromRevenue;
            $dateEnd = $dateEndFromRevenue;

            $nextMutation = $mutations->get(++$index);

            if($nextMutation) {
                $dateEnd = Carbon::parse($nextMutation->date_entry)->subDay();
            }

            if($dateEnd > $dateEndFromRevenue) {
                $dateEnd = clone $dateEndFromRevenue;
            }

            $dateEntry = Carbon::parse($mutation->date_entry);

            // If date entry is after date begin then date begin is equal to date entry
            if($dateEntry > $dateBegin) $dateBegin = $dateEntry;

            $dateEndForPeriod = clone $dateEnd;
            $dateEndCalendarYearFromRevenueForPeriod = clone $dateEndCalendarYearFromRevenue;

            if($dateBegin >= $dateBeginFromRevenue && $dateBegin <= $dateEndFromRevenue){
                $quantityOfParticipations += $mutation->quantity;
            }

            if($dateEnd >= $dateBegin){
                $kwhEndCalendarYear = ($projectRevenue->kwh_end_calendar_year_high ? $projectRevenue->kwh_end_calendar_year_high : 0) + ($projectRevenue->kwh_end_calendar_year_low ? $projectRevenue->kwh_end_calendar_year_low : 0);
                $dateEndForCheck = clone $dateEnd;
                $dateEndForCheck->endOfDay();
                if( $kwhEndCalendarYear > 0
                    && $dateBegin < $dateEndCalendarYearFromRevenue
                    && $dateEndForCheck >= $dateEndCalendarYearFromRevenue ) {
                    $daysOfPeriod = $dateEndCalendarYearFromRevenueForPeriod->addDay()->diffInDays($dateBegin);

                    $deliveredKwhPeriod = $daysOfPeriod * $quantityOfParticipations;
                    $totalDeliveredKwhPeriod += $deliveredKwhPeriod;

                    $quantityOfParticipationsEndCalendarYear = $quantityOfParticipations;
                    $totalDeliveredKwhPeriodEndCalendarYear = $totalDeliveredKwhPeriod;

                    $dateBegin = $dateEndCalendarYearFromRevenue->copy()->addDay();

                }
                $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);
                $deliveredKwhPeriod = $daysOfPeriod * $quantityOfParticipations;
                $totalDeliveredKwhPeriod += $deliveredKwhPeriod;
            }
        }

        $returnParm['quantityOfParticipations'] = $quantityOfParticipations;
        $returnParm['totalDeliveredKwhPeriod'] = $totalDeliveredKwhPeriod;
        $returnParm['quantityOfParticipationsEndCalendarYear'] = $quantityOfParticipationsEndCalendarYear;
        $returnParm['totalDeliveredKwhPeriodEndCalendarYear'] = $totalDeliveredKwhPeriodEndCalendarYear;
        return $returnParm;
    }

    public function saveDistribution(ProjectRevenue $projectRevenue, ParticipantProject $participant, $closing)
    {
        $contact = Contact::find($participant->contact_id);
        $primaryAddress = $contact->primaryAddress;

        if($projectRevenue->category->code_ref == 'revenueKwhSplit' && !$closing) {
            $contactEnergySupplier
                = ContactEnergySupplier::find($contact->previous_contact_energy_supplier_id);
        }else{
            $contactEnergySupplier
                = $contact->primaryContactEnergySupplier;
        }

        // If participant already is added to project revenue distribution then update
        if(ProjectRevenueDistribution::where('revenue_id', $projectRevenue->id)->where('participation_id', $participant->id)->exists()) {
            $distribution = ProjectRevenueDistribution::where('revenue_id', $projectRevenue->id)->where('participation_id', $participant->id)->first();
        } else {
            $distribution = new ProjectRevenueDistribution();
        }

        $distribution->revenue_id
            = $projectRevenue->id;
        $distribution->contact_id = $contact->id;

        if($projectRevenue->confirmed) {
            if($projectRevenue->category->code_ref == 'revenueKwhSplit') {
                $distribution->status = 'processed';
            } else {
                $distribution->status = 'confirmed';
            }
        } else {
            $distribution->status = 'concept';
        }

        if ($primaryAddress) {
            $distribution->street = $primaryAddress->street;
            $distribution->street_number = $primaryAddress->number;
            $distribution->street_number_addition = $primaryAddress->addition;
            $distribution->address = $primaryAddress->present()
                ->streetAndNumber();
            $distribution->postal_code = $primaryAddress->postal_code;
            $distribution->city = $primaryAddress->city;
            $distribution->country = $primaryAddress->country_id ? $primaryAddress->country->name : '';

        }

        if($projectRevenue->participantProjectPayoutType) {
            $distribution->payout_type_id = $projectRevenue->participantProjectPayoutType->id;
            $distribution->payout_type = $projectRevenue->participantProjectPayoutType->name;
        }elseif($participant->participantProjectPayoutType){
            $distribution->payout_type_id = $participant->participantProjectPayoutType->id;
            $distribution->payout_type = $participant->participantProjectPayoutType->name;
        }else{
            $distribution->payout_type_id = null;
            $distribution->payout_type = '';
        }

        if ($contactEnergySupplier) {
            $distribution->energy_supplier_name
                = $contactEnergySupplier->energySupplier->name;

            $distribution->es_id
                = $contactEnergySupplier->energySupplier->id;

            $distribution->energy_supplier_ean_electricity
                = $contactEnergySupplier->ean_electricity;

            $distribution->energy_supplier_number
                = $contactEnergySupplier->es_number;
        }

        $distribution->participation_id = $participant->id;
        $distribution->save();

        if($projectRevenue->category->code_ref == 'revenueKwh') {
            $this->saveDeliveredKwhPeriod($distribution);
            return;
        }
        if($projectRevenue->category->code_ref == 'revenueKwhSplit') {
            return $distribution;
        }

        if($projectRevenue->category->code_ref == 'revenueEuro' || $projectRevenue->category->code_ref == 'redemptionEuro') {
            // Recalculate values of distribution after saving
            $distribution->calculator()->runRevenueEuro();
            $distribution->save();
        }
    }

    public function saveDeliveredKwhPeriod(ProjectRevenueDistribution $distribution)
    {
        $distributionId = $distribution->id;
        $revenue = $distribution->revenue;

        $dateBeginFromRevenue = Carbon::parse($revenue->date_begin);
        $dateEndFromRevenue = Carbon::parse($revenue->date_end);
        $dateEndCalendarYearFromRevenue = Carbon::parse($revenue->date_begin)->endOfYear();

        if (!$dateBeginFromRevenue || !$dateEndFromRevenue) return 0;

        $quantityOfParticipations = 0;

        $mutations = $distribution->participation->mutationsDefinitiveForKhwPeriod;
        foreach ($mutations as $index => $mutation) {
            $dateBegin = $dateBeginFromRevenue;
            $dateEnd = $dateEndFromRevenue;

            $nextMutation = $mutations->get(++$index);

            if($nextMutation) {
                $dateEnd = Carbon::parse($nextMutation->date_entry)->subDay();
            }

            if($dateEnd > $dateEndFromRevenue) {
                $dateEnd = clone $dateEndFromRevenue;
            }

            $dateEntry = Carbon::parse($mutation->date_entry);

            // If date entry is after date begin then date begin is equal to date entry
            if($dateEntry > $dateBegin) $dateBegin = $dateEntry;

            $dateEndForPeriod = clone $dateEnd;
            $dateEndCalendarYearFromRevenueForPeriod = clone $dateEndCalendarYearFromRevenue;
            if($dateBegin >= $dateBeginFromRevenue && $dateBegin <= $dateEndFromRevenue){
                $quantityOfParticipations += $mutation->quantity;
            }

            if($dateEnd >= $dateBegin) {

                $kwhEndCalendarYear = ($revenue->kwh_end_calendar_year_high ? $revenue->kwh_end_calendar_year_high : 0) + ($revenue->kwh_end_calendar_year_low ? $revenue->kwh_end_calendar_year_low : 0);
                $dateEndForCheck = clone $dateEnd;
                $dateEndForCheck->endOfDay();
                if ( $kwhEndCalendarYear > 0
                    && $dateBegin < $dateEndCalendarYearFromRevenue
                    && $dateEndForCheck >= $dateEndCalendarYearFromRevenue ) {
                    $daysOfPeriod = $dateEndCalendarYearFromRevenueForPeriod->addDay()->diffInDays($dateBegin);

                    $deliveredKwhPeriod = ProjectRevenueDeliveredKwhPeriod::updateOrCreate(
                        [
                            'distribution_id' => $distributionId,
                            'revenue_id' => $revenue->id,
                            'date_begin' => $dateBegin
                        ],
                        [
                            'date_end' => $dateEndCalendarYearFromRevenue,
                            'days_of_period' => $daysOfPeriod,
                            'participations_quantity' => $quantityOfParticipations
                        ]
                    );
                    $deliveredKwhPeriod->save();

                    $dateBegin = $dateEndCalendarYearFromRevenue->copy()->addDay();
                }

                $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);

                $deliveredKwhPeriod = ProjectRevenueDeliveredKwhPeriod::updateOrCreate(
                    [
                        'distribution_id' => $distributionId,
                        'revenue_id' => $revenue->id,
                        'date_begin' => $dateBegin
                    ],
                    [
                        'date_end' => $dateEnd,
                        'days_of_period' => $daysOfPeriod,
                        'participations_quantity' => $quantityOfParticipations
                    ]
                );
                $deliveredKwhPeriod->save();
            }
        }
    }

    public function createEnergySupplierReport(
        Request $request,
        ProjectRevenue $projectRevenue,
        DocumentTemplate $documentTemplate
    )
    {
        $documentName = $request->input('documentName');

        //get current logged in user
        $user = Auth::user();

        //load template parts
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body
            : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer
            ? $documentTemplate->footer->html_body : '';

        $project = $projectRevenue->project;

        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($html,
            'opbrengst', $projectRevenue);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'project', $project);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'ik', $user);
        $energySupplierHtml
            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
            'administratie', $project->administration);

        $energySupplierHtml
            = TemplateVariableHelper::stripRemainingVariableTags($energySupplierHtml);

        $pdf = PDF::loadView('documents.generic', [
            'html' => $energySupplierHtml,
        ])->output();

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';
        $document->project_id = $projectRevenue->project->id;

        $document->filename = $documentName . '.pdf';

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/'
            . $document->filename));
        file_put_contents($filePath, $pdf);

        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
            $document->filename, $document->getDocumentGroup()->name);

        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        $document->save();

        //delete file on server, still saved on alfresco.
        Storage::disk('documents')->delete($document->filename);
    }

    public function createEnergySupplierAllExcel(
        Request $request,
        ProjectRevenue $projectRevenue
    )
    {
        $energySupplierIds = array_unique($projectRevenue->distribution()->whereNotNull('es_id')->pluck('es_id')->toArray());
        foreach ($energySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);
            $this->createEnergySupplierExcel($request, $projectRevenue, $energySupplier, true);
        }
    }

    public function createEnergySupplierOneExcel(
        Request $request,
        ProjectRevenue $projectRevenue,
        EnergySupplier $energySupplier
    )
    {
            $this->createEnergySupplierExcel($request, $projectRevenue, $energySupplier, false);
    }

    protected function createEnergySupplierExcel(
        Request $request,
        ProjectRevenue $projectRevenue,
        EnergySupplier $energySupplier,
        $createAll
    )
    {
        switch ($energySupplier->file_format_id){
            case 1:
                $fileFormat = '.xls';
                break;
            default:
                $fileFormat = '.xlsx';
                break;
        }

        $documentName = $request->input('documentName');
        $fileName = $createAll ? ($documentName . '-' . $energySupplier->abbreviation . $fileFormat) : $documentName . $fileFormat;
        $templateId = $energySupplier->excel_template_id;

        if ($templateId) {
            set_time_limit(0);
            $excelHelper = new EnergySupplierExcelHelper($energySupplier,
                $projectRevenue, $templateId, $fileName);
            $excel = $excelHelper->getExcel();
        }else{
            abort(412, 'Geen geldige excel template gevonden.');
        }

        $document = new Document();
        $document->document_type = 'internal';
        $document->document_group = 'revenue';
        $document->project_id = $projectRevenue->project->id;

        $document->filename = $fileName;

        $document->save();

        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
            . $document->filename));

        switch ($energySupplier->file_format_id){
            case 1:
                $writer = new Xls($excel);
                break;
            default:
                $writer = new Xlsx($excel);
                break;
        }
        $writer->save($filePath);

//        die("stop hier maar even voor testdoeleinden Excel (behoud file.xlsx in storage/app/documents)");

        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local')
        {
            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));

            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                $document->filename, $document->getDocumentGroup()->name);
            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
        }else{
            $alfrescoResponse = null;
        }

        $document->save();

        //delete file on server, still saved on alfresco.
        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
            Storage::disk('documents')->delete($document->filename);
        }
    }

    public function destroy(ProjectRevenue $projectRevenue)
    {
        $this->authorize('manage', ProjectRevenue::class);

        try {
            DB::beginTransaction();

            $deleteRevenue = new DeleteRevenue($projectRevenue);
            $result = $deleteRevenue->delete();

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

    public function createInvoices(
        $distributions, $datePayout
    )
    {
        set_time_limit(300);

        $createdInvoices = [];
        $payoutTypeAccountId = ParticipantProjectPayoutType::where('code_ref', 'account')->first()->id;
        $payoutTypeCreditId = ParticipantProjectPayoutType::where('code_ref', 'credit')->first()->id;

        if (!($distributions->first())->revenue->project->administration_id) {
            abort(400,
                'Geen administratie gekoppeld aan dit productie project');
        }else{
            $lastYearFinancialOverviewDefinitive =  $distributions->first()->revenue->project->lastYearFinancialOverviewDefinitive;
            if( !empty($lastYearFinancialOverviewDefinitive) && !empty($datePayout) && Carbon::parse($datePayout)->year <= $lastYearFinancialOverviewDefinitive)
            {
                $variableDateText =
                    'redemptionEuro' == $distributions->first()->revenue->category->code_ref  ? 'aflossingsdatum' : 'uitkeringsdatum';
                abort(400,
                    'De ' . $variableDateText . ' valt in jaar ' . Carbon::parse($datePayout)->year . ' waar al een definitive waardestaat voor dit project aanwezig is.');
            }
        }

        foreach ($distributions as $distribution) {
            $projectTypeCodeRef = (ProjectType::where('id', $distribution->revenue->project->project_type_id)->first())->code_ref;

            //status moet nog bevestigd (confirmed zijn)
            if ($distribution->status === 'confirmed')
            {
                // indien Opbrengst Kwh, dan geen voorwaarden inzake adres of IBAN
                if ($distribution->revenue->category->code_ref === 'revenueKwh' || $distribution->revenue->category->code_ref === 'revenueKwhSplit') {
                    $distribution->status = 'in-progress';
                    $distribution->save();
                }else{
                    // indien Opbrengst Euro, dan wel voorwaarden inzake adres of IBAN (afhankellijk van payout type)
                    if ($distribution->payout_type_id === $payoutTypeAccountId
                        && ($distribution->payout > 0)
                        && !(empty($distribution->address)
                            || empty($distribution->postal_code)
                            || empty($distribution->city)
                            || (empty($distribution->participation->iban_payout) && empty($distribution->contact->iban))
                        )
                    )
                    {
                            $distribution->status = 'in-progress';
                        $distribution->save();
                    }
                    if ($distribution->payout_type_id === $payoutTypeCreditId
                        && ($projectTypeCodeRef === 'capital' || $projectTypeCodeRef === 'postalcode_link_capital' || $distribution->payout > 0)
                    ) {
                        $distribution->status = 'in-progress';
                        $distribution->save();
                    }
                }
            }
        }

        foreach ($distributions as $distribution) {
            //todo WM: moet hier ook niet check op mutation allowed inzake definitieve waardestaten?
            //status moet nu onderhanden zijn (in-progress zijn)
            if ($distribution->status === 'in-progress')
            {
                // indien Opbrengst Kwh, dan alleen mutation aanmaken en daarna status op Afgehandeld (processed).
                if ($distribution->revenue->category->code_ref === 'revenueKwh' || $distribution->revenue->category->code_ref === 'revenueKwhSplit') {
                    if($distribution->revenue->category->code_ref == 'revenueKwhSplit') {
                        $contactEnergySupplier
                            = ContactEnergySupplier::find($distribution->contact->previous_contact_energy_supplier_id);
                    }else{
                        $contactEnergySupplier
                            = $distribution->contact->primaryContactEnergySupplier;
                    }
                    if($distribution->revenue->category->code_ref !== 'revenueKwhSplit'){
                        $this->createParticipantMutationForRevenueKwh($distribution, $datePayout, $contactEnergySupplier);
                    }
                    $distribution->status = 'processed';
                    $distribution->save();
                }else{
                    // indien Opbrengst Euro, dan gaan we of notas en sepa aanmaken of bijschrijven (afhankellijk van payout type)
                    if ($distribution->payout_type_id === $payoutTypeAccountId)
                    {
                        $currentYear = Carbon::now()->year;
                        // Haal laatst uitgedeelde uitkeringsnotanummer op (binnen aanmaakjaar)
                        $lastPaymentInvoice = PaymentInvoice::where('administration_id',
                            $distribution->revenue->project->administration_id)->where('invoice_number', '!=', 0)
                            ->whereYear('created_at', '=', $currentYear)->orderBy('invoice_number', 'desc')->first();

                        $newInvoiceNumber = 1;
                        if ($lastPaymentInvoice) {
                            $newInvoiceNumber = ($lastPaymentInvoice->invoice_number + 1);
                        }

                        if (PaymentInvoice::where('administration_id',
                            $distribution->revenue->project->administration_id)
                            ->where('invoice_number', '=', $newInvoiceNumber)
                            ->whereYear('created_at', '=', $currentYear)
                            ->exists()
                        ) {
                            // voor abort status weer even terug zetten naar confirmed (anders blijft ie op "in-progress" hangen).
                            $distribution->status = 'confirmed';
                            $distribution->save();
                            abort(404, "Voor uitkeringsnota met administratie ID "
                                . $distribution->revenue->project->administration_id . " en revenue distribution ID "
                                . $distribution->id . " kon geen nieuw nummer bepaald worden.");
                        } else {
                            $paymentInvoice = new PaymentInvoice();
                            $paymentInvoice->revenue_distribution_id = $distribution->id;
                            $paymentInvoice->administration_id
                                = $distribution->revenue->project->administration_id;
                            $paymentInvoice->invoice_number = $newInvoiceNumber;
                            $paymentInvoice->number = 'U' . Carbon::now()->year . '-' . $newInvoiceNumber;
                            $paymentInvoice->status_id = 'sent';
                            $paymentInvoice->save();
                        }
                        array_push($createdInvoices, $paymentInvoice);
                    }

                    if ($distribution->payout_type_id === $payoutTypeCreditId) {
                        $participantMutation = new ParticipantMutation();
                        $participantMutation->participation_id = $distribution->participation_id;
                        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'result')
                            ->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
                        $participantMutation->status_id = ParticipantMutationStatus::where('code_ref', 'final')
                            ->value('id');
                        $participantMutation->amount = $distribution->payout;
                        $participantMutation->returns = $distribution->payout;
                        $participantMutation->paid_on = 'Bijschrijven';
                        $participantMutation->date_entry = $datePayout;
                        $participantMutation->save();

                        // Recalculate dependent data in participantProject
                        $participantMutation->participation->calculator()->run()->save();

                        // Recalculate dependent data in project
                        $participantMutation->participation->project->calculator()->run()->save();
                    }

                    // Nu kan status op Afgehandeld (processed).
                    $distribution->status = 'processed';
                    $distribution->date_payout = $datePayout;
                    $distribution->save();
                }
            }
        }
        return $createdInvoices;
    }

    public function peekDistributionByIds(Request $request)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distribution = ProjectRevenueDistribution::whereIn('id',
            $ids)->with(['revenue'])->get();

        return FullProjectRevenueDistribution::collection($distribution);
    }

    public function downloadPreview(Request $request, ProjectRevenueDistribution $distribution)
    {
        //get current logged in user
        $user = Auth::user();

        //load template parts
        $documentTemplate = DocumentTemplate::find($request->input('documentTemplateId'));
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';

        if( !( empty($distribution->address)
            || empty($distribution->postal_code)
            || empty($distribution->city) ) ) {

            $contact = $distribution->contact;
            $orderController = new OrderController();
            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $revenue = $distribution->revenue;
            $project = $revenue->project;
            $administration = $project->administration;

            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger',
                    $wettelijkVertegenwoordiger);
            }
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distribution);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenue);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname',
                $distribution->participation);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
                $distribution->participation->mutations);

            $revenueHtml
                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            return $pdf;
        }
        return null;
    }

    public function previewEmail(Request $request, ProjectRevenueDistribution $distribution)
    {
        $subject = $request->input('subject');
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        //load template parts
        $emailTemplate = EmailTemplate::find($request->input('emailTemplateId'));

        if( !( empty($distribution->address)
            || empty($distribution->postal_code)
            || empty($distribution->city) ) ) {

            $contact = $distribution->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenue = $distribution->revenue;
            $project = $revenue->project;
            $administration = $project->administration;

            //Make preview email
            if ($primaryEmailAddress) {
                $mailbox = $this->setMailConfigByDistribution($distribution);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                    $fromName = $mailbox->name;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                    $fromName = \Config::get('mail.from.name');
                }

                $email = Mail::to($primaryEmailAddress->email);
                if (!$subject) {
                    $subject = 'Participant rapportage Econobis';
                }

                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);

                $email->subject = $subject;

                $email->html_body
                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                    . $subject . '</title></head>'
                    . $emailTemplate->html_body . '</html>';

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
                    $contact);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
                    $contact);

                //wettelijk vertegenwoordiger
                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                        ->where('occupation_id', 7)->first()->primaryContact;
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                }

                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distribution);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenue);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distribution->participation);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distribution->participation->mutations);
                $htmlBodyWithContactVariables
                    = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
                    $htmlBodyWithContactVariables);

                return [
                    'from' => $fromEmail,
                    'to' => $primaryEmailAddress->email,
                    'subject' => $subject,
                    'htmlBody' => $htmlBodyWithContactVariables
                ];
            } else {
                return [
                    'from' => 'Geen e-mail bekend.',
                    'to' => 'Geen e-mail bekend.',
                    'subject' => 'Geen e-mail bekend.',
                    'htmlBody' => 'Geen e-mail bekend.'
                ];
            }
        }
        return [
            'from' => 'Geen e-mail bekend.',
            'to' => 'Geen e-mail bekend.',
            'subject' => 'Geen e-mail bekend.',
            'htmlBody' => 'Geen e-mail bekend.'
        ];
    }

    public function createRevenueReport(Request $request)
    {
        set_time_limit(0);
        $distributionIds = $request->input('distributionIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        foreach($distributionIds as $distributionId) {
            CreateRevenueReport::dispatch($distributionId, $subject, $documentTemplateId, $emailTemplateId, Auth::id());
        }

// null voor succesboodschap. todo nog even checken of wat nut was om hier ProjectRevenueDistiibution terug te geven.
//        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
        return null;
    }

    public function createParticipantRevenueReport($subject, $distributionId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
    {
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        $messages = [];

        //load template parts
        $documentTemplate->load('footer', 'baseTemplate', 'header');

        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';

        if ($documentTemplate->baseTemplate) {
            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
                $documentTemplate->html_body, '', '');
        } else {
            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
                '', '');
        }

        $html .= $documentTemplate->footer
            ? $documentTemplate->footer->html_body : '';

        $distribution = ProjectRevenueDistribution::find($distributionId);

        if( !( empty($distribution->address)
            || empty($distribution->postal_code)
            || empty($distribution->city) ) ) {

            $contact = $distribution->contact;
            $orderController = new OrderController();

            $contactInfo = $orderController->getContactInfoForOrder($contact);
            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

            $primaryEmailAddress = $contact->primaryEmailAddress;

            $revenue = $distribution->revenue;
            $project = $revenue->project;
            $administration = $project->administration;

            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);

            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);

            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'portal' );
            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'contacten_portal' );
            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml,'cooperatie' );

            //wettelijk vertegenwoordiger
            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                    ->where('occupation_id', 7)->first()->primaryContact;
                $revenueHtml
                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
            }
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distribution);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenue);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $distribution->participation);
            $revenueHtml
                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties', $distribution->participation->mutations);

            $revenueHtml
                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
            $pdf = PDF::loadView('documents.generic', [
                'html' => $revenueHtml,
            ])->output();

            try
            {
                $time = Carbon::now();

                $document = new Document();
                $document->document_type = 'internal';
                $document->document_group = 'revenue';
                $document->contact_id = $contact->id;
                $document->project_id = $project->id;
                $document->participation_project_id = $distribution->participation_id;
                $document->template_id = $documentTemplate->id;

                $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
                    . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));


                //max length name 25
                $filename = substr($filename, 0, 25);

                $document->filename = $filename
                    . substr($document->getDocumentGroup()->name, 0, 1)
                    . (Document::where('document_group', 'revenue')->count()
                        + 1) . '_' . $time->format('Ymd') . '.pdf';

                $document->save();

                $filePath = (storage_path('app' . DIRECTORY_SEPARATOR
                    . 'documents/' . $document->filename));
                file_put_contents($filePath, $pdf);

                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
                    \Config::get('app.ALFRESCO_COOP_PASSWORD'));

                $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                    $document->filename, $document->getDocumentGroup()->name);
                if($alfrescoResponse == null)
                {
                    throw new \Exception('Fout bij maken rapport document in Alfresco.');
                }
                $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                $document->save();
            }
            catch (\Exception $e) {
                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                Log::error($e->getMessage());
                array_push($messages, 'Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
            }

            //send email
            if ($primaryEmailAddress) {
                try{
                    $mailbox = $this->setMailConfigByDistribution($distribution);
                    if ($mailbox) {
                        $fromEmail = $mailbox->email;
                        $fromName = $mailbox->name;
                    } else {
                        $fromEmail = \Config::get('mail.from.address');
                        $fromName = \Config::get('mail.from.name');
                    }

                    $email = Mail::to($primaryEmailAddress->email);
                    if (!$subject) {
                        $subject = 'Participant rapportage Econobis';
                    }

                    $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);

                    $email->subject = $subject;

                    $email->html_body
                        = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                        . $subject . '</title></head>'
                        . $emailTemplate->html_body . '</html>';

                    $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
                        $contact);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
                        $contact);

                    //wettelijk vertegenwoordiger
                    if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
                        $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
                            ->where('occupation_id', 7)->first()->primaryContact;
                        $htmlBodyWithContactVariables
                            = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
                            'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
                    }

                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distribution);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenue);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distribution->participation);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distribution->participation->mutations);
                    $htmlBodyWithContactVariables
                        = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                    $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
                        $htmlBodyWithContactVariables);

                    $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
                        $htmlBodyWithContactVariables, $document));

                } catch (\Exception $e) {
                    Log::error( 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                    Log::error($e->getMessage());
                    array_push($messages, 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
                }

            } else {
                return [
                    'from' => 'Geen e-mail bekend.',
                    'to' => 'Geen e-mail bekend.',
                    'subject' => 'Geen e-mail bekend.',
                    'htmlBody' => 'Geen e-mail bekend.'
                ];
            }

            //delete file on server, still saved on alfresco.
            Storage::disk('documents')->delete($document->filename);
        }
        if(count($messages) > 0)
        {
            return ['messages' => $messages];
        }
        else
        {
            return null;
        }
    }

    public function createPaymentInvoices(Request $request)
    {
        set_time_limit(0);
        $distributionIds = $request->input('distributionIds');
        $datePayout = $request->input('datePayout');

        CreatePaymentInvoices::dispatch($distributionIds, $datePayout, Auth::id());

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
    }

    protected function createParticipantMutationForRevenueKwh(ProjectRevenueDistribution $distribution, $datePayout, $contactEnergySupplier){
        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $distribution->participation_id;
        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
        $participantMutation->payout_kwh_price = $distribution->payout_kwh;
        $participantMutation->payout_kwh = $distribution->delivered_total;
        $participantMutation->indication_of_restitution_energy_tax = $distribution->KwhReturn;
        $participantMutation->paid_on = $contactEnergySupplier ? $contactEnergySupplier->energySupplier->name : '';
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }

    protected function setMailConfigByDistribution(ProjectRevenueDistribution $distribution)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
        $project = $distribution->revenue->project;

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        // Configuratie instellen als er een mailbox is gevonden
        if ($mailboxToSendFrom) {
            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
        }
        return $mailboxToSendFrom;
    }

    protected function translateToValidCharacterSet($field){

        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }


}