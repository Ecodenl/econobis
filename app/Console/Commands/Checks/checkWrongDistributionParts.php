<?php

namespace App\Console\Commands\Checks;

use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongDistributionParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkWrongDistributionParts';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find wrong distribution parts';

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
        DB::table('_wrong_distribution_parts_data')
            ->delete();

        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {
            // verwerkte parts controleren waar ook al energy supplier report voor is gemaakt
            $revenueDistributionPartsKwh = $revenueKwh->distributionPartsKwh
                ->where('status', 'processed')
                ->whereNotNull('date_energy_supplier_report');
            foreach($revenueDistributionPartsKwh as $partKwh) {
                $checkDate = Carbon::parse($partKwh->partsKwh->date_begin)->format('Y-m-d');
                $previousDistributionPartNotProcessed = RevenueDistributionPartsKwh::where('revenue_id', $partKwh->revenue_id)
                    ->where('distribution_id', $partKwh->distribution_id)
                    ->whereHas('partsKwh', function ($query) use($checkDate) {
                        $query->where('date_end', '<', $checkDate);
                    })
                    ->where('delivered_kwh', '!=', 0 )
                    ->whereNotIn('status', ['processed']);

                if($previousDistributionPartNotProcessed->exists()){
                    $previousIds = $previousDistributionPartNotProcessed->pluck('id')->toArray();
                        $wrongDistributionPartsData = [
                            'revenue_id' => $revenueKwh->id,
                            'revenue_date_begin' => $revenueKwh->date_begin,
                            'revenue_date_end' => $revenueKwh->date_end,
                            'part_id' => $partKwh->id,
                            'distribution_id' => $partKwh->distribution_id,
                            'part_date_begin' => $partKwh->partsKwh->date_begin,
                            'part_date_end' => $partKwh->partsKwh->date_end,
                            'previous_parts_ids_not_processed' => implode(', ',$previousIds),
                        ];
                        DB::table('_wrong_distribution_parts_data')
                            ->insert($wrongDistributionPartsData);

                }
            }
        }
        $wrongDistributionParts = DB::table('_wrong_distribution_parts_data')->get();
        $NumberOfwrongDistributionParts = $wrongDistributionParts->count();
        $wrongDistributionPartsRevenues = DB::table('_wrong_distribution_parts_data')->pluck('revenue_id')->toArray();
        $NumberOfwrongDistributionPartsRevenues = count(array_unique($wrongDistributionPartsRevenues));
        if($wrongDistributionParts->count() > 0){
            $subject = 'Wrong distribution parts ! (' . $NumberOfwrongDistributionPartsRevenues . '/' . $NumberOfwrongDistributionParts . ') - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            $this->sendMail($subject);
        }

    }

    private function sendMail($subject)
    {
        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Wrong distribution parts</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
