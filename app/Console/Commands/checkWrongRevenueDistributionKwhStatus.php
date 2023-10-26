<?php

namespace App\Console\Commands;

use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongRevenueDistributionKwhStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkWrongRevenueDistributionKwhStatus';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find wrong revenue distribution kwh status';

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

//        Log::info($this->description);
//        Log::info('-----------------------------');

        // legen tabel, vullen we altijd opnieuw met actuele checks
        DB::table('_wrong_revenue_distribution_kwh_status')
            ->delete();

        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {
//            $revenuePartsKwhHasNotProcessed = $revenueKwh->partsKwh()->where('status', '!=', 'processed')->exists();
            $revenuePartsKwhHasNotConfirmed = $revenueKwh->partsKwh()->where('confirmed', false)->exists();

            // verwerkte distributions controleren
            $revenueDistributionsKwhProcessed = $revenueKwh->distributionKwh
                ->where('status', '=', 'processed');

            foreach($revenueDistributionsKwhProcessed as $distributionKwhProcessed) {
                // indien er niet verwerkte parts zijn, dan fout

                if ($revenuePartsKwhHasNotConfirmed) {
                    $comment = 'Niet verwerkte deelperiode(n) aanwezig, maar deze deelnemer staat al wel op verwerkt, dat is niet juist:';
                    $comment .= " \n";
                    $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                    $comment .= " \n";
                    $comment .= ' - Revenue: ' . $revenueKwh->id;
                    $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                    $comment .= " \n";
                    $comment .= ' - Distribution: ' . $distributionKwhProcessed->id . ' ' . $distributionKwhProcessed->contact->full_name;
                    $comment .= ' Contact id: ' . $distributionKwhProcessed->contact_id;
                    $comment .= ' Participation id: ' . $distributionKwhProcessed->participation_id;
                    $comment .= " \n";
//                            Log::info($comment);
                    $wrongRevenueDistributionKwhStatusData = [
                        'project_id' => $revenueKwh->project_id,
                        'revenue_id' => $revenueKwh->id,
                        'revenue_date_begin' => $revenueKwh->date_begin,
                        'revenue_date_end' => $revenueKwh->date_end,
                        'distribution_id' => $distributionKwhProcessed->id,
                        'comment' => $comment,
                    ];
                    DB::table('_wrong_revenue_distribution_kwh_status')
                        ->insert($wrongRevenueDistributionKwhStatusData);
                }
            }
            // definitieve distributions controleren
            $revenueDistributionsKwhConfirmed = $revenueKwh->distributionKwh
                ->where('status', '=', 'confirmed');

            foreach($revenueDistributionsKwhConfirmed as $distributionKwhConfirmed) {
                // indien er niet definitieve of verwerkte parts zijn, dan fout

                if ($revenuePartsKwhHasNotConfirmed) {
                    $comment = 'Niet definitieve deelperiode(n) aanwezig, maar deze deelnemer staat al wel op definitief, dat is niet juist:';
                    $comment .= " \n";
                    $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                    $comment .= " \n";
                    $comment .= ' - Revenue: ' . $revenueKwh->id;
                    $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                    $comment .= " \n";
                    $comment .= ' - Distribution: ' . $distributionKwhConfirmed->id . ' ' . $distributionKwhConfirmed->contact->full_name;
                    $comment .= ' Contact id: ' . $distributionKwhConfirmed->contact_id;
                    $comment .= ' Participation id: ' . $distributionKwhConfirmed->participation_id;
                    $comment .= " \n";
//                            Log::info($comment);
                    $wrongRevenueDistributionKwhStatusData = [
                        'project_id' => $revenueKwh->project_id,
                        'revenue_id' => $revenueKwh->id,
                        'revenue_date_begin' => $revenueKwh->date_begin,
                        'revenue_date_end' => $revenueKwh->date_end,
                        'distribution_id' => $distributionKwhConfirmed->id,
                        'comment' => $comment,
                    ];
                    DB::table('_wrong_revenue_distribution_kwh_status')
                        ->insert($wrongRevenueDistributionKwhStatusData);
                }
            }
        }
        $wrongRevenueDistributionKwhStatus = DB::table('_wrong_revenue_distribution_kwh_status')->get();
        $NumberOfWrongRevenueDistributionKwhStatus = $wrongRevenueDistributionKwhStatus->count();
        $wrongRevenueDistributionKwhStatusRevenues = DB::table('_wrong_revenue_distribution_kwh_status')->pluck('revenue_id')->toArray();
        $NumberOfWrongRevenueDistributionKwhStatusRevenues = count(array_unique($wrongRevenueDistributionKwhStatusRevenues));
        if($wrongRevenueDistributionKwhStatus->count() > 0){
            $subject = 'Wrong revenue distribution kwh status ! (' . $NumberOfWrongRevenueDistributionKwhStatusRevenues . '/' . $NumberOfWrongRevenueDistributionKwhStatus . ') - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            $this->sendMail($subject);
        }

    }

    private function sendMail($subject)
    {
        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Wrong revenue distribution kwh status</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

