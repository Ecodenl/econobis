<?php

namespace App\Console\Commands\Checks;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectType;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongProjectPCRSettings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:checkWrongProjectPCRSettings {--recover=false}';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check wrong Project PCR settings';

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

        Log::info('Procedure check op ongeldige projectgegevens inzake PCR instellingen gestart' . ($doRecover ? ' MET HERSTEL!' : ''));

        $projectsWithWrongPCRSettings = [];

        $projects = Project::all();

        $counter = 1;


        $projectType = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;
        // Regular expression to match Dutch postal codes in the format "1234AB" or "1234"
        $patternPostalcodes =  '/^[1-9][0-9]{3}[a-zA-Z]{0,2}(,[1-9][0-9]{3}[a-zA-Z]{0,2})*$/';
        $patternPostalcode = '/^[1-9][0-9]{3}[a-zA-Z]{2}$/';
        $patternAddressNumberSeries = '/^[0-9a-zA-Z,:-]*$/';

        foreach($projects as $project) {
            if ($project->project_type_id === $projectType){
                if ($project->postalcode_link == "" || !preg_match($patternPostalcodes, $project->postalcode_link)) {
                    //Dit is een PCR project, en de postalcode_link is leeg of niet geldig
                    $projectsWithWrongPCRSettings[$counter]['id'] = $project->id;
                    $projectsWithWrongPCRSettings[$counter]['reason'] = 'Dit is een PCR project en de postalcode_link is leeg.';

                    if($doRecover && $project->postalcode_link == ""){
                        // Hier verzamelen van alle deelnemer postcodes.
                        $postalCodesParticipations = [];
                        foreach ($project->participantsProject as $participantsProject){
                            if(!$participantsProject->address || $participantsProject->address->postal_code == ''){
                                //Dit is een PCR participantsProject zonder adres
                                $projectsWithWrongPCRSettings[$counter]['reason'] .= ' | Deelname ' . $participantsProject->id . ' ' . $participantsProject->contact->full_name . ' heeft geen adres of postcode is leeg.';
                            } else {
                                $postalCodesParticipations[] = substr($participantsProject->address->postal_code, 0, 4);
                            }
                        }
                        if(count($postalCodesParticipations) > 0 ){
                            $newPostalcodeLink = implode(',', array_unique($postalCodesParticipations) );
                            $projectsWithWrongPCRSettings[$counter]['reason'] .= ' | Bepaald postcoderoosgebied: ' . $newPostalcodeLink . '.';
                            $project->postalcode_link = $newPostalcodeLink;
                            $project->save();
                        } else {
                            $projectsWithWrongPCRSettings[$counter]['reason'] .= ' | Geen postcodes gevonden om toe te voegen aan postcoderoosgebied.';
                        }
                    }

                }
            } else if ($project->is_sce_project){
                if ($project->check_postalcode_link) {
                    //Dit is een SCE project met check postalcodegebied
                    if ($project->postalcode_link == "" || !preg_match($patternPostalcodes, $project->postalcode_link)) {
                        //De postalcode_link is leeg of niet geldig
                        $projectsWithWrongPCRSettings[$counter]['id'] = $project->id;
                        $projectsWithWrongPCRSettings[$counter]['reason'] = 'Dit is een SCE project en de postalcode_link is leeg of niet geldig';
                    } else if (preg_match($patternPostalcode, $project->postalcode_link)) {
                        //De postalcode_link is een enkele postcode
                        if ($project->address_number_series == "" || !preg_match($patternAddressNumberSeries, $project->address_number_series)) {
                            //De address_number_series is leeg of niet geldig
                            $projectsWithWrongPCRSettings[$counter]['id'] = $project->id;
                            $projectsWithWrongPCRSettings[$counter]['reason'] = 'Dit is een SCE project en de postalcode_link is een enkele postcode, maar address_number_series is leeg of niet geldig';
                        }
                    } else if ($project->address_number_series != "") {
                        //De postalcode_link is gevuld met meerdere postcodes en de address_number_series is niet leeg
                        $projectsWithWrongPCRSettings[$counter]['id'] = $project->id;
                        $projectsWithWrongPCRSettings[$counter]['reason'] = 'Dit is een SCE project en de postalcode_link is gevuld met meerdere postcodes, maar de address_number_series is niet leeg';
                    }
                }
            } else if (($project->postalcode_link != "" || $project->address_number_series != "")) {
                $projectsWithWrongPCRSettings[$counter]['id'] = $project->id;
                $projectsWithWrongPCRSettings[$counter]['reason'] = 'Dit is geen PCR of SCE project maar postalcode_link of address_number_series is/zijn ingevuld';
            }
            $counter++;
        }

        if(!empty($projectsWithWrongPCRSettings)) {
            $this->sendMail($projectsWithWrongPCRSettings, $doRecover);
            Log::info('Ongeldige projectgegevens inzake PCR instellingen, mail gestuurd');
        } else {
            Log::info('Geen ongeldige projectgegevens inzake PCR instellingen gevonden');
        }

        Log::info('Procedure check op ongeldige projectgegevens inzake PCR instellingen klaar');

    }

    private function sendMail($projectsWithWrongPCRSettings, $doRecover)
    {
        $subject = 'Ongeldige projectgegevens inzake PCR instellingen! (' . count($projectsWithWrongPCRSettings) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $projectsWithWrongPCRSettingsHtml = "<p>De volgende project id's hebben ongeldige projectgegevens inzake PCR instellingen:</p>";
        if($doRecover){
            $projectsWithWrongPCRSettingsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($projectsWithWrongPCRSettings as $projectWithWrongPCRSettings) {
            $projectsWithWrongPCRSettingsHtml .=
                "Project Id: " . $projectWithWrongPCRSettings['id'] . "</br>" .
                "Fout reden: " . $projectWithWrongPCRSettings['reason'] . "</br><br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $projectsWithWrongPCRSettingsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}

