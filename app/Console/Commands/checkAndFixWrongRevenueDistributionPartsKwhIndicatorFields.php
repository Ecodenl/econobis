<?php

namespace App\Console\Commands;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class checkAndFixWrongRevenueDistributionPartsKwhIndicatorFields extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkAndFixWrongRevenueDistributionPartsKwhIndicatorFields {--recover=true}';
    protected $mailTo = 'patrick.koeman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check and fix wrong revenue distribution parts kwh indicator fields';

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

        $revenueDistributionPartKwhWrong = "";

        foreach(RevenueDistributionPartsKwh::get() as $revenueDistributionPartKwh) {
            if (AddressEnergySupplier::where('address_id', $revenueDistributionPartKwh->distributionKwh->participation->address_id)->where('energy_supplier_id', $revenueDistributionPartKwh->es_id)->where('end_date', $revenueDistributionPartKwh->partsKwh->date_end)->exists()) {
                $revenueDistributionPartKwh->is_energy_supplier_switch = true;
            } else {
                $revenueDistributionPartKwh->is_energy_supplier_switch = false;
            }
            if ($revenueDistributionPartKwh->distributionKwh->participation->date_terminated == $revenueDistributionPartKwh->partsKwh->date_end) {
                $revenueDistributionPartKwh->is_end_participation = true;
            } else {
                $revenueDistributionPartKwh->is_end_participation = false;
            }
            if ($revenueDistributionPartKwh->partsKwh->date_end && $revenueDistributionPartKwh->partsKwh->date_end == $revenueDistributionPartKwh->partsKwh->revenuesKwh->date_end) {
                $revenueDistributionPartKwh->is_end_total_period = true;
            } else {
                $revenueDistributionPartKwh->is_end_total_period = false;
            }
            if ($revenueDistributionPartKwh->partsKwh->date_end && Carbon::parse($revenueDistributionPartKwh->partsKwh->date_end)->day == 31 && Carbon::parse($revenueDistributionPartKwh->partsKwh->date_end)->month == 12) {
                $revenueDistributionPartKwh->is_end_year_period = true;
            } else {
                $revenueDistributionPartKwh->is_end_year_period = false;
            }

            if ($revenueDistributionPartKwh->is_visible === 0) {
                $is_visible = false;
            } else {
                $is_visible = true;
            }

            if($this->determineIsVisible($revenueDistributionPartKwh) !== $is_visible) {
                $revenueDistributionPartKwhWrong .=
                    "part_id: " .  $revenueDistributionPartKwh->id . "<br>" .
                    "distribution_id: " .  $revenueDistributionPartKwh->distribution_id . "<br>" .
                    "part_date_begin: " .  $revenueDistributionPartKwh->partsKwh->date_begin . "<br>" .
                    "part_date_end: " .  $revenueDistributionPartKwh->partsKwh->date_end . "<br><br>"
                ;
            }

            if($doRecover){
                $revenueDistributionPartKwh->is_visible = $this->determineIsVisible($revenueDistributionPartKwh);
                $revenueDistributionPartKwh->save();
            }
        }

        if($revenueDistributionPartKwhWrong != "") {
            $subject = 'Wrong revenue distribution parts! - ' . \Config::get('app.APP_COOP_NAME');
            $this->sendMail($subject, $revenueDistributionPartKwhWrong, $doRecover);
        }
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

    private function sendMail($subject, $revenueDistributionPartKwhWrong, $doRecover)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        if($doRecover){
            $recoverHtml = "<p>MET HERSTEL!</p>";
        } else {
            $recoverHtml = "<p>ZONDER HERSTEL!</p>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Wrong distribution parts</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p><p>'. $revenueDistributionPartKwhWrong .'</p><p>'. $recoverHtml .'</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}