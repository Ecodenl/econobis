<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Helpers\Email\EmailHelper;
use App\Http\Controllers\Api\AddressEnergySupplier\AddressEnergySupplierController;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
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

        $overlappingAddresses = [];

        $addresses = Address::all();

        $addressEnergySupplierController = new AddressEnergySupplierController();

        foreach($addresses as $address) {

            $addressEnergySuppliers = $address->addressEnergySuppliers()->get();
            /* only do the check when more than one addressEnergySupplier */
            if ($addressEnergySuppliers->count() > 1) {
                /* check for each addressEnergySupplier if the start date is between start and enddata, or just after the startdate if no enddate, of another addressEnergySupplier */
                foreach($addressEnergySuppliers as $addressEnergySupplier) {
                    $response = $addressEnergySupplierController->validateAddressEnergySupplier($addressEnergySupplier, false);

                    if($response){
//                        Log::info('Fout bij adres met energieleverancier ' . $addressEnergySupplier->name . ' !');
//                        Log::info($response);
                        $overlappingAddresses[] = $address->contact->id . '/'. $address->id ;
                        break;
                    }
                }
            }
        }

        if(!empty($overlappingAddresses)) {
            $this->sendMail($overlappingAddresses);
            Log::info('Overlappende energie leveranciers gevonden, mail gestuurd');
        } else {
            Log::info('Geen overlappende energie leveranciers gevonden');
        }

        Log::info('Procedure of energieleveranciers overlappen klaar');
    }

    private function sendMail($overlappingAddresses)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $subject = 'Overlappende energie leveranciers! (' . count($overlappingAddresses) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $mail = Mail::to($this->mailTo);
        $htmlBody = "<!DOCTYPE html><html><head><meta http-equiv='content-type' content='text/html;charset=UTF-8'/><title>".$subject."</title></head><body><p>". $subject . "</p><p>De volgende contact/adres id's hebben overlappende energie leveranciers:<br>" . implode(', ', $overlappingAddresses) . "</p></body></html>";

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
