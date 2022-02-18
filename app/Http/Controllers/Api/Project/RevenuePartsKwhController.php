<?php

namespace App\Http\Controllers\Api\Project;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Helpers\Delete\Models\DeleteRevenuePartsKwh;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\Project\FullRevenueDistributionPartsKwh;
use App\Http\Resources\Project\FullRevenuePartsKwh;
use App\Jobs\RevenueKwh\CreateRevenuePartsKwhReport;
use App\Jobs\RevenueKwh\ProcessRevenuePartsKwh;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RevenuePartsKwhController extends ApiController
{
    public function show(RevenuePartsKwh $revenuePartsKwh)
    {
//        $revenuePartsKwh->load([
//            'distributionPartsKwh',
//        ]);

        return FullRevenuePartsKwh::make($revenuePartsKwh);
    }

//todo WM: RevenueDistributionPartsCSVHelper moet nog gemaakt worden.
//    public function csv(RevenuePartsKwh $revenuePartsKwh)
//    {
//        set_time_limit(0);
//
//        $revenuePartsKwh = new RevenueDistributionPartsCSVHelper($revenuePartsKwh->distributionPartsKwh);
//
//        return $revenuePartsKwh->downloadCSV();
//    }

    public function getRevenueDistributionParts(RevenuePartsKwh $revenuePartsKwh, Request $request)
    {
        $limit = 100;
        $offset = $request->input('page') ? $request->input('page') * $limit : 0;

        $distributionPartsKwh = $revenuePartsKwh->distributionPartsKwh()->limit($limit)->offset($offset)->orderBy('status')->get();
        $distributionPartsKwhIdsTotal = $revenuePartsKwh->distributionPartsKwh()->pluck('id')->toArray();
        $total = $revenuePartsKwh->distributionPartsKwh()->count();

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh)
            ->additional(['meta' => [
                'total' => $total,
                'distributionPartsKwhIdsTotal' => $distributionPartsKwhIdsTotal,
            ]
            ]);

    }

    public function update(RequestInput $requestInput, Request $request, RevenuePartsKwh $revenuePartsKwh)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $data = $requestInput
            ->boolean('confirmed')->next()
            ->string('status')->whenMissing('concept')->onEmpty('concept')->next()
            ->date('dateBegin')->validate('nullable|date')->alias('date_begin')->next()
            ->date('dateEnd')->validate('nullable|date')->alias('date_end')->next()
            ->date('dateConfirmed')->validate('nullable|date')->onEmpty(null)->alias('date_confirmed')->next()
            ->double('payoutKwh')->alias('payout_kwh')->onEmpty(null)->whenMissing(null)->next()
            ->get();

        $revenuePartsKwh->fill($data);

        if($revenuePartsKwh->status == 'new'){
            $checkDateForPreviousPart = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $previousRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<', $checkDateForPreviousPart)->orderBy('date_end', 'desc')->first();
            if ($previousRevenuePartsKwh) {
                $statusPreviousPart = $previousRevenuePartsKwh->status;
            } else {
                $statusPreviousPart = 'notfound';
            }
            // als voorgaande part gevonden en die heeft nog status concept, dan definitief maken (confirmed)
            if ($statusPreviousPart == 'concept') {
                $previousRevenuePartsKwh->confirmed = true;
                $previousRevenuePartsKwh->status = 'confirmed';
                $previousRevenuePartsKwh->date_confirmed = Carbon::now()->format('Y-m-d');
                // todo WM: doortellen hier niet nodig, volgens mij, gebeurt opnieuw aan eind van calculate later in proecs.
//                $previousRevenuePartsKwh->delivered_total_confirmed = $previousRevenuePartsKwh->delivered_total_concept;
//                $previousRevenuePartsKwh->delivered_total_concept = 0;
//                $previousRevenuePartsKwh->save();
                foreach($previousRevenuePartsKwh->conceptDistributionPartsKwh as $distributionPreviousPartsKwh){
                    $distributionPreviousPartsKwh->status = 'confirmed';
                    $distributionPreviousPartsKwh->save();
                }
                foreach($previousRevenuePartsKwh->conceptDistributionValuesKwh as $distributionPreviousValuesKwh){
                    $distributionPreviousValuesKwh->status = 'confirmed';
                    $distributionPreviousValuesKwh->save();
                }
            }
            $revenuePartsKwh->status = 'concept';
        }

        if($revenuePartsKwh->confirmed) {
            if($revenuePartsKwh->status == 'concept'){
                $revenuePartsKwh->status = 'confirmed';
                // todo WM: doortellen hier niet nodig, volgens mij, gebeurt opnieuw aan eind van calculate later in proecs.
//                $revenuePartsKwh->delivered_total_confirmed = $revenuePartsKwh->delivered_total_concept;
//                $revenuePartsKwh->delivered_total_concept = 0;
                foreach($revenuePartsKwh->conceptDistributionPartsKwh as $distributionPartsKwh){
                    $distributionPartsKwh->status = 'confirmed';
                    $distributionPartsKwh->save();
                }
                foreach($revenuePartsKwh->conceptDistributionValuesKwh as $distributionValuesKwh){
                    $distributionValuesKwh->status = 'confirmed';
                    $distributionValuesKwh->save();
                }
                $revenuePartsKwh->calculator()->runRevenueKwh();
            }
        }
        $revenuePartsKwh->save();

        //todo WM: dit naar job queue (met status in-progress-calculate?
        if($revenuePartsKwh->status == 'concept') {
            $revenuePartsKwh->conceptSimulatedValuesKwh()->delete();
            $revenuePartsKwh->newOrConceptDistributionPartsKwh()->delete();
            $revenuePartsKwh->newOrConceptDistributionValuesKwh()->delete();

            $valuesKwhData = $request->get("valuesKwh");
            $this->createOrUpdateRevenueValuesKwh($valuesKwhData, $revenuePartsKwh);
            $this->createOrUpdateRevenueValuesKwhSimulate($revenuePartsKwh);
            $this->saveParticipantsOfDistributionParts($revenuePartsKwh);
            $revenuePartsKwh->calculator()->runRevenueKwh();
        }

        return FullRevenuePartsKwh::collection(RevenuePartsKwh::where('revenue_id',
            $revenuePartsKwh->revenue_id)
            ->with('distributionPartsKwh')
            ->orderBy('date_begin')->get());
    }

    /**
     * @param string $request
     * @param $revenuePartsKwh
     */
    public function createOrUpdateRevenueValuesKwh($valuesKwhData, RevenuePartsKwh $revenuePartsKwh): void
    {
        $dateRegistrationStart = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $revenueValuesKwhStart = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationStart)->first();
        if($revenueValuesKwhStart) {
            if(in_array($revenueValuesKwhStart->status, ['confirmed', 'processed'])){
                return;
            }
            $revenueValuesKwhStart->kwh_start = $valuesKwhData['kwhStart'];
            $revenueValuesKwhStart->kwh_start_high = $valuesKwhData['kwhStartHigh'];
            $revenueValuesKwhStart->kwh_start_low = $valuesKwhData['kwhStartLow'];
            $revenueValuesKwhStart->save();
        }else{
            RevenueValuesKwh::create([
                'revenue_id' => $revenuePartsKwh->revenue_id,
                'date_registration' => $dateRegistrationStart,
                'is_simulated' => false,
                'kwh_start' => $valuesKwhData['kwhStart'],
                'kwh_start_high' => $valuesKwhData['kwhStartHigh'],
                'kwh_start_low' => $valuesKwhData['kwhStartLow'],
                'kwh_end' => 0,
                'kwh_end_high' => 0,
                'kwh_end_low' => 0,
                'status' => 'concept',
                'delivered_kwh' => 0,
            ]);
        }
        $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

        $revenueValuesKwhEnd = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
        if($revenueValuesKwhEnd) {
            if(in_array($revenueValuesKwhEnd->status, ['confirmed', 'processed'])){
                return;
            }
            $revenueValuesKwhEnd->kwh_start = $valuesKwhData['kwhEnd'];
            $revenueValuesKwhEnd->kwh_start_high = $valuesKwhData['kwhEndHigh'];
            $revenueValuesKwhEnd->kwh_start_low = $valuesKwhData['kwhEndLow'];
            $revenueValuesKwhEnd->save();
        }else{
            RevenueValuesKwh::create([
                'revenue_id' => $revenuePartsKwh->revenue_id,
                'date_registration' => $dateRegistrationDayAfterEnd,
                'is_simulated' => false,
                'kwh_start' => $valuesKwhData['kwhEnd'],
                'kwh_start_high' => $valuesKwhData['kwhEndHigh'],
                'kwh_start_low' => $valuesKwhData['kwhEndLow'],
                'kwh_end' => 0,
                'kwh_end_high' => 0,
                'kwh_end_low' => 0,
                'status' => 'concept',
                'delivered_kwh' => 0,
            ]);
        }

    }
    /**
     * @param $revenueDistributionPartsKwh
     */
    protected function createOrUpdateRevenueValuesKwhSimulate(RevenuePartsKwh $revenuePartsKwh): void
    {
//        $project = $revenuePartsKwh->revenuesKwh->project;

        $partDateBegin = $revenuePartsKwh->date_begin->format('Y-m-d');
        $partDateEnd = $revenuePartsKwh->date_end->format('Y-m-d');
        $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin));
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
        $deliveredHighPerDay = round((($endRevenueValuesKwh->kwh_start_high - $beginRevenueValuesKwh->kwh_start_high) / $daysOfPeriod), 6);
        $deliveredLowPerDay = round((($endRevenueValuesKwh->kwh_start_low - $beginRevenueValuesKwh->kwh_start_low) / $daysOfPeriod), 6);
        $deliveredTotalPerDay = round((($endRevenueValuesKwh->kwh_start - $beginRevenueValuesKwh->kwh_start) / $daysOfPeriod), 6);

        RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('status', 'concept')->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('is_simulated', true)->delete();

        $kwhStart = $beginRevenueValuesKwh->kwh_start;
        $kwhEnd = $beginRevenueValuesKwh->kwh_start + $deliveredTotalPerDay;
        $kwhStartHigh = $beginRevenueValuesKwh->kwh_start_high;
        $kwhEndHigh = $beginRevenueValuesKwh->kwh_start_high + $deliveredHighPerDay;
        $kwhStartLow = $beginRevenueValuesKwh->kwh_start_low;
        $kwhEndLow = $beginRevenueValuesKwh->kwh_start_low + $deliveredLowPerDay;
        // Iterate over the period
        $period = CarbonPeriod::create(Carbon::parse($partDateBegin)->format('Y-m-d'), Carbon::parse($partDateEnd)->format('Y-m-d'));
        $deliveredTotalPartConcept = 0;
        $deliveredTotalPartConfirmed = 0;
        $deliveredTotalPartProcessed = 0;
        foreach ($period as $date) {

            $dateRegistration = $date->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistration)->first();
            if($revenueValuesKwh) {
                if($revenueValuesKwh->date_registration == $partDateBegin){
                    $revenueValuesKwh->kwh_end = $kwhEnd;
                    $revenueValuesKwh->kwh_end_high = $kwhEndHigh;
                    $revenueValuesKwh->kwh_end_low = $kwhEndLow;
                    $revenueValuesKwh->delivered_kwh = $deliveredTotalPerDay;
                    $revenueValuesKwh->save();

                    $deliveredTotal = $deliveredTotalPerDay;
                } else {
                    // bestaande anders dan begindatum?
                    Log::error('Bestaande revenue value kwh (' . $revenueValuesKwh->id . '), niet begindatum? date_registration: ' . $revenueValuesKwh->date_registration );
                }
            } else {
                // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
                if($dateRegistration == $partDateEnd){
                    $kwhEnd = $endRevenueValuesKwh->kwh_start;
                    $kwhEndHigh = $endRevenueValuesKwh->kwh_start_high;
                    $kwhEndLow = $endRevenueValuesKwh->kwh_start_low;
                    $deliveredTotal = $kwhEnd - $kwhStart;
                } else {
                    $deliveredTotal = $deliveredTotalPerDay;
                }

                $revenueValuesKwh = RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_end' => $kwhEnd,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_end_high' => $kwhEndHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'kwh_end_low' => $kwhEndLow,
                    'status' => $revenuePartsKwh->status,
                    'delivered_kwh' => $deliveredTotal,
                ]);
            }
            $kwhStart = $kwhEnd;
            $kwhEnd = $kwhStart + $deliveredTotalPerDay;
            $kwhStartHigh = $kwhEndHigh;
            $kwhEndHigh = $kwhStartHigh + $deliveredHighPerDay;
            $kwhStartLow = $kwhEndLow;
            $kwhEndLow = $kwhStartLow + $deliveredLowPerDay;

            $this->saveDistributionValues($revenuePartsKwh, $revenueValuesKwh);

            if ($revenueValuesKwh->status == 'concept') {
                $deliveredTotalPartConcept += $deliveredTotal;
            } elseif ($revenueValuesKwh->status == 'confirmed') {
                $deliveredTotalPartConfirmed += $deliveredTotal;
            } elseif ($revenueValuesKwh->status == 'processed') {
                $deliveredTotalPartProcessed += $deliveredTotal;
            }

        }
    }

    protected function saveDistributionValues(RevenuePartsKwh $revenuePartsKwh, RevenueValuesKwh $revenueValuesKwh): void
    {
        $distributionsKwh = $revenuePartsKwh->revenuesKwh->distributionKwh;
        //todo WM: opschoenen
//        if($revenueValuesKwh->date_registration == '2020-02-01') {
//            Log::info('Debug test ');
//            Log::info('Date registration 1: ' . $revenueValuesKwh->date_registration);

        foreach ($distributionsKwh as $distributionKwh) {
            $participationsQuantity = $this->determineParticipationsQuantity($distributionKwh, $revenueValuesKwh->date_registration);
            RevenueDistributionValuesKwh::create([
                'revenue_values_id' => $revenueValuesKwh->id,
                'distribution_id' => $distributionKwh->id,
                'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                'parts_id' => $revenuePartsKwh->id,
                'status' => $revenuePartsKwh->status,
                'participations_quantity' => $participationsQuantity,
                'delivered_kwh' => 0,
            ]);
        }

//        }
    }
    public function saveParticipantsOfDistributionParts(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(300);

        $revenuesKwh = $revenuePartsKwh->revenuesKwh;
        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
            $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
        }
    }


    public function saveDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        // Bepalen energiesupplier
        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionKwh->participation->address_id)
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $partDateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($partDateEnd) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateEnd) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $partDateEnd);
                    })
                    ->orWhereNull('end_date');
            })->first();

        // If RevenueDistributionPartsKwh already is added to project revenue distribution then update
        if(RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->exists()) {
            $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->first();
        } else {
            $distributionPartsKwh = new RevenueDistributionPartsKwh();
            $distributionPartsKwh->revenue_id = $revenuePartsKwh->revenue_id;
            $distributionPartsKwh->parts_id = $revenuePartsKwh->id;
            $distributionPartsKwh->distribution_id = $distributionKwh->id;
            $distributionPartsKwh->status = 'concept';
        }
//todo WM: Deelnames nog niet bijgewerkt. Delivered_kwh wordt later in proces bijgewerkt.
//
//        $participationsQuantityDistributionPart = $revenuePartsKwh->distributionValuesKwh->sortByDesc('id')->first();
//        $distributionPartsKwh->participations_quantity = $participationsQuantityDistributionPart->participations_quantity;
//        $distributionPartsKwh->participations_quantity = 0;
//        $distributionPartsKwh->delivered_kwh = 0;
        $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
        $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
        $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

        $distributionPartsKwh->save();
    }

    public function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh, $dateRegistration)
    {
        $quantityOfParticipations = 0;
        $dateBeginInitial = Carbon::parse($distributionKwh->participation->date_register);
        $dateEndInitial = Carbon::parse($dateRegistration);

        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;
        foreach ($mutations as $index => $mutation) {
            $dateEntry = Carbon::parse($mutation->date_entry);
            if($dateEntry >= $dateBeginInitial && $dateEntry <= $dateEndInitial){
                $quantityOfParticipations += $mutation->quantity;
            }
        }
        return $quantityOfParticipations;
    }

    public function createEnergySupplierReport(
        Request $request,
        RevenuePartsKwh $revenuePartsKwh,
        DocumentTemplate $documentTemplate
    )
    {
//        $documentName = $request->input('documentName');
//
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body
//            : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer
//            ? $documentTemplate->footer->html_body : '';
//
//        $project = $revenuePartsKwh->revenuesKwh->project;
//
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($html,
//            'opbrengst', $revenuePartsKwh);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'project', $project);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'ik', $user);
//        $energySupplierHtml
//            = TemplateVariableHelper::replaceTemplateVariables($energySupplierHtml,
//            'administratie', $project->administration);
//
//        $energySupplierHtml
//            = TemplateVariableHelper::stripRemainingVariableTags($energySupplierHtml);
//
//        $pdf = PDF::loadView('documents.generic', [
//            'html' => $energySupplierHtml,
//        ])->output();
//
//        $document = new Document();
//        $document->document_type = 'internal';
//        $document->document_group = 'revenue';
//        $document->project_id = $revenuePartsKwh->revenuesKwh->id;
//
//        $document->filename = $documentName . '.pdf';
//
//        $document->save();
//
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents/'
//            . $document->filename));
//        file_put_contents($filePath, $pdf);
//
//        $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//        $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//            $document->filename, $document->getDocumentGroup()->name);
//
//        $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//        $document->save();
//
//        //delete file on server, still saved on alfresco.
//        Storage::disk('documents')->delete($document->filename);
    }
//
//    public function createEnergySupplierAllExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh
//    )
//    {
//        $energySupplierIds = array_unique($revenuePartsKwh->distributionPartsKwh()->whereNotNull('es_id')->pluck('es_id')->toArray());
//        foreach ($energySupplierIds as $energySupplierId) {
//            $energySupplier = EnergySupplier::find($energySupplierId);
//            $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, true);
//        }
//    }
//
//    public function createEnergySupplierOneExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh,
//        EnergySupplier $energySupplier
//    )
//    {
//            $this->createEnergySupplierExcel($request, $revenuePartsKwh, $energySupplier, false);
//    }
//
//    protected function createEnergySupplierExcel(
//        Request $request,
//        RevenuePartsKwh $revenuePartsKwh,
//        EnergySupplier $energySupplier,
//        $createAll
//    )
//    {
//        switch ($energySupplier->file_format_id){
//            case 1:
//                $fileFormat = '.xls';
//                break;
//            default:
//                $fileFormat = '.xlsx';
//                break;
//        }
//
//        $documentName = $request->input('documentName');
//        $fileName = $createAll ? ($documentName . '-' . $energySupplier->abbreviation . $fileFormat) : $documentName . $fileFormat;
//        $templateId = $energySupplier->excel_template_id;
//
//        if ($templateId) {
//            set_time_limit(0);
//            $excelHelper = new EnergySupplierExcelHelper($energySupplier,
//                $revenuePartsKwh, $templateId, $fileName);
//            $excel = $excelHelper->getExcel();
//        }else{
//            abort(412, 'Geen geldige excel template gevonden.');
//        }
//
//        $document = new Document();
//        $document->document_type = 'internal';
//        $document->document_group = 'revenue';
//        $document->project_id = $revenuePartsKwh->revenuesKwh->id;
//
//        $document->filename = $fileName;
//
//        $document->save();
//
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'documents' . DIRECTORY_SEPARATOR
//            . $document->filename));
//
//        switch ($energySupplier->file_format_id){
//            case 1:
//                $writer = new Xls($excel);
//                break;
//            default:
//                $writer = new Xlsx($excel);
//                break;
//        }
//        $writer->save($filePath);
//
////        die("stop hier maar even voor testdoeleinden Excel (behoud file.xlsx in storage/app/documents)");
//
//        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local')
//        {
//            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//            $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//                $document->filename, $document->getDocumentGroup()->name);
//            $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//        }else{
//            $alfrescoResponse = null;
//        }
//
//        $document->save();
//
//        //delete file on server, still saved on alfresco.
//        if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
//            Storage::disk('documents')->delete($document->filename);
//        }
//    }
//
//    public function destroy(RevenuePartsKwh $revenuePartsKwh)
//    {
//        $this->authorize('manage', RevenuesKwh::class);
//
//        try {
//            DB::beginTransaction();
//
//            $deleteRevenuePartsKwh = new DeleteRevenuePartsKwh($revenuePartsKwh);
//            $result = $deleteRevenuePartsKwh->delete();
//
//            if(count($result) > 0){
//                DB::rollBack();
//                abort(412, implode(";", array_unique($result)));
//            }
//
//            DB::commit();
//        } catch (\PDOException $e) {
//            DB::rollBack();
//            Log::error($e->getMessage());
//            abort(501, 'Er is helaas een fout opgetreden.');
//        }
//    }
//
    public function peekDistributionKwhPartsByIds(Request $request)
    {
        $this->authorize('manage', RevenuesKwh::class);

        $ids = $request->input('ids') ? $request->input('ids') : [];

        $distributionPartsKwh = RevenueDistributionPartsKwh::whereIn('id', $ids)->with(['revenuePartsKwh'])->get();

        return FullRevenueDistributionPartsKwh::collection($distributionPartsKwh);
    }
//
//    public function downloadPreview(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $documentTemplate = DocumentTemplate::find($request->input('documentTemplateId'));
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer ? $documentTemplate->footer->html_body : '';
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);
//
//            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);
//
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'portal');
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml, 'contacten_portal');
//            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml, 'cooperatie');
//
//            //wettelijk vertegenwoordiger
//            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                    ->where('occupation_id', 7)->first()->primaryContact;
//                $revenueHtml
//                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger',
//                    $wettelijkVertegenwoordiger);
//            }
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuePartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname',
//                $distributionPartsKwh->participation);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties',
//                $distributionPartsKwh->participation->mutations);
//
//            $revenueHtml
//                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
//            $pdf = PDF::loadView('documents.generic', [
//                'html' => $revenueHtml,
//            ])->output();
//
//            return $pdf;
//        }
//        return null;
//    }
//
//    public function previewEmail(Request $request, RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        $subject = $request->input('subject');
//        $portalName = PortalSettings::get('portalName');
//        $cooperativeName = PortalSettings::get('cooperativeName');
//        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
//        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
//
//        //get current logged in user
//        $user = Auth::user();
//
//        //load template parts
//        $emailTemplate = EmailTemplate::find($request->input('emailTemplateId'));
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//
//            $primaryEmailAddress = $contact->primaryEmailAddress;
//
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            //Make preview email
//            if ($primaryEmailAddress) {
//                $mailbox = $this->setMailConfigByDistribution($distributionPartsKwh);
//                if ($mailbox) {
//                    $fromEmail = $mailbox->email;
//                    $fromName = $mailbox->name;
//                } else {
//                    $fromEmail = \Config::get('mail.from.address');
//                    $fromName = \Config::get('mail.from.name');
//                }
//
//                $email = Mail::to($primaryEmailAddress->email);
//                if (!$subject) {
//                    $subject = 'Participant rapportage Econobis';
//                }
//
//                $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);
//
//                $email->subject = $subject;
//
//                $email->html_body
//                    = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
//                    . $subject . '</title></head>'
//                    . $emailTemplate->html_body . '</html>';
//
//                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
//                    $contact);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
//                    $contact);
//
//                //wettelijk vertegenwoordiger
//                if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                    $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                        ->where('occupation_id', 7)->first()->primaryContact;
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
//                        'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//                }
//
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuePartsKwh);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionPartsKwh->participation);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionPartsKwh->participation->mutations);
//                $htmlBodyWithContactVariables
//                    = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
//
//                $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                    $htmlBodyWithContactVariables);
//
//                return [
//                    'from' => $fromEmail,
//                    'to' => $primaryEmailAddress->email,
//                    'subject' => $subject,
//                    'htmlBody' => $htmlBodyWithContactVariables
//                ];
//            } else {
//                return [
//                    'from' => 'Geen e-mail bekend.',
//                    'to' => 'Geen e-mail bekend.',
//                    'subject' => 'Geen e-mail bekend.',
//                    'htmlBody' => 'Geen e-mail bekend.'
//                ];
//            }
//        }
//        return [
//            'from' => 'Geen e-mail bekend.',
//            'to' => 'Geen e-mail bekend.',
//            'subject' => 'Geen e-mail bekend.',
//            'htmlBody' => 'Geen e-mail bekend.'
//        ];
//    }
//
    public function createRevenuePartsReport(Request $request)
    {
        set_time_limit(0);
        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
        $subject = $request->input('subject');
        $documentTemplateId = $request->input('documentTemplateId');
        $emailTemplateId = $request->input('emailTemplateId');

        foreach($distributionPartsKwhIds as $distributionPartsKwhId) {
            CreateRevenuePartsKwhReport::dispatch($distributionPartsKwhId, $subject, $documentTemplateId, $emailTemplateId, Auth::id());
        }

        return null;
    }
//
//    public function createParticipantRevenueReport($subject, $distributionPartsKwhId, DocumentTemplate $documentTemplate, EmailTemplate $emailTemplate)
//    {
//        $portalName = PortalSettings::get('portalName');
//        $cooperativeName = PortalSettings::get('cooperativeName');
//        $subject = str_replace('{cooperatie_portal_naam}', $portalName, $subject);
//        $subject = str_replace('{cooperatie_naam}', $cooperativeName, $subject);
//
//        //get current logged in user
//        $user = Auth::user();
//
//        $messages = [];
//
//        //load template parts
//        $documentTemplate->load('footer', 'baseTemplate', 'header');
//
//        $html = $documentTemplate->header ? $documentTemplate->header->html_body : '';
//
//        if ($documentTemplate->baseTemplate) {
//            $html .= TemplateVariableHelper::replaceTemplateTagVariable($documentTemplate->baseTemplate->html_body,
//                $documentTemplate->html_body, '', '');
//        } else {
//            $html .= TemplateVariableHelper::replaceTemplateFreeTextVariables($documentTemplate->html_body,
//                '', '');
//        }
//
//        $html .= $documentTemplate->footer
//            ? $documentTemplate->footer->html_body : '';
//
//        $distributionPartsKwh = RevenueDistributionPartsKwh::find($distributionPartsKwhId);
//
//        if( !( empty($distributionPartsKwh->address)
//            || empty($distributionPartsKwh->postal_code)
//            || empty($distributionPartsKwh->city) ) ) {
//
//            $contact = $distributionPartsKwh->contact;
//            $orderController = new OrderController();
//
//            $contactInfo = $orderController->getContactInfoForOrder($contact);
//            $subject = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $subject);
//
//            $primaryEmailAddress = $contact->primaryEmailAddress;
//
//            $revenuePartsKwh = $distributionPartsKwh->revenuePartsKwh;
//            $project = $revenuePartsKwh->revenuesKwh->project;
//            $administration = $project->administration;
//
//            $html = str_replace('{contactpersoon}', $contactInfo['contactPerson'], $html);
//
//            $revenueHtml = TemplateTableHelper::replaceTemplateTables($html, $contact);
//
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'contact', $contact);
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'portal' );
//            $revenueHtml = TemplateVariableHelper::replaceTemplatePortalVariables($revenueHtml,'contacten_portal' );
//            $revenueHtml = TemplateVariableHelper::replaceTemplateCooperativeVariables($revenueHtml,'cooperatie' );
//
//            //wettelijk vertegenwoordiger
//            if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                    ->where('occupation_id', 7)->first()->primaryContact;
//                $revenueHtml
//                    = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//            }
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'ik', $user);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'administratie', $administration);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'verdeling', $distributionPartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'opbrengst', $revenuePartsKwh);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'project', $project);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'deelname', $distributionPartsKwh->participation);
//            $revenueHtml
//                = TemplateVariableHelper::replaceTemplateVariables($revenueHtml, 'mutaties', $distributionPartsKwh->participation->mutations);
//
//            $revenueHtml
//                = TemplateVariableHelper::stripRemainingVariableTags($revenueHtml);
//            $pdf = PDF::loadView('documents.generic', [
//                'html' => $revenueHtml,
//            ])->output();
//
//            try
//            {
//                $time = Carbon::now();
//
//                $document = new Document();
//                $document->document_type = 'internal';
//                $document->document_group = 'revenue';
//                $document->contact_id = $contact->id;
//                $document->project_id = $project->id;
//                $document->participation_project_id = $distributionPartsKwh->participation_id;
//                $document->template_id = $documentTemplate->id;
//
//                $filename = str_replace(' ', '', $this->translateToValidCharacterSet($project->code)) . '_'
//                    . str_replace(' ', '', $this->translateToValidCharacterSet($contact->full_name));
//
//
//                //max length name 25
//                $filename = substr($filename, 0, 25);
//
//                $document->filename = $filename
//                    . substr($document->getDocumentGroup()->name, 0, 1)
//                    . (Document::where('document_group', 'revenue')->count()
//                        + 1) . '_' . $time->format('Ymd') . '.pdf';
//
//                $document->save();
//
//                $filePath = (storage_path('app' . DIRECTORY_SEPARATOR
//                    . 'documents/' . $document->filename));
//                file_put_contents($filePath, $pdf);
//
//                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'),
//                    \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//
//                $alfrescoResponse = $alfrescoHelper->createFile($filePath,
//                    $document->filename, $document->getDocumentGroup()->name);
//                if($alfrescoResponse == null)
//                {
//                    throw new \Exception('Fout bij maken rapport document in Alfresco.');
//                }
//                $document->alfresco_node_id = $alfrescoResponse['entry']['id'];
//                $document->save();
//            }
//            catch (\Exception $e) {
//                Log::error('Fout bij maken rapport document voor ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                Log::error($e->getMessage());
//                array_push($messages, 'Fout bij maken rapport document voor ' . $primaryEmailAddress->email . ' (' . $contact->full_name . ')' );
//            }
//
//            //send email
//            if ($primaryEmailAddress) {
//                try{
//                    $mailbox = $this->setMailConfigByDistribution($distributionPartsKwh);
//                    if ($mailbox) {
//                        $fromEmail = $mailbox->email;
//                        $fromName = $mailbox->name;
//                    } else {
//                        $fromEmail = \Config::get('mail.from.address');
//                        $fromName = \Config::get('mail.from.name');
//                    }
//
//                    $email = Mail::to($primaryEmailAddress->email);
//                    if (!$subject) {
//                        $subject = 'Participant rapportage Econobis';
//                    }
//
//                    $subject = TemplateVariableHelper::replaceTemplateVariables($subject, 'project', $project);
//
//                    $email->subject = $subject;
//
//                    $email->html_body
//                        = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
//                        . $subject . '</title></head>'
//                        . $emailTemplate->html_body . '</html>';
//
//                    $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body,
//                        $contact);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact',
//                        $contact);
//
//                    //wettelijk vertegenwoordiger
//                    if (OccupationContact::where('contact_id', $contact->id)->where('occupation_id', 7)->exists()) {
//                        $wettelijkVertegenwoordiger = OccupationContact::where('contact_id', $contact->id)
//                            ->where('occupation_id', 7)->first()->primaryContact;
//                        $htmlBodyWithContactVariables
//                            = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables,
//                            'wettelijk_vertegenwoordiger', $wettelijkVertegenwoordiger);
//                    }
//
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', $user);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'administratie', $administration);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'verdeling', $distributionPartsKwh);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'opbrengst', $revenuePartsKwh);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'project', $project);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'deelname', $distributionPartsKwh->participation);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'mutaties', $distributionPartsKwh->participation->mutations);
//                    $htmlBodyWithContactVariables
//                        = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
//
//                    $htmlBodyWithContactVariables = str_replace('{contactpersoon}', $contactInfo['contactPerson'],
//                        $htmlBodyWithContactVariables);
//
//                    $email->send(new ParticipantReportMail($email, $fromEmail, $fromName,
//                        $htmlBodyWithContactVariables, $document));
//
//                } catch (\Exception $e) {
//                    Log::error( 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                    Log::error($e->getMessage());
//                    array_push($messages, 'Fout bij verzenden email naar ' . ($primaryEmailAddress ? $primaryEmailAddress->email : '**onbekend emailadres**') . ' (' . $contact->full_name . ')' );
//                }
//
//            } else {
//                return [
//                    'from' => 'Geen e-mail bekend.',
//                    'to' => 'Geen e-mail bekend.',
//                    'subject' => 'Geen e-mail bekend.',
//                    'htmlBody' => 'Geen e-mail bekend.'
//                ];
//            }
//
//            //delete file on server, still saved on alfresco.
//            Storage::disk('documents')->delete($document->filename);
//        }
//        if(count($messages) > 0)
//        {
//            return ['messages' => $messages];
//        }
//        else
//        {
//            return null;
//        }
//    }
//
    public function processRevenuePartsKwh(Request $request)
    {
        set_time_limit(0);
        $distributionPartsKwhIds = $request->input('distributionPartsKwhIds');
        $datePayout = $request->input('datePayout');

        ProcessRevenuePartsKwh::dispatch($distributionPartsKwhIds, $datePayout, Auth::id());

        return RevenueDistributionPartsKwh::find($distributionPartsKwhIds[0])->revenuesKwh->project->administration_id;
    }
    public function processRevenuePartsKwhJob($distributionPartsKwh, $datePayout)
    {
        set_time_limit(300);

        if (!($distributionPartsKwh->first())->revenuesKwh->project->administration_id) {
            abort(400,
                'Geen administratie gekoppeld aan dit productie project');
        }else{
            $lastYearFinancialOverviewDefinitive =  $distributionPartsKwh->first()->revenuesKwh->project->lastYearFinancialOverviewDefinitive;
            if( !empty($lastYearFinancialOverviewDefinitive) && !empty($datePayout) && Carbon::parse($datePayout)->year <= $lastYearFinancialOverviewDefinitive)
            {
                abort(400,'De uitkeringsdatum valt in jaar ' . Carbon::parse($datePayout)->year . ' waar al een definitive waardestaat voor dit project aanwezig is.');
            }
        }

        $revenuePartsKwh = $distributionPartsKwh->first()->partsKwh;
        $revenuePartsKwh->status = 'in-progress-process';
        $revenuePartsKwh->save();
        foreach ($distributionPartsKwh as $distributionPartKwh) {
            //status moet nog bevestigd (confirmed zijn)
            if ($distributionPartKwh->status === 'confirmed')
            {
                $distributionPartKwh->status = 'in-progress-process';
                $distributionPartKwh->save();
            }
        }
        foreach ($revenuePartsKwh->distributionValuesKwh as $distributionValueKwh) {
            //status moet nog bevestigd (confirmed zijn)
            if ($distributionValueKwh->status === 'confirmed')
            {
                $distributionValueKwh->status = 'in-progress-process';
                $distributionValueKwh->save();
            }
        }

        foreach ($distributionPartsKwh as $distributionPartKwh) {
            //status moet nu onderhanden zijn (in-progress-process zijn)
            if ($distributionPartKwh->status === 'in-progress-process')
            {
                $this->createParticipantMutationForRevenueKwh($distributionPartKwh, $datePayout);

                $distributionPartKwh->status = 'processed';
                $distributionPartKwh->save();

                $distributionPartKwh->status = 'processed';
                $distributionPartKwh->save();
            }
        }
        foreach ($revenuePartsKwh->distributionValuesKwh as $distributionValueKwh) {
            //status moet nu onderhanden zijn (in-progress-process zijn)
            if ($distributionValueKwh->status === 'in-progress-process')
            {
                $distributionValueKwh->status = 'processed';
                $distributionValueKwh->save();
            }
        }

        //status moet nu onderhanden zijn (in-progress-process zijn)
        if ($revenuePartsKwh->status === 'in-progress-process') {
            if($revenuePartsKwh->distributionPartsKwh->where('status', '!=', 'processed')->count() == 0){
                $revenuePartsKwh->status = 'processed';
            }else{
                $revenuePartsKwh->status = 'confirmed';
            }
            $revenuePartsKwh->save();
            $revenuePartsKwh->revenuesKwh->save();
        }
        $revenuePartsKwh->calculator()->runRevenueKwh();

    }

    protected function createParticipantMutationForRevenueKwh(RevenueDistributionPartsKwh $distributionPartsKwh, $datePayout){
        $participantMutation = new ParticipantMutation();
        $participantMutation->participation_id = $distributionPartsKwh->distributionKwh->participation_id;
        $participantMutation->type_id = ParticipantMutationType::where('code_ref', 'energyTaxRefund')->where('project_type_id', $distributionPartsKwh->distributionKwh->participation->project->project_type_id)->value('id');
        $participantMutation->payout_kwh_price = $distributionPartsKwh->partsKwh->payout_kwh;
        $participantMutation->payout_kwh = $distributionPartsKwh->delivered_total;
        $participantMutation->indication_of_restitution_energy_tax = $distributionPartsKwh->kwh_return;
        $participantMutation->paid_on = $distributionPartsKwh->energySupplier ? $distributionPartsKwh->energySupplier->name : '';
        $participantMutation->date_payment = $datePayout;
        $participantMutation->save();
    }
//
//    protected function setMailConfigByDistribution(RevenueDistributionPartsKwh $distributionPartsKwh)
//    {
//        // Standaard vanuit primaire mailbox mailen
//        $mailboxToSendFrom = Mailbox::getDefault();
//
//        // Als er een mailbox aan de administratie is gekoppeld, dan deze gebruiken
//        $project = $distributionPartsKwh->revenuesKwh->project;
//
//        if ($project->administration && $project->administration->mailbox) {
//            $mailboxToSendFrom = $project->administration->mailbox;
//        }
//
//        // Configuratie instellen als er een mailbox is gevonden
//        if ($mailboxToSendFrom) {
//            (new EmailHelper())->setConfigToMailbox($mailboxToSendFrom);
//        }
//        return $mailboxToSendFrom;
//    }
//
//    protected function translateToValidCharacterSet($field){
//
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
//        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);
//
//        return $field;
//    }


}