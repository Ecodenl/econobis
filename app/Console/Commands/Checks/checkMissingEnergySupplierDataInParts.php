<?php

namespace App\Console\Commands\Checks;

use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkMissingEnergySupplierDataInParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkMissingEnergySupplierDataInParts';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find missing parts';

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
        DB::table('_missing_energy_supplier_data_in_parts')
            ->delete();

        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {

            // niet verwerkte parts controleren
            $revenuePartsKwh = $revenueKwh->partsKwh
                ->where('status', '!=', 'processed');
            foreach($revenuePartsKwh as $partKwh) {
                $dateBegin = Carbon::parse($partKwh->date_begin)->format('Y-m-d');
                $dateEnd = Carbon::parse($partKwh->date_end)->format('Y-m-d');
                foreach ($revenueKwh->distributionKwh as $distributionKwh) {
                    $dateTerminated = Carbon::parse($distributionKwh->participation->date_terminated)->addDay()->format('Y-m-d');

                    // controleer addressEnergySuppliers als deelnemer niet beeindigd is of als beeindigsdatum na begindatum ligt.
                    if($dateTerminated == null || $dateTerminated > $dateBegin){

                        $addressEnergySuppliers = $distributionKwh->participation->address->addressEnergySuppliers()
                            ->whereIn('energy_supply_type_id', [2, 3])
                            ->where(function ($addressEnergySupplier) use ($dateBegin, $dateEnd) {
                                $addressEnergySupplier
                                    ->where(function ($addressEnergySupplier) use ($dateBegin, $dateEnd) {
                                        $addressEnergySupplier->whereNotNull('member_since')
                                            ->where('member_since', '>', $dateBegin)
                                            ->where('member_since', '<=', $dateEnd);
                                    });
                            })
                            ->get();
                        if ($addressEnergySuppliers->count() > 0) {
                            foreach ($addressEnergySuppliers as $addressEnergySupplier){
                                $comment = 'Geen splitsing deelperiode data gevonden voor switch datum deelnemer:';
                                $comment .= " \n";
                                $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                                $comment .= " \n";
                                $comment .= ' - Revenue: ' . $revenueKwh->id;
                                $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                                $comment .= " \n";
                                $comment .= ' - PartKwh: ' . $partKwh->id;
                                $comment .= ' (' . Carbon::parse($partKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($partKwh->date_end)->format('d-m-Y') . ')';
                                $comment .= " \n";
                                $comment .= ' - Distribution: ' . $distributionKwh->id . ' ' . $distributionKwh->contact->full_name;
                                $comment .= ' Contact id: ' . $distributionKwh->contact_id;
                                $comment .= " \n";
                                $comment .= ' - Participation id: ' . $distributionKwh->participation_id;
                                $comment .= " \n";
                                $comment .= ' - AddressEnergySupplier id: ' . $addressEnergySupplier->id;
                                $comment .= ' (' . Carbon::parse($addressEnergySupplier->member_since)->format('d-m-Y') . ' t/m ' . ($addressEnergySupplier->end_date ? Carbon::parse($addressEnergySupplier->end_date)->format('d-m-Y') : '31-12-9999'). ')';
                                $comment .= " \n";
                                $comment .= ' - Adres: ' . $addressEnergySupplier->address->id . ' ' . $addressEnergySupplier->street_postal_code_city;
                                $comment .= " \n";
//                            Log::info($comment);
                                $missingEnergySupplierDataInPartsData = [
                                    'project_id' => $revenueKwh->project_id,
                                    'revenue_id' => $revenueKwh->id,
                                    'revenue_date_begin' => $revenueKwh->date_begin,
                                    'revenue_date_end' => $revenueKwh->date_end,
                                    'parts_id' => $partKwh->id,
                                    'part_date_begin' => $partKwh->date_begin,
                                    'part_date_end' => $partKwh->date_end,
                                    'distribution_id' => $distributionKwh->id,
                                    'participation_id' => $distributionKwh->participation_id,
                                    'participation_date_terminated' => $distributionKwh->participation->date_terminated,
                                    'address_supplier_energy_id' => $addressEnergySupplier->id,
                                    'address_supplier_energy_member_since' => $addressEnergySupplier->member_since,
                                    'address_supplier_energy_end_date' => $addressEnergySupplier->end_date,
                                    'comment' => $comment,
                                ];
                                DB::table('_missing_energy_supplier_data_in_parts')
                                    ->insert($missingEnergySupplierDataInPartsData);
                            }
                        }

                    }

                    if ($distributionKwh->participation->date_terminated != null) {
                        $dayAfterTerminated = Carbon::parse($distributionKwh->participation->date_terminated)->addDay()->format('Y-m-d');
                        if ($dayAfterTerminated > $dateBegin and $dayAfterTerminated <= $dateEnd) {
                            $comment = 'Geen splitsing deelperiode data gevonden voor dag na beeindiging deelnemer:';
                            $comment .= " \n";
                            $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                            $comment .= " \n";
                            $comment .= ' - Revenue: ' . $revenueKwh->id;
                            $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - PartKwh: ' . $partKwh->id;
                            $comment .= ' (' . Carbon::parse($partKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($partKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - Distribution: ' . $distributionKwh->id . ' ' . $distributionKwh->contact->full_name;
                            $comment .= ' Contact id: ' . $distributionKwh->contact_id;
                            $comment .= " \n";
                            $comment .= ' - Participation id: ' . $distributionKwh->participation_id;
                            $comment .= ' (Beeindigt op: ' . Carbon::parse($distributionKwh->participation->date_terminated)->format('d-m-Y') . ')';
                            $comment .= " \n";
//                            Log::info($comment);
                            $missingEnergySupplierDataInPartsData = [
                                'project_id' => $revenueKwh->project_id,
                                'revenue_id' => $revenueKwh->id,
                                'revenue_date_begin' => $revenueKwh->date_begin,
                                'revenue_date_end' => $revenueKwh->date_end,
                                'parts_id' => $partKwh->id,
                                'part_date_begin' => $partKwh->date_begin,
                                'part_date_end' => $partKwh->date_end,
                                'distribution_id' => $distributionKwh->id,
                                'participation_id' => $distributionKwh->participation_id,
                                'participation_date_terminated' => $distributionKwh->participation->date_terminated,
                                'address_supplier_energy_id' => null,
                                'address_supplier_energy_member_since' => null,
                                'address_supplier_energy_end_date' => null,
                                'comment' => $comment,
                            ];
                            DB::table('_missing_energy_supplier_data_in_parts')
                                ->insert($missingEnergySupplierDataInPartsData);
                        }

                    }
                }
            }
        }
        $missingEnergySupplierDataInParts = DB::table('_missing_energy_supplier_data_in_parts')->get();
        $NumberOfMissingEnergySupplierDataInParts = $missingEnergySupplierDataInParts->count();
        $missingEnergySupplierDataInPartsRevenues = DB::table('_missing_energy_supplier_data_in_parts')->pluck('revenue_id')->toArray();
        $NumberOfMissingEnergySupplierDataInPartsRevenues = count(array_unique($missingEnergySupplierDataInPartsRevenues));
        if($missingEnergySupplierDataInParts->count() > 0){
            $subject = 'missing parts ! (' . $NumberOfMissingEnergySupplierDataInPartsRevenues . '/' . $NumberOfMissingEnergySupplierDataInParts . ') - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            $this->sendMail($subject);
        }

    }

    private function sendMail($subject)
    {
        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Missing parts</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

