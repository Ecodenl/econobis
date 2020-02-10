<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use Illuminate\Console\Command;

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
        print_r("Start Check Emailaddesses bij contacten.\n");
        foreach(Contact::all() as $contact) {
            foreach($contact->emailAddresses as $emailAddress) {
                $emailAddressZonderVoorloopSpatiesLengte = strlen( ltrim( $emailAddress->email) );
                $emailAddressZonderSpatiesAchteraanLengte = strlen( rtrim ( $emailAddress->email) );
                $emailAddressLengte = strlen( $emailAddress->email );

                if( $emailAddressZonderVoorloopSpatiesLengte != $emailAddressLengte )
                {
                    print_r("Emailadress: " . $emailAddress->email . " bij contact " . $contact->id . " bevat voorloop spaties\n");
                }
                if($emailAddressZonderSpatiesAchteraanLengte != $emailAddressLengte)
                {
                    print_r("Emailadress: " . $emailAddress->email . " bij contact " . $contact->id . " bevat spaties achteraan\n");
                }
            }
        }
    dd('Einde Check Emailaddesses bij contacten.');
    }


}
