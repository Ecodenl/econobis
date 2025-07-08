<?php

namespace App\Console\Commands\Checks;

use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Helpers\Project\RevenuesKwhHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
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
    protected $mailTo = 'xaris@econobis.nl';

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

        $revenuesKwhHelper = new RevenuesKwhHelper();

        // alle revenues kwh controleren
        foreach($revenuesDistributionKwh as $revenueDistributionKwh) {
            //alle RevenuePartsKwh ophalen van hetzelfde revenue_id als de $revenueDistributionKwh
            $revenuePartsKwh = RevenuePartsKwh::where('revenue_id', $revenueDistributionKwh->revenue_id)->whereNotIn('status', ['new', 'in-progress-update', 'in-progress-process', 'in-progress-report'])->orderBy('date_begin')->get();

            foreach($revenuePartsKwh as $revenuePartKwh) {
                //per RevenuePartsKwh nakijken of er een RevenueDistributionPartsKwh bestaat voor deze combinatie
                if(RevenueDistributionPartsKwh::where('distribution_id', $revenueDistributionKwh->id)->where('parts_id', $revenuePartKwh->id)->count() != 1) {
                    $missingRevenueDistributionPart = [
                        'project_id' => $revenueDistributionKwh->revenuesKwh->project_id,
                        'revenue_id' => $revenueDistributionKwh->revenue_id,
                        'revenue_date_begin' => $revenueDistributionKwh->revenuesKwh->date_begin,
                        'revenue_date_end' => $revenueDistributionKwh->revenuesKwh->date_end,
                        'distribution_id' => $revenueDistributionKwh->id,
                        'contact_id' => $revenueDistributionKwh->contact_id,
                        'participation_id' => $revenueDistributionKwh->participation_id,
                        'parts_id' => $revenuePartKwh->id,
                        'part_date_begin' => $revenuePartKwh->date_begin,
                        'part_date_end' => $revenuePartKwh->date_end,
                    ];
                    $missingRevenueDistributionParts[] = $missingRevenueDistributionPart;

                    if($doRecover){
                        $revenuesKwhHelper->saveNewDistributionPartsKwh($revenuePartKwh, $revenueDistributionKwh);
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
        $subject = 'Missing revenue distribution parts ! (' . count($missingRevenueDistributionParts) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $missingRevenueDistributionPartsHtml = "";
        if($doRecover){
            $missingRevenueDistributionPartsHtml .= "<p>MET HERSTEL!</p>";
        }

        foreach($missingRevenueDistributionParts as $missingRevenueDistributionPart) {
            $missingRevenueDistributionPartsHtml .=
                //'revenue_id' => $revenueDistributionKwh->revenue_id,
                "<p>Project Id: " . $missingRevenueDistributionPart['project_id'] . ", " .
                "Revenue Id: " . $missingRevenueDistributionPart['revenue_id'] . ", " .
                "Revenue begin datum: " . $missingRevenueDistributionPart['revenue_date_begin'] . ", " .
                "Revenue eind datum: " . $missingRevenueDistributionPart['revenue_date_end'] . ", " .
                "Distribution Id: " . $missingRevenueDistributionPart['distribution_id'] . ", " .
                "Contact Id: " . $missingRevenueDistributionPart['contact_id'] . ", " .
                "Part Id: " . $missingRevenueDistributionPart['parts_id'] . ", " .
                "Part begin datum: " . $missingRevenueDistributionPart['part_date_begin'] . ", " .
                "Part eind datum: " . $missingRevenueDistributionPart['part_date_end'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $missingRevenueDistributionPartsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

