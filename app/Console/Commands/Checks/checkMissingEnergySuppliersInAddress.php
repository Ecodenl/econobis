<?php

namespace App\Console\Commands\Checks;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkMissingEnergySuppliersInAddress extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revenue:checkMissingEnergySuppliersInAddress {--recover=false}';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find missing energy suppliers in address';

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

        $energySupplierUnknown = EnergySupplier::where('name', 'Onbekend')->first();
        $energySupplierTypeElectriciteit = EnergySupplierType::where('name', 'Electriciteit')->first();

        $missingEnergySuppliersInAddressData = [];

        $revenuesKwh = RevenuesKwh::where('status', '!=', 'processed')->get();
        // alle revenues kwh controleren die nog niet verwerkt zijn
        foreach($revenuesKwh as $revenueKwh) {

            // alle parts controleren op volgorde van begindatum (bij een revenue)
            $revenuePartsKwh = $revenueKwh->partsKwh()->orderBy('date_begin')->get();
            foreach($revenuePartsKwh as $partKwh) {
                $revenueDistributionPartsKwh = $partKwh->distributionPartsKwh;

                // alle distribution parts kwh controleren (bij een part)
                foreach($revenueDistributionPartsKwh as $distributionPartKwh) {
                    $address = $distributionPartKwh->distributionKwh->participation->address;
                    // er moet een address zijn bij participation
                    if ($address) {

                        // Controleer of er een addressEnergySupplier te vinden is binnen part periode
                        $addressEnergySupplierInAPeriod = $this->getAddressEnergySupplierInAPeriod($address->id, $distributionPartKwh->partsKwh->date_begin, $distributionPartKwh->partsKwh->date_end);
                        if(!$addressEnergySupplierInAPeriod){

                            // Missing addressEnergySupplier, dan melding maken en verzamelen in array voor in mail
                            $firstNextAddressEnergySupplier = $this->getFirstNextAddressEnergySupplier($address->id, $distributionPartKwh->partsKwh->date_begin);
                            $missingEnergySuppliersInAddress = [
                                'address_id' => $address->id,
                                'contact_id' => $address->contact->id,
                                'revenue_id' => $revenueKwh->id,
                                'revenue_date_begin' => $revenueKwh->date_begin,
                                'revenue_date_end' => $revenueKwh->date_end,
                                'parts_id' => $distributionPartKwh->parts_id,
                                'part_date_begin' => $distributionPartKwh->partsKwh->date_begin,
                                'part_date_end' => $distributionPartKwh->partsKwh->date_end,
                                'distribution_parts_id' => $distributionPartKwh->id,
                                'distribution_id' => $distributionPartKwh->distribution_id,
                                'es_id' => $distributionPartKwh->es_id,
                                'first_next_member_since' => $firstNextAddressEnergySupplier ? $firstNextAddressEnergySupplier->member_since : "geen",
                            ];
                            $missingEnergySuppliersInAddressData[] = $missingEnergySuppliersInAddress;

                            // Indien meteen herstel, dan gaan we addressEnergySupplier record aanmaken vanaf begindatum part t/m dag voor eerstvolgende addressEnergySupplier die er wel is
                            // (type Electriciteit)
                            if($doRecover){
                                $addressEnergySupplierData = [
                                    'address_id' => $address->id,
                                    'energy_supplier_id' => $energySupplierUnknown->id,
                                    'es_number' => '',
                                    'energy_supply_type_id' => $energySupplierTypeElectriciteit ? $energySupplierTypeElectriciteit->id : 2,
                                    'member_since' => $distributionPartKwh->partsKwh->date_begin,
                                    'end_date' => $firstNextAddressEnergySupplier ? Carbon::parse($firstNextAddressEnergySupplier->member_since)->subDay(1)->format('Y-m-d') : null,
                                ];
                                $addressEnergySupplierNew = new AddressEnergySupplier();
                                $addressEnergySupplierNew->fill($addressEnergySupplierData);
                                $addressEnergySupplierController = new AddressEnergySupplierController();
                                // voor zekerheid nog even controleren met validateAddressEnergySupplier
                                $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplierNew, false);

                                if($response){
                                    Log::info('Koppeling adres met energieleverancier ' . $energySupplierUnknown->name . ' NIET gemaakt.');
                                    Log::info($response);
                                } else {
                                    $addressEnergySupplierNew->save();
                                }
                            }

                        }

                        if($doRecover) {

                            // Hier corrigeren is_visible / is_energy_supplier_switch indien distributionpart nog niet Verwerkt en energieleverancier is Onbekend
                            if ($distributionPartKwh->status != 'processed' && $distributionPartKwh->es_id == $energySupplierUnknown->id) {
                                // indien geen volgende part, dan laatste part voor energieleverancier Onbekend altijd op is_visible = true en is_energy_supplier_switch = true
                                if (!$partKwh->next_revenue_parts_kwh) {
                                    if ($distributionPartKwh->is_visible != true || $distributionPartKwh->is_energy_supplier_switch != true) {
//                                    Log::info('Geen volgende part - Correctie (revenueId: ' . $distributionPartKwh->revenue_id . ') distributionPartKwh ' . $distributionPartKwh->id . ' (' . $distributionPartKwh->is_visible . '|' . $distributionPartKwh->is_energy_supplier_switch . ') => (1|1)');
                                        $distributionPartKwh->is_visible = true;
                                        $distributionPartKwh->is_energy_supplier_switch = true;
                                        if ($doRecover) {
                                            $distributionPartKwh->save();
                                        }
                                    }
                                } else {
                                    // indien wel volgende part, dan check of bij dezelfde distribution_id energieleverancier niet meer Onbekend is, in dat geval ook is_visible = true en is_energy_supplier_switch = true
                                    $nextDistributionPartKwh = RevenueDistributionPartsKwh::where('revenue_id', $distributionPartKwh->revenue_id)
                                        ->where('parts_id', $partKwh->next_revenue_parts_kwh->id)
                                        ->where('distribution_id', $distributionPartKwh->distribution_id)
                                        ->first();
                                    if (!$nextDistributionPartKwh || $nextDistributionPartKwh->es_id != $energySupplierUnknown->id) {
                                        if ($distributionPartKwh->is_visible != true || $distributionPartKwh->is_energy_supplier_switch != true) {
//                                        Log::info('Wel volgende part andere ES - Correctie (revenueId: ' . $distributionPartKwh->revenue_id . ') distributionPartKwh ' . $distributionPartKwh->id . ' (' . $distributionPartKwh->is_visible . '|' . $distributionPartKwh->is_energy_supplier_switch . ') => (1|1)');
                                            $distributionPartKwh->is_visible = true;
                                            $distributionPartKwh->is_energy_supplier_switch = true;
                                            if ($doRecover) {
                                                $distributionPartKwh->save();
                                            }
                                        }
                                    } else {
                                        if ($partKwh->is_last_revenue_parts_kwh || $partKwh->is_end_of_year_revenue_parts_kwh) {
                                            if ($distributionPartKwh->is_visible != true || $distributionPartKwh->is_energy_supplier_switch != false) {
//                                            Log::info('Wel volgende part en heeft ook ES onbekend (LP of EOY) - Correctie (revenueId: ' . $distributionPartKwh->revenue_id . ') distributionPartKwh ' . $distributionPartKwh->id . ' (' . $distributionPartKwh->is_visible . '|' . $distributionPartKwh->is_energy_supplier_switch . ') => (1|0)');
                                                $distributionPartKwh->is_visible = true;
                                                $distributionPartKwh->is_energy_supplier_switch = false;
                                                if ($doRecover) {
                                                    $distributionPartKwh->save();
                                                }
                                            }
                                        } else {
                                            if ($distributionPartKwh->is_visible != false || $distributionPartKwh->is_energy_supplier_switch != false) {
//                                            Log::info('Wel volgende part en heeft ook ES onbekend (geen LP of EOY) - Correctie (revenueId: ' . $distributionPartKwh->revenue_id . ') distributionPartKwh ' . $distributionPartKwh->id . ' (' . $distributionPartKwh->is_visible . '|' . $distributionPartKwh->is_energy_supplier_switch . ') => (0|0)');
                                                $distributionPartKwh->is_visible = false;
                                                $distributionPartKwh->is_energy_supplier_switch = false;
                                                if ($doRecover) {
                                                    $distributionPartKwh->save();
                                                }
                                            }
                                        }

                                    }
                                }
                            }
                        }

                    }
                }
            }
        }

        // Missing addressEnergySupplier gevonden, dan deze mailen
        if(!empty($missingEnergySuppliersInAddressData)){
            $this->sendMail($missingEnergySuppliersInAddressData, $doRecover);
            Log::info('Missing energy suppliers in address gevonden, mail gestuurd');
        } else {
            Log::info('Geen missing energy suppliers in address gevonden');
        }

        Log::info('Procedure check op missing energy suppliers in address klaar');
    }

    private function sendMail($missingEnergySuppliersInAddressData, $doRecover)
    {
        $subject = 'Missing energy suppliers in address ! (' . count($missingEnergySuppliersInAddressData) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $missingEnergySuppliersInAddressDataHtml = "";
        if($doRecover){
            $missingEnergySuppliersInAddressDataHtml .= "<p>MET HERSTEL!</p>";
        }

        foreach($missingEnergySuppliersInAddressData as $missingEnergySuppliersInAddressItem) {
            $missingEnergySuppliersInAddressDataHtml .=
                "<p>Address Id: " . $missingEnergySuppliersInAddressItem['address_id'] . ", " .
                "Contact Id: " . $missingEnergySuppliersInAddressItem['contact_id'] . ", " .
                "Revenue Id: " . $missingEnergySuppliersInAddressItem['revenue_id'] . ", " .
                "Revenue begin datum: " . $missingEnergySuppliersInAddressItem['revenue_date_begin'] . ", " .
                "Revenue eind datum: " . $missingEnergySuppliersInAddressItem['revenue_date_end'] . ", " .
                "Part Id: " . $missingEnergySuppliersInAddressItem['parts_id'] . ", " .
                "Part begin datum: " . $missingEnergySuppliersInAddressItem['part_date_begin'] . ", " .
                "Part eind datum: " . $missingEnergySuppliersInAddressItem['part_date_end'] . ", " .
                "Distribution part Id: " . $missingEnergySuppliersInAddressItem['distribution_parts_id'] . ", " .
                "Distribution Id: " . $missingEnergySuppliersInAddressItem['distribution_id'] . ", " .
                "EnergySupplier Id: " . $missingEnergySuppliersInAddressItem['es_id'] . ", " .
                "FirstNext klantsinds datum: " . $missingEnergySuppliersInAddressItem['first_next_member_since'] . "</p>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $missingEnergySuppliersInAddressDataHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getAddressEnergySupplierInAPeriod($addressId, $dateBegin, $dateEnd)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', $addressId)
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
    private function getFirstNextAddressEnergySupplier($addressId, $dateBegin)
    {
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', $addressId)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($dateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($dateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '>', $dateBegin);
                    });
            })->orderBy('member_since', 'asc')->first();
        return $addressEnergySupplier;
    }

}

