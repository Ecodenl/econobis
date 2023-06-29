<?php

namespace App\Console\Commands;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Helpers\Email\EmailHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkMissingRevenueDistributionParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkMissingRevenueDistributionParts {--recover=false}';
    protected $mailTo = 'patrick.koeman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find missing revenue distribution parts.';

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

        $missingRevenueDistributionParts = [];

        $revenuesDistributionKwh = RevenueDistributionKwh::all();

        // alle revenues kwh controleren
        foreach($revenuesDistributionKwh as $revenueDistributionKwh) {
            foreach($revenueDistributionKwh->distributionPartsKwh as $distributionPartKwh) {
                // alle parts ophalen en controleren of deze ook bestaan in revenue_distribution_parts_kwh
                $revenuePartsKwh = $distributionPartKwh->partsKwh()->get();
                foreach ($revenuePartsKwh as $revenuePartKwh) {
                    if (RevenueDistributionPartsKwh::where('revenue_id', $revenuePartKwh->revenue_id)->where('distribution_id', $revenueDistributionKwh->id)->count() != 1) {
                        $missingRevenueDistributionPart = [
                            'revenue_id' => $revenueDistributionKwh->revenue_id,
                            'revenue_date_begin' => $revenueDistributionKwh->revenuesKwh->date_begin,
                            'revenue_date_end' => $revenueDistributionKwh->revenuesKwh->date_end,
                            'distribution_id' => $revenueDistributionKwh->distribution_id,
                            'contact_id' => $revenueDistributionKwh->contact_id,
                            'participation_id' => $revenueDistributionKwh->participation_id,
                            'parts_id' => $revenuePartKwh->id,
                            'part_date_begin' => $revenuePartKwh->date_begin,
                            'part_date_end' => $revenuePartKwh->date_end,
                            //'distribution_parts_id' => $distributionPartKwh->id,
                        ];
                        $missingRevenueDistributionParts[] = $missingRevenueDistributionPart;
                    }
                }
            }
        }

        // Missing RevenueDistributionParts gevonden, dan deze mailen
        if(!empty($missingRevenueDistributionParts)){
            $this->sendMail($missingRevenueDistributionParts, $doRecover);
            Log::info('Missing revenue distribution parts gevonden, mail gestuurd');
        } else {
            Log::info('Geen missing revenue distribution parts gevonden');
        }

        Log::info('Procedure check op missing revenue distribution parts klaar');
    }

    private function sendMail($missingRevenueDistributionParts, $doRecover)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $subject = 'Missing revenue distribution parts ! (' . count($missingRevenueDistributionParts) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $missingRevenueDistributionPartsHtml = "";
        if($doRecover){
            $missingRevenueDistributionPartsHtml .= "<p>MET HERSTEL!</p>";
        }

        foreach($missingRevenueDistributionParts as $missingRevenueDistributionPart) {
            $missingRevenueDistributionPartsHtml .=
                //'revenue_id' => $revenueDistributionKwh->revenue_id,
                "<p>Revenue Id: " . $missingRevenueDistributionPart['revenue_id'] . ", " .
//                'revenue_date_begin' => $revenueDistributionKwh->revenuesKwh->date_begin,
                "Revenue begin datum: " . $missingRevenueDistributionPart['revenue_date_begin'] . ", " .
//                'revenue_date_end' => $revenueDistributionKwh->revenuesKwh->date_end,
                "Revenue eind datum: " . $missingRevenueDistributionPart['revenue_date_end'] . ", " .
//                'distribution_id' => $revenueDistributionKwh->distribution_id,
                "Distribution Id: " . $missingRevenueDistributionPart['distribution_id'] . ", " .
//                'contact_id' => $revenueDistributionKwh->contact_id,
                "Contact Id: " . $missingRevenueDistributionPart['contact_id'] . ", " .
//                'participation_id' => $revenueDistributionKwh->participation_id,

//                'parts_id' => $revenuePartsKwh->id,
                "Part Id: " . $missingRevenueDistributionPart['parts_id'] . ", " .
//                'part_date_begin' => $revenuePartsKwh->date_begin,
                "Part begin datum: " . $missingRevenueDistributionPart['part_date_begin'] . ", " .
//                'part_date_end' => $revenuePartsKwh->date_end,
                "Part eind datum: " . $missingRevenueDistributionPart['part_date_end'] . "</p>"
//                'distribution_parts_id' => $distributionPartKwh->id,
                //"Distribution part Id: " . $missingRevenueDistributionPart['distribution_parts_id'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $missingRevenueDistributionPartsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

