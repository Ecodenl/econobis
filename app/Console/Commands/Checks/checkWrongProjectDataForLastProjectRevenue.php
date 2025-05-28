<?php

namespace App\Console\Commands\Checks;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueCategory;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongProjectDataForLastProjectRevenue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:checkWrongProjectDataForLastProjectRevenue';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op ongeldige projectgegevens inzake laatste opbrengstverdelingen';

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
        Log::info('Procedure check op ongeldige projectgegevens inzake laatste opbrengstverdelingen gestart');

        $wrongProjectsDataForLastProjectRevenueEuro = [];
        $wrongProjectsDataForLastProjectRedemptionEuro = [];
        $wrongProjectsDataForLastProjectRevenueKwh1 = [];
        $wrongProjectsDataForLastProjectRevenueKwh2 = [];

        $projects = Project::all();

        $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro' )->first()->id;
        $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;

        foreach($projects as $project) {

            $confirmedProjectRevenuesEuro = $project->projectRevenues()->where('category_id', $projectRevenueCategoryRevenueEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');
            $dateEnd = $confirmedProjectRevenuesEuro->count() > 0 ? Carbon::parse($confirmedProjectRevenuesEuro->first()->date_end) : null;
            $dateEndPlusOneDay = $dateEnd ? $dateEnd->addDay(1)->format('Y-m-d') : 'onbekend';

            //Geen date_interest_bearing maar wel confirmed projectRevenues van category 2 revenueEuro
            if (
                $project->date_interest_bearing === null &&
                $confirmedProjectRevenuesEuro->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => 'geen',
                    'expected_date' => $dateEndPlusOneDay,
                ];
                $wrongProjectsDataForLastProjectRevenueEuro[] = $wrongProjectsDataForLastProjectRevenue;
            }
            //Wel date_interest_bearing maar geen confirmed projectRevenues van category 2 revenueEuro
            if (
                $project->date_interest_bearing !== null &&
                $confirmedProjectRevenuesEuro->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => $project->date_interest_bearing,
                    'expected_date' => 'geen',
                ];
                $wrongProjectsDataForLastProjectRevenueEuro[] = $wrongProjectsDataForLastProjectRevenue;
            }

            //Wel date_interest_bearing en projectRevenues van category 2 revenueEuro, maar nieuwe startdatum is niet goed
            if ($confirmedProjectRevenuesEuro->count() > 0) {
                if (
                    $project->date_interest_bearing !== null &&
                    $confirmedProjectRevenuesEuro->count() > 0 &&
                    Carbon::parse($project->date_interest_bearing)->format('Y-m-d') != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue = [
                        'project_id' => $project->id,
                        'date_in_project' => $project->date_interest_bearing,
                        'expected_date' => $dateEndPlusOneDay,
                    ];
                    $wrongProjectsDataForLastProjectRevenueEuro[] = $wrongProjectsDataForLastProjectRevenue;
                }
            }

            $confirmedProjectRedemptionsEuro = $project->projectRevenues()->where('category_id', $projectRevenueCategoryRedemptionEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');
            //Geen date_interest_bearing_redemption maar wel confirmed projectRevenues van category 3 redemptionEuro
            if (
                $project->date_interest_bearing_redemption === null &&
                $confirmedProjectRedemptionsEuro->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => 'geen',
                    'expected_date' => $dateEndPlusOneDay,
                ];
                $wrongProjectsDataForLastProjectRedemptionEuro[] = $wrongProjectsDataForLastProjectRevenue;
            }
            //wel date_interest_bearing_redemption maar geen confirmed projectRevenues van category 3 redemptionEuro
            if(
                $project->date_interest_bearing_redemption !== null &&
                $confirmedProjectRedemptionsEuro->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => $project->date_interest_bearing,
                    'expected_date' => 'geen',
                ];
                $wrongProjectsDataForLastProjectRedemptionEuro[] = $wrongProjectsDataForLastProjectRevenue;
            }
            //wel date_interest_bearing_redemption en confirmed projectRevenues van category 3, maar nieuwe startdatum is niet goed
            if(
                $confirmedProjectRedemptionsEuro->count() > 0
            ) {
                $dateEnd = Carbon::parse($confirmedProjectRedemptionsEuro->first()->date_end);
                $dateEndPlusOneDay = $dateEnd->addDay(1)->format('Y-m-d');
                if (
                    $project->date_interest_bearing_redemption !== null &&
                    $confirmedProjectRedemptionsEuro->count() > 0 &&
                    Carbon::parse($project->date_interest_bearing_redemption)->format('Y-m-d') != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue = [
                        'project_id' => $project->id,
                        'date_in_project' => $project->date_interest_bearing,
                        'expected_date' => $dateEndPlusOneDay,
                    ];
                    $wrongProjectsDataForLastProjectRedemptionEuro[] = $wrongProjectsDataForLastProjectRevenue;
                }
            }

            $confirmedRevenuesKwh = $project->revenuesKwh()->where('confirmed', 1)->orderBy('date_end', 'desc');
            //Geen date_interest_bearing_kwh maar wel confirmed revenuesKwh
            if (
                $project->date_interest_bearing_kwh === null &&
                $confirmedRevenuesKwh->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => 'geen',
                    'expected_date' => $dateEndPlusOneDay,
                ];
                $wrongProjectsDataForLastProjectRevenueKwh1[] = $wrongProjectsDataForLastProjectRevenue;
            }

            //wel date_interest_bearing_kwh maar geen confirmed revenuesKwh
            if(
                $project->date_interest_bearing_kwh !== null &&
                $confirmedRevenuesKwh->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue = [
                    'project_id' => $project->id,
                    'date_in_project' => $project->date_interest_bearing,
                    'expected_date' => 'geen',
                ];
                $wrongProjectsDataForLastProjectRevenueKwh1[] = $wrongProjectsDataForLastProjectRevenue;
            }

            //wel date_interest_bearing_kwh en revenuesKwh, maar nieuwe startdatum is niet goed
            if(
                $confirmedRevenuesKwh->count() > 0
            ) {
                $dateEnd = Carbon::parse($confirmedRevenuesKwh->first()->date_end);
                $dateEndPlusOneDay = $dateEnd->addDay(1)->format('Y-m-d');
                if (
                    $project->date_interest_bearing_kwh !== null &&
                    Carbon::parse($project->date_interest_bearing_kwh)->format('Y-m-d') != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue = [
                        'project_id' => $project->id,
                        'date_in_project' => $project->date_interest_bearing,
                        'expected_date' => $dateEndPlusOneDay,
                    ];
                    $wrongProjectsDataForLastProjectRevenueKwh1[] = $wrongProjectsDataForLastProjectRevenue;
                }
            }

            //wel date_interest_bearing_kwh en revenuesKwh, maar kwh_start_high_next_revenue of kwh_start_low_next_revenue is niet goed
            if(
                $project->date_interest_bearing_kwh !== null &&
                $confirmedRevenuesKwh->count() > 0 &&
                (
                    $project->kwh_start_high_next_revenue != $confirmedRevenuesKwh->first()->kwh_end_high ||
                    $project->kwh_start_low_next_revenue != $confirmedRevenuesKwh->first()->kwh_end_low
                )
            ) {
                $wrongProjectsDataForLastProjectRevenue2 = [
                    'project_id' => $project->id,
                    'kwh_start_high_next_in_project' => $project->kwh_start_high_next_revenue,
                    'expected_kwh_start_high_next' => $confirmedRevenuesKwh->first()->kwh_end_high,
                    'kwh_start_low_next_in_project' => $project->kwh_start_low_next_revenue,
                    'expected_kwh_start_low_next' => $confirmedRevenuesKwh->first()->kwh_end_low,
                ];
                $wrongProjectsDataForLastProjectRevenueKwh2[] = $wrongProjectsDataForLastProjectRevenue2;
            }
        }

        if(!empty($wrongProjectsDataForLastProjectRevenueEuro)
            || !empty($wrongProjectsDataForLastProjectRedemptionEuro)
            || !empty($wrongProjectsDataForLastProjectRevenueKwh1)
            || !empty($wrongProjectsDataForLastProjectRevenueKwh2)
        ) {
            $this->sendMail($wrongProjectsDataForLastProjectRevenueEuro, $wrongProjectsDataForLastProjectRedemptionEuro, $wrongProjectsDataForLastProjectRevenueKwh1, $wrongProjectsDataForLastProjectRevenueKwh2);
            Log::info('Ongeldige projectgegevens inzake laatste opbrengstverdelingen deelnemers gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige projectgegevens inzake laatste opbrengstverdelingen deelnemers gevonden');
        }

        Log::info('Procedure check op ongeldige projectgegevens inzake laatste opbrengstverdelingen klaar');
    }

    private function sendMail($wrongProjectsDataForLastProjectRevenueEuro, $wrongProjectsDataForLastProjectRedemptionEuro, $wrongProjectsDataForLastProjectRevenueKwh1, $wrongProjectsDataForLastProjectRevenueKwh2)
    {
        $subject = 'Ongeldige projectgegevens inzake laatste opbrengstverdelingen! (' . count($wrongProjectsDataForLastProjectRevenueEuro) . '/' . count($wrongProjectsDataForLastProjectRedemptionEuro) . '/' . count($wrongProjectsDataForLastProjectRevenueKwh1) . '/' . count($wrongProjectsDataForLastProjectRevenueKwh2) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongProjectsDataForLastProjectRevenueHtml = "";
        if(!empty($wrongProjectsDataForLastProjectRevenueEuro)) {
            $wrongProjectsDataForLastProjectRevenueHtml .= "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Euro):<br>";
            foreach ($wrongProjectsDataForLastProjectRevenueEuro as $item) {
                $wrongProjectsDataForLastProjectRevenueHtml .=
                    "Project Id: " . $item['project_id'] . ", " .
                    "Datum in project: " . $item['date_in_project'] . ", " .
                    "Verwachte datum: " . $item['expected_date'] . "</br>"
                ;
            }
            $wrongProjectsDataForLastProjectRevenueHtml .= "</p>";
        }
        if(!empty($wrongProjectsDataForLastProjectRedemptionEuro)) {
            $wrongProjectsDataForLastProjectRevenueHtml .= "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Aflossing):<br>";
            foreach ($wrongProjectsDataForLastProjectRedemptionEuro as $item) {
                $wrongProjectsDataForLastProjectRevenueHtml .=
                    "Project Id: " . $item['project_id'] . ", " .
                    "Datum in project: " . $item['date_in_project'] . ", " .
                    "Verwachte datum: " . $item['expected_date'] . "</br>"
                ;
            }
            $wrongProjectsDataForLastProjectRevenueHtml .= "</p>";
        }
        if(!empty($wrongProjectsDataForLastProjectRevenueKwh1)) {
            $wrongProjectsDataForLastProjectRevenueHtml .= "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Kwh):<br>";
            foreach ($wrongProjectsDataForLastProjectRevenueKwh1 as $item) {
                $wrongProjectsDataForLastProjectRevenueHtml .=
                    "Project Id: " . $item['project_id'] . ", " .
                    "Datum in project: " . $item['date_in_project'] . ", " .
                    "Verwachte datum: " . $item['expected_date'] . "</br>"
                ;
            }
        }
        if(!empty($wrongProjectsDataForLastProjectRevenueKwh2)) {
            foreach ($wrongProjectsDataForLastProjectRevenueKwh2 as $item) {
                $wrongProjectsDataForLastProjectRevenueHtml .=
                    "Project Id: " . $item['project_id'] . ", " .
                    "Start hoog in project: " . $item['kwh_start_high_next_in_project'] . ", " .
                    "Verwachte start hoog : " . $item['expected_kwh_start_high_next'] . ", " .
                    "Start laag in project : " . $item['kwh_start_low_next_in_project'] . ", " .
                    "Verwachte start laag: " . $item['expected_kwh_start_low_next'] . "</br>"
                ;
            }
            $wrongProjectsDataForLastProjectRevenueHtml .= "</p>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $wrongProjectsDataForLastProjectRevenueHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
