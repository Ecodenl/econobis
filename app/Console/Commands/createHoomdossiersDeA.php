<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Task\Task;
use App\Http\Controllers\Api\Contact\ContactController;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class createHoomdossiersDeA extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hoomdossier:createHoomDossiersDeA';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aanmaakscript hoomdossiers De-a, groep RREW Energiecoach | Wachtlijst 2021 (group id 352)';

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
        print_r("Start aanmaakscript hoomdossiers De-a, groep RREW Energiecoach | Wachtlijst 2021 (group id 352)\n");

        $cooperation = Cooperation::first();
        if (!$cooperation || empty($cooperation->hoom_link)) {
            print_r("Kan geen Hoomdossier aanmaken want er is bij cooperatie geen hoomdossier link gevonden.\n");
        } else {
            if($cooperation->name == 'deA'){
                $contactGroup352 = ContactGroup::find(352);
                foreach ($contactGroup352->getAllContacts() as $contact) {
                    $this->createHoomDossier($contact);
                }
            } else {
                print_r("Dit script uitsluitend nu voor cooperatie deA, NIET voor " . $cooperation->name . ".\n");
            }
        }

        dd("Einde aanmaakscript hoomdossiers De-a, groep RREW Energiecoach | Wachtlijst 2021 (group id 352)\n");
    }

    /**
     * @return bool
     */
    private function createHoomDossier($contact)
    {
        if (!$contact) {
            print_r("Kan geen Hoomdossier aanmaken want er is geen contact gevonden.\n");
            return;
        }
        if ($contact->hoom_account_id) {
            print_r("Koppeling hoomdossier bestaat al voor contact id: " . $contact->id . ".\n");
        } else {
            // aanmaken hoomdossier
            try {
                $contactController = new ContactController();
                $contactController->makeHoomdossier($contact);

                $note = "Hoomdossier aangemaakt voor contact " . $contact->full_name . " (" . $contact->number . ") via script.\n";
                $this->addTaskCheckContact($contact, $note);

            } catch (\Exception $errorHoomDossier) {
                print_r("Fout bij aanmaken hoomdossier contact " . $contact->full_name . " (" . $contact->number . ") via script.\n");
                Log::error($errorHoomDossier);

                $note = "Fout bij aanmaken hoomdossier voor contact " . $contact->full_name . " (" . $contact->number . ") via script.\n";
                $note .= "Controleer contactgegevens\n";
                $this->addTaskCheckContact($contact, $note);
            }
        }
    }

    protected function addTaskCheckContact(Contact $contact, $note)
    {
        Task::create([
            'note' => $note,
            'type_id' => 15,
            'contact_id' => $contact->id,
            'contact_group_id' => null,
            'finished' => false,
            'date_planned_start' => (new Carbon())->startOfDay(),
            'date_planned_finish' => null,
            'responsible_user_id' => null,
            'responsible_team_id' => 3,
            'intake_id' => null,
            'project_id' => null,
            'participation_project_id' => null,
            'order_id' => null,
        ]);
    }

}
