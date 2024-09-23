<?php

namespace App\Console\Commands\Checks;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongEnergySupplierDataInParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkWrongEnergySupplierDataInParts';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find wrong energy supplier data in parts';

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
        DB::table('_wrong_energy_supplier_data_in_parts')
            ->delete();

        $energySupplierUnknown = EnergySupplier::where('abbreviation', 'ONB')->first();

        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {
            // niet verwerkte parts controleren
            $revenueDistributionPartsKwh = $revenueKwh->distributionPartsKwh
                ->where('status', '!=', 'processed');
            foreach($revenueDistributionPartsKwh as $distributionPartKwh) {
                $address = $distributionPartKwh->distributionKwh->participation->address;
                if ($address) {
                    $addressEnergySupplier = $this->getAddressEnergySupplierInAPeriod($address->id, $distributionPartKwh->partsKwh->date_begin, $distributionPartKwh->partsKwh->date_end);
                    if(!$addressEnergySupplier){
                        //todo WM: $distributionPartKwh->es_id != $energySupplierUnknown->id moet nog weg.
                        if ( $distributionPartKwh->es_id != $energySupplierUnknown->id &&
                            ($distributionPartKwh->es_id != null
                            || ($distributionPartKwh->energy_supplier_name != null && $distributionPartKwh->energy_supplier_name != '')
                            || ($distributionPartKwh->energy_supplier_number != null && $distributionPartKwh->energy_supplier_number != '') )
                        ){
                            $comment = 'Geen adres/energieleverancier data gevonden bij deelperiode data:';
                            $comment .= " \n";
                            $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                            $comment .= " \n";
                            $comment .= ' - Revenue: ' . $distributionPartKwh->revenue_id;
                            $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - Distribution: ' . $distributionPartKwh->distribution_id . ' ' . $distributionPartKwh->distributionKwh->contact->full_name;
                            $comment .= ' Contact id: ' . $distributionPartKwh->distributionKwh->contact_id;
                            $comment .= ' Participation id: ' . $distributionPartKwh->distributionKwh->participation_id;
                            $comment .= " \n";
                            $comment .= ' - DistributionPartKwh: ' . $distributionPartKwh->id;
                            $comment .= ' (' . Carbon::parse($distributionPartKwh->partsKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($distributionPartKwh->partsKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - Adres: ' . $address->id . ' ' . $address->street_postal_code_city;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh es_id: ' . $distributionPartKwh->es_id;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh energy_supplier_name: ' . $distributionPartKwh->energy_supplier_name;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh energy_supplier_number: ' . $distributionPartKwh->energy_supplier_number;
//                            Log::info($comment);
                            $wrongEnergySupplierDataInPartsData = [
                                'revenue_id' => $revenueKwh->id,
                                'revenue_date_begin' => $revenueKwh->date_begin,
                                'revenue_date_end' => $revenueKwh->date_end,
                                'parts_id' => $distributionPartKwh->parts_id,
                                'part_date_begin' => $distributionPartKwh->partsKwh->date_begin,
                                'part_date_end' => $distributionPartKwh->partsKwh->date_end,
                                'distribution_parts_id' => $distributionPartKwh->id,
                                'distribution_id' => $distributionPartKwh->distribution_id,
                                'comment' => $comment,
                            ];
                            DB::table('_wrong_energy_supplier_data_in_parts')
                                ->insert($wrongEnergySupplierDataInPartsData);
                        }
                    } else {
                        if($distributionPartKwh->es_id != $addressEnergySupplier->energy_supplier_id
                            || $distributionPartKwh->energy_supplier_number != $addressEnergySupplier->es_number
                            || $distributionPartKwh->energy_supplier_name != $addressEnergySupplier->energySupplier->name
                        ) {
                            $comment = 'Verschil adres/energieleverancier data met deelperiode data:';
                            $comment .= " \n";
                            $comment .= ' - Project: ' . $revenueKwh->project_id . ' ' . $revenueKwh->project->name;
                            $comment .= " \n";
                            $comment .= ' - Revenue: ' . $distributionPartKwh->revenue_id;
                            $comment .= ' (' . Carbon::parse($revenueKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($revenueKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - Distribution: ' . $distributionPartKwh->distribution_id . ' ' . $distributionPartKwh->distributionKwh->contact->full_name;
                            $comment .= ' Contact id: ' . $distributionPartKwh->distributionKwh->contact_id;
                            $comment .= ' Participation id: ' . $distributionPartKwh->distributionKwh->participation_id;
                            $comment .= " \n";
                            $comment .= ' - DistributionPartKwh: ' . $distributionPartKwh->id;
                            $comment .= ' (' . Carbon::parse($distributionPartKwh->partsKwh->date_begin)->format('d-m-Y') . ' t/m ' . Carbon::parse($distributionPartKwh->partsKwh->date_end)->format('d-m-Y') . ')';
                            $comment .= " \n";
                            $comment .= ' - Adres: ' . $address->id . ' ' . $address->street_postal_code_city;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh es_id: ' . $distributionPartKwh->es_id;
                            $comment .= ' - addressEnergySupplier energy_supplier_id: ' . $addressEnergySupplier->energy_supplier_id;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh energy_supplier_name: ' . $distributionPartKwh->energy_supplier_name;
                            $comment .= ' - addressEnergySupplier name: ' . $addressEnergySupplier->energySupplier->name;
                            $comment .= " \n";
                            $comment .= ' - distributionPartKwh energy_supplier_number: ' . $distributionPartKwh->energy_supplier_number;
                            $comment .= ' - addressEnergySupplier es_number: ' . $addressEnergySupplier->es_number;
//                            Log::info($comment);
                            $wrongEnergySupplierDataInPartsData = [
                                'revenue_id' => $revenueKwh->id,
                                'revenue_date_begin' => $revenueKwh->date_begin,
                                'revenue_date_end' => $revenueKwh->date_end,
                                'parts_id' => $distributionPartKwh->parts_id,
                                'part_date_begin' => $distributionPartKwh->partsKwh->date_begin,
                                'part_date_end' => $distributionPartKwh->partsKwh->date_end,
                                'distribution_parts_id' => $distributionPartKwh->id,
                                'distribution_id' => $distributionPartKwh->distribution_id,
                                'comment' => $comment,
                            ];
                            DB::table('_wrong_energy_supplier_data_in_parts')
                                ->insert($wrongEnergySupplierDataInPartsData);
                        }
                    }
                }
            }
        }
        $wrongEnergySupplierDataInParts = DB::table('_wrong_energy_supplier_data_in_parts')->get();
        $NumberOfWrongEnergySupplierDataInParts = $wrongEnergySupplierDataInParts->count();
        $wrongEnergySupplierDataInPartsRevenues = DB::table('_wrong_energy_supplier_data_in_parts')->pluck('revenue_id')->toArray();
        $NumberOfwrongEnergySupplierDataInPartsRevenues = count(array_unique($wrongEnergySupplierDataInPartsRevenues));
        if($wrongEnergySupplierDataInParts->count() > 0){
            $subject = 'Wrong energy supplier data in parts ! (' . $NumberOfwrongEnergySupplierDataInPartsRevenues . '/' . $NumberOfWrongEnergySupplierDataInParts . ') - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            $this->sendMail($subject);
        }

    }

    private function getAddressEnergySupplierInAPeriod($addressid, $dateBegin, $dateEnd)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $addressid)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $dateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $dateBegin);
                    })
                    ->orWhereNull('end_date');
            })->first();
        return $addressEnergySupplier;
    }

    private function sendMail($subject)
    {
        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Wrong energy supplier data in parts</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

