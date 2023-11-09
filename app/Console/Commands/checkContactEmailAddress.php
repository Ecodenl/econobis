<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkContactEmailAddress extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkContactEmailAddress';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check EmailAddress contact';

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
        Log::info("Start Check Emailaddesses bij contacten.");
        foreach(Contact::all() as $contact) {
            foreach($contact->emailAddresses as $emailAddress) {
                $emailAddressZonderVoorloopSpatiesLengte = strlen( ltrim( $emailAddress->email) );
                $emailAddressZonderSpatiesAchteraanLengte = strlen( rtrim ( $emailAddress->email) );
                $emailAddressLengte = strlen( $emailAddress->email );

                if( $emailAddressZonderVoorloopSpatiesLengte != $emailAddressLengte )
                {
                    Log::info("Emailadress: " . $emailAddress->email . " bij contact " . $contact->id . " bevat voorloop spaties.");
                }
                if($emailAddressZonderSpatiesAchteraanLengte != $emailAddressLengte)
                {
                    Log::info("Emailadress: " . $emailAddress->email . " bij contact " . $contact->id . " bevat spaties achteraan.");
                }
            }
        }
        Log::info('Einde Check Emailaddesses bij contacten.');
    }


}
