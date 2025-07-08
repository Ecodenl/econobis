<?php

namespace App\Console\Commands\Checks;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongRevenueDistributionPartsKwhIndicatorFields extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkWrongRevenueDistributionPartsKwhIndicatorFields {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Wrong revenue distribution parts kwh indicator fields';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // met of zonder herstel?
        $doRecover = $this->option('recover') == 'true';

        Log::info($this->description . ($doRecover ? ' MET HERSTEL!' : '') );

        $wrongRevenueDistributionPartsKwh = [];

        foreach(RevenueDistributionPartsKwh::where('status', '!=', 'processed')->get() as $revenueDistributionPartKwh) {

            // Indien partsKwh status 'concept-to-update' heeft, dan slaan we hem over. IndicatorFields worden altijd weer opnieuw bepaald als condept partsKwh opnieuw wordt bijgewerkt.
            if($revenueDistributionPartKwh->partsKwh->status == 'concept-to-update'){
                continue;
            }
            $isEnergySupplierSwitch = false;
            $isEndParticipation = false;
            $isEndTotalPeriod = false;
            $isEndYearPeriod = false;
            $isVisible = false;

            if (AddressEnergySupplier::where('address_id', $revenueDistributionPartKwh->distributionKwh->participation->address_id)->where('energy_supplier_id', $revenueDistributionPartKwh->es_id)->where('end_date', $revenueDistributionPartKwh->partsKwh->date_end)->exists()) {
                $isEnergySupplierSwitch = true;
            }
            if ($revenueDistributionPartKwh->distributionKwh->participation->date_terminated == $revenueDistributionPartKwh->partsKwh->date_end) {
                $isEndParticipation = true;
            }
            if ($revenueDistributionPartKwh->partsKwh->date_end && $revenueDistributionPartKwh->partsKwh->date_end == $revenueDistributionPartKwh->partsKwh->revenuesKwh->date_end) {
                $isEndTotalPeriod = true;
            }
            if ($revenueDistributionPartKwh->partsKwh->date_end && Carbon::parse($revenueDistributionPartKwh->partsKwh->date_end)->day == 31 && Carbon::parse($revenueDistributionPartKwh->partsKwh->date_end)->month == 12) {
                $isEndYearPeriod = true;
            }

            if ($isEnergySupplierSwitch || $isEndParticipation || $isEndTotalPeriod || $isEndYearPeriod) {
                $isVisible = true;
            }

            if($revenueDistributionPartKwh->is_energy_supplier_switch != $isEnergySupplierSwitch
                || $revenueDistributionPartKwh->is_end_participation != $isEndParticipation
                || $revenueDistributionPartKwh->is_end_total_period != $isEndTotalPeriod
                || $revenueDistributionPartKwh->is_end_year_period != $isEndYearPeriod
                || $revenueDistributionPartKwh->is_visible != $isVisible
            ) {
                $wrong  = ($revenueDistributionPartKwh->is_energy_supplier_switch != $isEnergySupplierSwitch ? 'ES' : ' ');
                $wrong  .= '|' . ($revenueDistributionPartKwh->is_end_participation != $isEndParticipation ? 'ED' : ' ');
                $wrong  .= '|' . ($revenueDistributionPartKwh->is_end_total_period != $isEndTotalPeriod ? 'TP' : ' ');
                $wrong  .= '|' . ($revenueDistributionPartKwh->is_end_year_period != $isEndYearPeriod ? 'EJ' : ' ');
                $wrong  .= '|' . ($revenueDistributionPartKwh->is_visible != $isVisible ? 'V' : ' ');

                $wrongRevenueDistributionPartsKwh[] = [
                    "revenue_id" => $revenueDistributionPartKwh->revenue_id,
                    "project_id" => $revenueDistributionPartKwh->revenuesKwh->project_id,
                    "distribution_id" => $revenueDistributionPartKwh->distribution_id,
                    "participation_id" => $revenueDistributionPartKwh->distributionKwh->participation_id,
                    "contact_id" => $revenueDistributionPartKwh->distributionKwh->contact_id,
                    "part_id" => $revenueDistributionPartKwh->partsKwh->id,
                    "distribution_part_id" => $revenueDistributionPartKwh->id,
                    "part_date_begin" => $revenueDistributionPartKwh->partsKwh->date_begin,
                    "part_date_end" => $revenueDistributionPartKwh->partsKwh->date_end,
                    "wrong" => $wrong,
                ];
                if($doRecover){
                    $revenueDistributionPartKwh->is_energy_supplier_switch = $isEnergySupplierSwitch;
                    $revenueDistributionPartKwh->is_end_participation = $isEndParticipation;
                    $revenueDistributionPartKwh->is_end_total_period = $isEndTotalPeriod;
                    $revenueDistributionPartKwh->is_end_year_period = $isEndYearPeriod;
                    $revenueDistributionPartKwh->is_visible = $this->determineIsVisible($revenueDistributionPartKwh);
                    $revenueDistributionPartKwh->save();
                }
            }

        }

        if(!empty($wrongRevenueDistributionPartsKwh)) {
            $this->sendMail($wrongRevenueDistributionPartsKwh, $doRecover);
            Log::info('Wrong revenue distribution parts kwh indicator fields gevonden, mail gestuurd');
        } else {
            Log::info('Geen wrong revenue distribution parts kwh indicator fields gevonden');
        }

        Log::info('Check wrong revenue distribution parts kwh indicator fields klaar');
    }


    /**
     * @param RevenueDistributionPartsKwh $revenueDistributionPartKwh
     */
    protected function determineIsVisible(RevenueDistributionPartsKwh $revenueDistributionPartKwh): bool
    {
        if ($revenueDistributionPartKwh->is_energy_supplier_switch
            || $revenueDistributionPartKwh->is_end_participation
            || $revenueDistributionPartKwh->is_end_total_period
            || $revenueDistributionPartKwh->is_end_year_period) {
            return true;
        } else {
            return false;
        }
    }

    private function sendMail($wrongRevenueDistributionPartsKwh, $doRecover)
    {
        $subject = $this->description . ' (' . count($wrongRevenueDistributionPartsKwh) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongRevenueDistributionPartsKwhHtml = "";
        if($doRecover){
            $wrongRevenueDistributionPartsKwhHtml .= "<p>MET HERSTEL!</p>";
        }

        foreach($wrongRevenueDistributionPartsKwh as $wrongRevenueDistributionPartKwh) {
            $wrongRevenueDistributionPartsKwhHtml .=
                "<p>revenue_id: " . $wrongRevenueDistributionPartKwh['revenue_id'] . ", " .
                "project_id: " . $wrongRevenueDistributionPartKwh['project_id'] . ", " .
                "distribution_id: " . $wrongRevenueDistributionPartKwh['distribution_id'] . ", " .
                "participation_id: " . $wrongRevenueDistributionPartKwh['participation_id'] . ", " .
                "contact_id: " . $wrongRevenueDistributionPartKwh['contact_id'] . ", " .
                "part_id: " . $wrongRevenueDistributionPartKwh['part_id'] . ", " .
                "distribution_part_id: " . $wrongRevenueDistributionPartKwh['distribution_part_id'] . ", " .
                "part_date_begin: " . $wrongRevenueDistributionPartKwh['part_date_begin'] . ", " .
                "part_date_end: " . $wrongRevenueDistributionPartKwh['part_date_end'] . ", " .
                "wrong: " . $wrongRevenueDistributionPartKwh['wrong'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>.$subject.</title></head><body><p>'. $subject . '</p>' . $wrongRevenueDistributionPartsKwhHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}