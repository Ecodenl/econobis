<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class conversionPortalRegistrationCode extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:conversionPortalRegistrationCode';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herstel ontbrekende portal registration codes';

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
        $this->doConversionPortalRegistrationCode();
        dd('Einde Herstel ontbrekende portal registration codes.');
    }

    /**
     * @param string $searchField1
     * @param string $searchField2
     *
     * @return array
     */
    public function doConversionPortalRegistrationCode()
    {
        print_r("Start Herstel ontbrekende portal registration codes.\n");
        $contacts = Contact::all();
        foreach ($contacts as $contact){
            if($contact->type_id == 'person' && !$contact->portal_registration_code && $contact->portalUser()->count() == 0)
            {
                $contact->portal_registration_code = Str::random(32);
                $contact->save();
                print_r("Contact ". $contact->id . " voorzien van portal registration code.\n");
            }
        }
    }
}
