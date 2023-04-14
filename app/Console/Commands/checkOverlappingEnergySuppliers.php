<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Helpers\Email\EmailHelper;
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

        $overlappingAddressIds = "";

        $addresses = Address::all();

        foreach($addresses as $address) {

            $addressEnergySuppliers = $address->addressEnergySuppliers()->get();
            /* only do the check when more than one addressEnergySupplier */
            if ($addressEnergySuppliers->count() > 1) {
                /* check for each addressEnergySupplier if the start date is between start and enddata, or just after the startdate if no enddate, of another addressEnergySupplier */
                foreach($addressEnergySuppliers as $addressEnergySupplier) {
                    $overlappingenergySuppliers =
                        $address->addressEnergySuppliers()
                            ->where(function ($query) use ($addressEnergySupplier) {
                                /* where the member_since date is between the member_since and end_date */
                                $query->whereBetween('member_since', [$addressEnergySupplier->member_since, $addressEnergySupplier->end_date])
                                    ->whereNull('deleted_at')
                                    ->where('id', '!=', $addressEnergySupplier->id);
                            })->orWhere(function ($query) use ($addressEnergySupplier) {
                                /* where the member_since date is same or after the member_since and end_date is not set */
                                $query->where('member_since', '>=', $addressEnergySupplier->member_since)
                                    ->whereNull('end_date')
                                    ->whereNull('deleted_at')
                                    ->where('id', '!=', $addressEnergySupplier->id);
                            })->get();
                    $overlappingenergySuppliersCount = $overlappingenergySuppliers->count();
                }

                if($overlappingenergySuppliersCount > 0) {
                    $overlappingAddressIds .= $address->id . ',';
                }

                //todo, delete if above query is correct
//                foreach($addressEnergySuppliers as $addressEnergySupplier) {
//                    $overlappingenergySuppliers =
//                        $address->addressEnergySuppliers()
//                            ->whereBetween('member_since', [$addressEnergySupplier->member_since, $addressEnergySupplier->end_date])
//                            ->where('id', '!=', $addressEnergySupplier->id)
//                            ->get();
//                    $overlappingenergySuppliersCount = $overlappingenergySuppliers->count();
//                }
//
//                if($overlappingenergySuppliersCount > 0) {
//                    dump('adres id: ' . $address->id . '| aantal: ' . $overlappingenergySuppliersCount);
//                }
            }
        }

        if($overlappingAddressIds != "") {
            $subject = 'Overlappende energie leveranciers! - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            Log::info($overlappingAddressIds);

            $this->sendMail($subject, $overlappingAddressIds);
        }

        Log::info('Procedure of energieleveranciers overlappen klaar');
    }

    private function sendMail($subject, $overlappingAddressIds)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $mail = Mail::to('patrick@xaris.nl');
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Overlappende energie leveranciers!</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p><p>De volgende adres id\'s hebben overlappende energie leveranciers:<br>' . $overlappingAddressIds . '</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
