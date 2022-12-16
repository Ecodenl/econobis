<?php

namespace App\Console\Commands\OneTimeChecks;

use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class findWrongDistributionParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'onetimecheck:findWrongDistributionParts';

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

//        Log::info('Find wrong distribution parts');
//        Log::info('-----------------------------');

        DB::table('_wrong_distribution_parts_data')
            ->delete();

//        Loop door tabel _orders_to_end.
        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {
            $revenueDistributionPartsKwh = $revenueKwh->distributionPartsKwh
                ->where('status', 'processed')
                ->whereNotNull('date_energy_supplier_report');
            foreach($revenueDistributionPartsKwh as $partKwh) {
                $checkDate = Carbon::parse($partKwh->partsKwh->date_begin)->subDay(1)->format('Y-m-d');
                $previousDistributionPartNotProcessed = RevenueDistributionPartsKwh::where('revenue_id', $partKwh->revenue_id)
                    ->where('distribution_id', $partKwh->distribution_id)
                    ->whereHas('partsKwh', function ($query) use($checkDate) {
                        $query->where('date_end', '<', $checkDate);
                    })
                    ->whereNotIn('status', ['processed']);

//if($partKwh->id == 269){
//    Log::info('Wrong distribution parts ! - Revenue id: ' . $revenueKwh->id . ' periode ' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') );
//    Log::info('Part id: ' . $partKwh->id . ' Dist id: ' . $partKwh->distribution_id . ' periode ' . Carbon::parse($partKwh->partsKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($partKwh->partsKwh->date_end)->format('d-m-Y') );
//    Log::info('checkDate: ' . $checkDate );
//}

                if($previousDistributionPartNotProcessed->exists()){
                    $previousIds = $previousDistributionPartNotProcessed->pluck('id')->toArray();
//                    Log::info('Wrong distribution parts ! - Revenue id: ' . $revenueKwh->id . ' periode ' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') );
//                    Log::info('Part id: ' . $partKwh->id . ' Dist id: ' . $partKwh->distribution_id . ' periode ' . Carbon::parse($partKwh->partsKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($partKwh->partsKwh->date_end)->format('d-m-Y') );
//                    Log::info('ids: ' . implode(', ',$previousIds) );

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
            $subject = 'Wrong distribution parts ! (' . $NumberOfwrongDistributionPartsRevenues . '/' . $NumberOfwrongDistributionParts . ') - ' . \Config::get('app.name');
            Log::info($subject);
            $this->sendMail($subject);
        }

    }

    private function sendMail($subject)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $mail = Mail::to('wim.mosman@xaris.nl');
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $subject . '</title></head><body>'. $subject . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
