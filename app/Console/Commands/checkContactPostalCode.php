<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class checkContactPostalCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkContactPostalCode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check PostalCode contact';

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
        Log::info("Start Check postcodes bij contacten.");
        foreach(Contact::all() as $contact) {
            foreach($contact->addresses as $address) {
                if( !empty($address->postal_code) && $address->country_id == 'NL' )
                {
                        if (!$this->postalCodeNLCheck($address->postal_code)) {
                            Log::info("ContactId: (" . $contact->id . ", AddressId " . $address->id . ": Nederlands postcode NIET OK: " . $address->postal_code . ".");
                        }
                }
            }
        }
        Log::info('Einde Check postcodes bij contacten.');
    }

    protected function postalCodeNLCheck($postalCode)
    {
        $remove = str_replace(" ","", $postalCode);
        $upper = strtoupper($remove);
//                        value.search(/^[1-9][0-9]{3}[ ]?([A-RT-Za-rt-z][A-Za-z]|[sS][BCbcE-Re-rT-Zt-z])$/)
        if( preg_match("/^\W*[1-9]{1}[0-9]{3}\W*[a-zA-Z]{2}\W*$/",  $upper)) {
            return true;
        } else {
            return false;
        }
    }
}
