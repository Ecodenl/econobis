<?php

namespace App\Console\Commands\Checks;

use App\Eco\Address\Address;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkOverlappingEnergySuppliers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'addressEnergySupplier:checkOverlappingEnergySuppliers';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check of energieleveranciers overlappen';

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
        Log::info('Procedure of energieleveranciers overlappen gestart');

        $invalidPeriodAddressEnergySuppliers = [];
        $overlappingAddresses = [];

        $addresses = Address::all();

        $addressEnergySupplierController = new AddressEnergySupplierController();

        foreach($addresses as $address) {

            $addressEnergySuppliers = $address->addressEnergySuppliers()->get();

            /* check if there are invalid periods */
            foreach($addressEnergySuppliers as $addressEnergySupplier) {
                $memberSince = $addressEnergySupplier->member_since ? Carbon::parse($addressEnergySupplier->member_since)->format('Y-m-d') : '1900-01-01';;
                $endDate = $addressEnergySupplier->end_date ? Carbon::parse($addressEnergySupplier->end_date)->format('Y-m-d') : '9999-12-31';
                if($endDate < $memberSince){
                    $invalidPeriodAddressEnergySuppliers[] = $address->contact->id . '/'. $address->id ;
                }

            }
            /* only do the check for overlapping when there is more than one addressEnergySupplier */
            if ($addressEnergySuppliers->count() > 1) {
                /* check for each addressEnergySupplier if the start date is between start and enddata, or just after the startdate if no enddate, of another addressEnergySupplier */
                foreach($addressEnergySuppliers as $addressEnergySupplier) {
                    $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);

                    if($response){
                        $overlappingAddresses[] = ($address->contact ? $address->contact->id : 'onbekend') . '/'. $address->id ;
                        break;
                    }
                }
            }
        }

        if(!empty($invalidPeriodAddressEnergySuppliers) || !empty($overlappingAddresses)) {
            $this->sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses, );
            Log::info('Overlappende energie leveranciers gevonden, mail gestuurd');
        } else {
            Log::info('Geen overlappende energie leveranciers gevonden');
        }

        Log::info('Procedure of energieleveranciers overlappen klaar');
    }

    private function sendMail($invalidPeriodAddressEnergySuppliers, $overlappingAddresses)
    {
        $subject = 'Overlappende energie leveranciers! (' . count($invalidPeriodAddressEnergySuppliers) . '/' . count($overlappingAddresses) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $mail = Mail::to($this->mailTo);
        $htmlBody = "<!DOCTYPE html><html><head><meta http-equiv='content-type' content='text/html;charset=UTF-8'/><title>".$subject."</title></head><body><p>". $subject . "</p>";
        $htmlBody .= "<p>De volgende contact/adres id's hebben ongeldige energie leverancier periodes:<br>" . implode(', ', $invalidPeriodAddressEnergySuppliers) . "</p>";
        $htmlBody .= "<p>De volgende contact/adres id's hebben overlappende energie leverancier periodes:<br>" . implode(', ', $overlappingAddresses) . "</p>";
        $htmlBody .= "</body></html>";

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
