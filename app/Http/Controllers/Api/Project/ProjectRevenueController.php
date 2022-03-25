<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
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
use App\Helpers\CSV\RevenueDistributionKwhCSVHelper;
use App\Helpers\CSV\RevenueParticipantsCSVHelper;
use App\Helpers\Delete\Models\DeleteRevenue;
use App\Helpers\Email\EmailHelper;
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
use Barryvdh\DomPDF\Facade as PDF;
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

        return FullProjectRevenue::collection(ProjectRevenue::where('project_id',
            $projectRevenue->project_id)
            ->with('createdBy', 'project', 'type', 'distribution')
            ->orderBy('date_begin')->get());
    }

    public function saveParticipantsOfDistribution(ProjectRevenue $projectRevenue, $closing)
    {
        set_time_limit(300);
        $project = $projectRevenue->project;

        $participants = $project->participantsProjectDefinitive;
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

        $addressEnergySupplier = $participantAddress->primaryAddressEnergySupplier;
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

        foreach ($distributions as $distribution) {
            //todo WM: moet hier ook niet check op mutation allowed inzake definitieve waardestaten?
            //status moet nu onderhanden zijn (in-progress zijn)
            if ($distribution->status === 'in-progress')
            {
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
        return $createdInvoices;
    }

    public function peekDistributionByIds(Request $request)
    {
        $this->authorize('manage', ProjectRevenue::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        if(count($ids) > 999){
            $distribution = ProjectRevenueDistribution::whereIn('id', array_slice($ids, 0, 999))
                ->orWhereIn('id', array_slice($ids, 999))
                ->get();
        } else {
            $distribution = ProjectRevenueDistribution::
            whereIn('id', $ids)->get();
        }
        return ProjectRevenueDistributionPeek::collection($distribution);
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
                array_push($messages, 'Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
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

        CreatePaymentInvoices::dispatch($distributionIds, $datePayout, Auth::id());

        return ProjectRevenueDistribution::find($distributionIds[0])->revenue->project->administration_id;
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