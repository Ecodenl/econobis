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

        // If period is changed then remove all values from revenue distribution period
        // todo WM: volgens mij kan dit ook opgeschoond worden.
// todo WM: opschonen: revenueKwhSplit gebruiken we niet meer
//        if($projectRevenue->category->code_ref != 'revenueKwhSplit') {
//            if ($projectRevenue->isDirty('date_begin') ||
//                $projectRevenue->isDirty('date_end')) {
//                $projectRevenue->deliveredKwhPeriod()->delete();
//            }
//        }
        $projectRevenue->save();

        if($recalculateDistribution) $this->saveParticipantsOfDistribution($projectRevenue, false);

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveParticipantsOfDistribution(ProjectRevenue $projectRevenue, $closing)
    {
        set_time_limit(300);
        $project = $projectRevenue->project;

        $dateBegin = Carbon::parse($projectRevenue->date_begin)->format('Y-m-d');
        $projectType = $project->projectType;
        $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $projectType->id)->first()->id;
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
        $participants = ParticipantProject::where('project_id', $project->id)
            ->where(function ($query) use($dateBegin) {
                $query->whereNull('date_terminated');
            })
            ->where(function ($query) use($mutationType, $mutationStatusFinal) {
                $query->whereHas('mutations', function ($query) use($mutationType, $mutationStatusFinal) {
                    $query->where('type_id', $mutationType)->where('status_id', $mutationStatusFinal);
                });
            })->get();

        foreach ($participants as $participant) {
            $this->saveDistribution($projectRevenue, $participant, $closing);
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

    }

    public function saveDistribution(ProjectRevenue $projectRevenue, ParticipantProject $participant, $closing)
    {
        $contact = Contact::find($participant->contact_id);
        if($participant->address){
            $participantAddress = $participant->address;
        }else{
            $participantAddress = $participant->contact->primaryAddress;
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
            $distribution->status = 'confirmed';
        } else {
            $distribution->status = 'concept';
        }

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

        if($projectRevenue->category->code_ref == 'revenueEuro' || $projectRevenue->category->code_ref == 'redemptionEuro') {
            // Recalculate values of distribution after saving
            $distribution->calculator()->runRevenueEuro();
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
                    // indien payout > 0 result bijschrijven
                    if($distribution->payout > 0){
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

// null voor succesboodschap. todo nog even checken of wat nut was om hier ProjectRevenueDistiibution terug te geven.
//        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
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

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}