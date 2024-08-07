<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
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
use App\Eco\Project\ProjectType;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Helpers\CSV\RevenueDistributionCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\RequestInput\RequestInput;
use App\Helpers\Settings\PortalSettings;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Resources\ParticipantProject\Templates\ParticipantReportMail;
use App\Http\Resources\Project\FullProjectRevenue;
use App\Http\Resources\Project\FullProjectRevenueDistribution;
use App\Http\Resources\Project\ProjectRevenueDistributionPeek;
use App\Jobs\Revenue\CreatePaymentInvoices;
use App\Jobs\Revenue\CreateRevenueReport;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ProjectRevenueController extends ApiController
{
    public function show(ProjectRevenue $projectRevenue)
    {
        $projectRevenue->load([
            'type',
            'category',
            'participant',
            'project.administration',
            'project.projectType',
            'project.projectLoanType',
            'participantProjectPayoutType',
            'createdBy',
        ]);

        return FullProjectRevenue::make($projectRevenue);
    }

    public function csv(ProjectRevenue $projectRevenue)
    {
        set_time_limit(0);

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

        $distributionIdsTotalToProcess =$projectRevenue->distribution()->where('status', '!=', 'processed')->pluck('id')->toArray();
        $totalToProcess = $projectRevenue->distribution()->where('status', '!=', 'processed')->count();


        return FullProjectRevenueDistribution::collection($distribution)
            ->additional(['meta' => [
                'total' => $total,
                'distributionIdsTotal' => $distributionIdsTotal,
                'totalToProcess' => $totalToProcess,
                'distributionIdsTotalToProcess' => $distributionIdsTotalToProcess,
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
            ->integer('addressEnergySupplierId')->validate('nullable|exists:address_energy_suppliers,id')->onEmpty(null)->alias('address_energy_supplier_id')->next()
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
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

        $this->saveParticipantsOfDistribution($projectRevenue);

        $projectRevenue->load('createdBy', 'project');

        return FullProjectRevenue::make($projectRevenue);
    }
    public function storeForParticipant(RequestInput $requestInput, ParticipantProject $participantProject): void
    {
        $this->authorize('manage', ProjectRevenue::class);

        $projectRevenueCategoryParticipant = ProjectRevenueCategory::where('code_ref', 'revenueParticipant' )->first()->id;

        // confirmed direct op true indien beeindigingsdatum in een opbrengst verdeling zit die ook al definitief is.
        $projectRevenueConfirmed =  $participantProject->projectRevenues()
            ->where('date_begin', '<=', Carbon::parse($participantProject->date_terminated)->format('Y-m-d'))
            ->where('date_end', '>=', Carbon::parse($participantProject->date_terminated)->format('Y-m-d'))
            ->whereNull('project_revenues.participation_id')
            ->where('project_revenues.confirmed', true )
            ->exists();

        $data = $requestInput
            ->integer('categoryId')->alias('category_id')->default($projectRevenueCategoryParticipant)->next()
            ->string('distributionTypeId')->onEmpty(null)->alias('distribution_type_id')->next()
            ->integer('projectId')->alias('project_id')->default($participantProject->project_id)->next()
            ->integer('participationId')->alias('participation_id')->default($participantProject->id)->next()
            ->integer('addressEnergySupplierId')->validate('nullable|exists:address_energy_suppliers,id')->onEmpty(null)->alias('address_energy_supplier_id')->next()
            ->boolean('confirmed')->default($projectRevenueConfirmed)->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
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
        $this->saveParticipantsOfDistribution($projectRevenue);

        return;
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
        // isDirty werkt hier niet goed op boolean veld. Geeft altijd TRUE !?!?
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

        if($projectRevenue->status == 'concept-to-update'){
            $projectRevenue->status = 'concept';
        }
        $projectRevenue->save();

        if($recalculateDistribution) $this->saveParticipantsOfDistribution($projectRevenue);

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveParticipantsOfDistribution(ProjectRevenue $projectRevenue)
    {
        // Alleen participants distributions bijwerken als project revenue nog concept is.
        if($projectRevenue->status != 'concept'){
            return;
        }

        set_time_limit(300);
        $project = $projectRevenue->project;
        $revenueCategory = $projectRevenue->category->code_ref;

        $projectTypeCodeRef = (ProjectType::where('id', $project->project_type_id)->first())->code_ref;

        if($projectRevenue->participant){
            $this->saveDistributions($projectRevenue, $projectRevenue->participant, $projectTypeCodeRef);
        } else {
            foreach ($project->participantsProject as $participant) {
                $this->saveDistributions($projectRevenue, $participant, $projectTypeCodeRef);
            }

            if (in_array($projectTypeCodeRef, ['capital', 'postalcode_link_capital'])) {
                $this->processCapitalDistribution($projectRevenue, $revenueCategory);

            }
            if (in_array($projectTypeCodeRef, ['loan', 'obligation'])) {
                $dateBegin = Carbon::parse($projectRevenue->date_begin)->format('Y-m-d');
                $dateEnd = Carbon::parse($projectRevenue->date_end)->format('Y-m-d');

                $this->processLoanOrDistribution($projectRevenue, $dateBegin, $dateEnd, $revenueCategory);
            }

        }

    }

    public function saveDistributions(ProjectRevenue $projectRevenue, ParticipantProject $participant, $projectTypeCodeRef)
    {
        // binnekomend parm projectTypeCodeRef: 'loan', 'obligation' of 'capital', 'postalcode_link_capital'

//        $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id',  $projectRevenue->project->project_type_id)->first()->id;
//        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        // projectRevenueCategoryCodeRefs: 'revenueEuro', 'revenueParticipant' of 'redemptionEuro'
        $projectRevenueCategoryCodeRef = $projectRevenue->category->code_ref;

        // distributionTypen: 'inPossessionOf' of 'howLongInPossession', default instelling bij projectrevenue.
        $distributionTypeId = $projectRevenue->distribution_type_id;

        $contact = Contact::find($participant->contact_id);
        if($participant->address){
            $participantAddress = $participant->address;
        }else{
            $participantAddress = $participant->contact->primaryAddress;
        }

        $dateBegin = Carbon::parse($projectRevenue->date_begin)->format('Y-m-d');
        $dateEnd = Carbon::parse($projectRevenue->date_end)->format('Y-m-d');
        $dateReference = Carbon::parse($projectRevenue->date_reference)->format('Y-m-d');

        $particpantInRevenue = false;

        // participant gaat mee in revenue indien:
        // Category: revenueParticipant (Opbrengst deelnemer)
        //      participant is beeindigt met beeindiginsdatum in revenue periode!
        //
        if($projectRevenueCategoryCodeRef == 'revenueParticipant') {
            if ($participant->date_terminated != null
                && $participant->date_terminated >= $dateBegin
                && $participant->date_terminated < $dateEnd
            ) {
                $particpantInRevenue = true;
            }
        // Category: revenueEuro (Opbrengst Euro)
        //      participant is niet beeindigt of beeindigt met beeindiginsdatum buiten in revenue periode!
        } elseif($projectRevenueCategoryCodeRef == 'revenueEuro' || $projectRevenueCategoryCodeRef == 'redemptionEuro') {
            if ($participant->date_terminated == null
                || $participant->date_terminated <= $dateBegin
                || $participant->date_terminated > $dateEnd
            ) {
                //      bij $distributionTypeId 'inPossessionOf': heeft eerste inleg datum voor peildatum en (indien beeindigt) beeindiginsdatum na peildatum.
                if ($distributionTypeId == 'inPossessionOf'
                    && $participant->date_register <= $dateReference
                    && ($participant->date_terminated == null || $participant->date_terminated >= $dateReference)
                ) {
                    $particpantInRevenue = true;
                }
                //      bij $distributionTypeId 'howLongInPossession': heeft eerste inleg datum voor einddatum revenue en (indien beeindigt) beeindiginsdatum na begindatum.
                if ($distributionTypeId == 'howLongInPossession'
                    && $participant->date_register <= $dateEnd
                    && ($participant->date_terminated == null || $participant->date_terminated >= $dateBegin)
                ) {
                    $particpantInRevenue = true;
                }
            }
        }

        // If participant already is added to project revenue distribution en $particpantInRevenue is nu false, dan verwijderen, anders bijwerken huidige distribution.
        $distribution = ProjectRevenueDistribution::where('revenue_id', $projectRevenue->id)->where('participation_id', $participant->id)->first();
        if($distribution) {
            if($particpantInRevenue == false){
                $distribution->delete();
                return;
            }
        // If participant not added to project revenue distribution yet and $particpantInRevenue is true, dan nieuw toevoegen.
        } elseif($particpantInRevenue) {
            $distribution = new ProjectRevenueDistribution();
            $distribution->status = 'concept';
        // anders doen we niets
        } else {
            return;
        }

        $distribution->revenue_id
            = $projectRevenue->id;
        $distribution->contact_id = $contact->id;

        if ($participantAddress) {
            $distribution->street = $participantAddress->street;
            $distribution->street_number = $participantAddress->number;
            $distribution->street_number_addition = $participantAddress->addition;
            $distribution->address = $participantAddress->present()
                ->streetAndNumber();
            $distribution->postal_code = $participantAddress->postal_code;
            $distribution->city = $participantAddress->city;
            $distribution->country = $participantAddress->country_id ? $participantAddress->country->name : '';

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

        $addressEnergySupplier = $participantAddress->currentAddressEnergySupplierElectricity;
        if ($addressEnergySupplier) {
            $distribution->energy_supplier_name
                = $addressEnergySupplier->energySupplier->name;

            $distribution->es_id
                = $addressEnergySupplier->energySupplier->id;

            $distribution->energy_supplier_ean_electricity
                = $addressEnergySupplier->address->ean_electricity;

            $distribution->energy_supplier_number
                = $addressEnergySupplier->es_number;
        }

        $distribution->participation_id = $participant->id;
        $distribution->save();

        if($projectRevenueCategoryCodeRef == 'revenueEuro' || $projectRevenueCategoryCodeRef == 'revenueParticipant') {
            // Recalculate values of distribution after saving
            $distribution->calculator()->runRevenueEuro();
            $distribution->save();
        }
        if($projectRevenueCategoryCodeRef == 'redemptionEuro'
            && ($projectTypeCodeRef === 'loan' || $projectTypeCodeRef === 'obligation')) {
            // Recalculate values of distribution after saving
            $distribution->calculator()->runRedemptionEuro();
            $distribution->save();
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
        $distributions, $datePayout, $description = ""
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
            //status moet nog bevestigd (confirmed zijn)
            if ($distribution->status === 'confirmed')
            {
                // indien uitbetalen dan notas en sepa aanmaken
                if ($distribution->payout_type_id === $payoutTypeAccountId
                    && ($distribution->payout >= 0)
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
                // indien bijschrijven
                if ($distribution->payout_type_id === $payoutTypeCreditId)
                {
                    $distribution->status = 'in-progress';
                    $distribution->save();
                }
            }
        }

        foreach ($distributions as $distribution) {
            //todo WM: moet hier ook niet check op mutation allowed inzake definitieve waardestaten?
            //status moet nu onderhanden zijn (in-progress zijn)
            if ($distribution->status === 'in-progress')
            {
                // indien uitbetalen
                if ($distribution->payout_type_id === $payoutTypeAccountId)
                {
                    // indien payout > 0 nota en sepa maken
                    if($distribution->payout > 0){
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
                            $paymentInvoice->description = $description;
                            $paymentInvoice->save();
                        }
                        array_push($createdInvoices, $paymentInvoice);
                    } else {
                        // indien payout = 0 alleen mutatie regel (result) maken.
                        $participantMutation = new ParticipantMutation();
                        $participantMutation->participation_id = $distribution->participation_id;
                        $mutationType = ParticipantMutationType::where('code_ref', 'result')
                            ->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
                        $participantMutation->returns = 0;
                        $participantMutation->type_id = $mutationType;
                        $participantMutation->payout_kwh = 0;
                        $participantMutation->paid_on = 'Geen';
                        $participantMutation->date_payment = $datePayout;
                        $participantMutation->save();
                    }
                }

                // indien bijschrijven
                if ($distribution->payout_type_id === $payoutTypeCreditId) {
                    // indien payout != 0 result bijschrijven (of opname)
                    if($distribution->payout != 0){
                        $participantMutation = new ParticipantMutation();
                        $participantMutation->participation_id = $distribution->participation_id;
                        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'result_deposit')
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
                    } else {
                        // indien payout = 0 alleen mutatie regel (result) maken.
                        $participantMutation = new ParticipantMutation();
                        $participantMutation->participation_id = $distribution->participation_id;
                        $mutationType = ParticipantMutationType::where('code_ref', 'result')
                            ->where('project_type_id', $distribution->participation->project->project_type_id)->value('id');
                        $participantMutation->returns = 0;
                        $participantMutation->type_id = $mutationType;
                        $participantMutation->payout_kwh = 0;
                        $participantMutation->paid_on = 'Geen';
                        $participantMutation->date_payment = $datePayout;
                        $participantMutation->save();
                    }
                }

                // Nu kan status op Afgehandeld (processed).
                $distribution->status = 'processed';
                $distribution->date_payout = $datePayout;

                $distribution->save();
            }
        }
        return $createdInvoices;
    }

    public function peekDistributionByIds(Request $request)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distributions = new ProjectRevenueDistribution();
        foreach(array_chunk($ids,900) as $chunk){
            $distributions = $distributions->orWhereIn('id', $chunk);
        }
        return ProjectRevenueDistributionPeek::collection($distributions->get());
    }

    public function previewPDF(Request $request, ProjectRevenueDistribution $distribution)
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
                $mailbox = $this->getMailboxByDistribution($project);
                if ($mailbox) {
                    $fromEmail = $mailbox->email;
                } else {
                    $fromEmail = \Config::get('mail.from.address');
                }

                $email = Mail::fromMailbox($mailbox)
                    ->to($primaryEmailAddress->email);

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
        $documentTemplateId = ( $request->input('documentTemplateId') && !empty($request->input('documentTemplateId')) ) ? $request->input('documentTemplateId') : null;
        $emailTemplateId = $request->input('emailTemplateId');
        $showOnPortal = $request->input('showOnPortal');

        $distribution = ProjectRevenueDistribution::find($distributionIds[0]);
        $revenue = $distribution->revenue;
        $project = $revenue->project;

        $mailbox = optional($project->administration)->mailbox ? $project->administration->mailbox : Mailbox::getDefault();

        $emailModel = null;
        if($mailbox){
            /**
             * Email model aanmaken zodat de email ook zichtbaar wordt onder verzonden items.
             * Dit is één gezamenlijke email voor alle ontvangers.
             *
             * De ontvangers worden later per succesvolle job aan deze mail toegevoegd.
             */
            $emailModel = new Email([
                'mailbox_id' => $mailbox->id,
                'from' => $mailbox->email,
                'to' => [],
                'cc' => [],
                'bcc' => [],
                'subject' => $subject,
                'html_body' => EmailTemplate::find($emailTemplateId)->html_body,
                'folder' => 'sent',
                'date_sent' => \Illuminate\Support\Carbon::now(),
                'project_id' => $project->id,
                'sent_by_user_id' => Auth::id(),
            ]);
            $emailModel->save();
        }

        foreach($distributionIds as $distributionId) {
            CreateRevenueReport::dispatch($distributionId, $subject, $documentTemplateId, $emailTemplateId, $showOnPortal, Auth::id(), $emailModel);
        }

        return null;
    }

    public function createParticipantRevenueReport($subject, $distributionId, ?DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate, $showOnPortal)
    {
        $portalName = PortalSettings::get('portalName');
        $cooperativeName = PortalSettings::get('cooperativeName');
        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);

        //get current logged in user
        $user = Auth::user();

        $messages = [];

        $distribution = ProjectRevenueDistribution::find($distributionId);
        $contact = $distribution->contact;
        $revenue = $distribution->revenue;
        $project = $revenue->project;
        $administration = $project->administration;
        $orderController = new OrderController();
        $contactInfo = $orderController->getContactInfoForOrder($contact);
        $primaryEmailAddress = $contact->primaryEmailAddress;

        $document = null;

        if (!(empty($distribution->address)
            || empty($distribution->postal_code)
            || empty($distribution->city))) {

            if($documentTemplate) {
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

                $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);

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

                try {
                    $time = Carbon::now();

                    $documentCreatedFromParticipantId = DocumentCreatedFrom::where('code_ref', 'participant')->first()->id;

                    $document = new Document();
                    $document->document_created_from_id = $documentCreatedFromParticipantId;
                    $document->document_type = 'internal';
                    $document->document_group = 'revenue';
                    $document->contact_id = $contact->id;
                    $document->project_id = $project->id;
                    $document->participation_project_id = $distribution->participation_id;
                    $document->template_id = $documentTemplate->id;
                    $document->show_on_portal = $showOnPortal;

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

                    if (\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
                            \Config::get('app.ALFRESCO_COOP_PASSWORD'));

                        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
                            $document->filename, $document->getDocumentGroup()->name);
                        if ($alfrescoResponse == null) {
                            throw new \Exception('Fout bij maken rapport document in Alfresco.');
                        }
                        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
                    } else {
                        $document->alfresco_node_id = null;
                    }

                    $document->save();
                } catch (\Exception $e) {
                    Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')');
                    Log::error($e->getMessage());
                    array_push($messages, 'Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')');
                }
            }

            //send email
            if ($primaryEmailAddress) {
                try{
                    $mailbox = $this->getMailboxByDistribution($project);
                    if ($mailbox) {
                        $fromEmail = $mailbox->email;
                        $fromName = $mailbox->name;
                    } else {
                        $fromEmail = \Config::get('mail.from.address');
                        $fromName = \Config::get('mail.from.name');
                    }

                    $email = Mail::fromMailbox($mailbox)
                        ->to($primaryEmailAddress->email);

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
            if($document && \Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
                Storage::disk('documents')->delete($document->filename);
            }
        }
        if(count($messages) > 0)
        {
            Log::error( 'Fouten (' . count($messages) . ') bij rapportage opbrengstverdeling' );
            return ['messages' => $messages];
        }
        else
        {
            Log::info( 'Geen fouten bij rapportage opbrengstverdeling' );
            return null;
        }
    }

    public function createPaymentInvoices(Request $request)
    {
        set_time_limit(0);

        $distributionIds = $request->input('distributionIds');
        $datePayout = $request->input('datePayout');
        $description = $request->input('description');
        CreatePaymentInvoices::dispatch($distributionIds, $datePayout, Auth::id(), $description);

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
    }

    protected function getMailboxByDistribution($project)
    {
        // Standaard vanuit primaire mailbox mailen
        $mailboxToSendFrom = Mailbox::getDefault();

        if ($project->administration && $project->administration->mailbox) {
            $mailboxToSendFrom = $project->administration->mailbox;
        }

        return $mailboxToSendFrom;
    }

    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

    /**
     * @param ProjectRevenue $projectRevenue
     * @return mixed
     */
    private function processCapitalDistribution(ProjectRevenue $projectRevenue, string $revenueCategory): void
    {
        if($revenueCategory == 'revenueEuro'){
            $projectRevenue->distribution->each(function ($distribution) {
                $distribution->calculator()->runRevenueCapitalResult();
                $distribution->save();
            });
            $projectRevenue->distribution->each(function ($distribution) {
                if ($distribution->payout == 0) {
                    $distribution->forceDelete();
                }
            });
        }
    }

    /**
     * @param ProjectRevenue $projectRevenue
     * @param string $dateBegin
     * @param string $dateEnd
     * @return mixed
     */
    private function processLoanOrDistribution(ProjectRevenue $projectRevenue, string $dateBegin, string $dateEnd, string $revenueCategory): void
    {
        if($revenueCategory == 'revenueEuro') {
            $projectRevenue->distribution->each(function ($distribution) use ($dateBegin, $dateEnd) {
                if( in_array($distribution->status, ['concept']) ) {
                    if ($distribution->payout == 0) {
//                            Log::info('Delete distribution: ' . $distribution->id . ' participant: ' . $distribution->participation_id . ' (' . $distribution->participation->contact->full_name . ') met payout 0 en 1e ingangsdatum: ' . Carbon::parse($distribution->participation->date_register)->format('Y-m-d'));
                        $distribution->forceDelete();
                    } else if ($distribution->participation->date_terminated != null
                        && $distribution->participation->date_terminated >= $dateBegin
                        && $distribution->participation->date_terminated <= $dateEnd) {
//                            Log::info('Delete distribution: ' . $distribution->id . ' participant: ' . $distribution->participation_id . ' (' . $distribution->participation->contact->full_name . ') met datum beeindiging: ' . Carbon::parse($distribution->participation->date_terminated)->format('Y-m-d'));
                        $distribution->forceDelete();
                    }
                }
            });
        }
        if($revenueCategory == 'redemptionEuro') {
            $projectRevenue->distribution->each(function ($distribution) {
                $distribution->calculator()->runRedemptionEuro();
                $distribution->save();
            });
            $projectRevenue->distribution->each(function ($distribution) {
                if($distribution->payout == 0)
                {
                    $distribution->forceDelete();
                }
            });
        }

    }

}