<?php

namespace App\Console\Commands;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueCategory;
use App\Helpers\Email\EmailHelper;
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
    protected $mailTo = 'wim.mosman@xaris.nl';

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

        $wrongProjectsDataForLastProjectRevenueEuroIds = [];
        $wrongProjectsDataForLastProjectRedemptionEuroIds = [];
        $wrongProjectsDataForLastProjectRevenueKwhIds = [];

        $projects = Project::all();

        $projectRevenueCategoryRevenueEuro = ProjectRevenueCategory::where('code_ref', 'revenueEuro' )->first()->id;
        $projectRevenueCategoryRedemptionEuro = ProjectRevenueCategory::where('code_ref', 'redemptionEuro' )->first()->id;

        foreach($projects as $project) {
            
            $confirmedProjectRevenuesEuro = $project->projectRevenues()->where('category_id', $projectRevenueCategoryRevenueEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');
            //Geen date_interest_bearing maar wel confirmed projectRevenues van category 2 revenueEuro
            if (
                $project->date_interest_bearing === null &&
                $confirmedProjectRevenuesEuro->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRevenueEuroIds[] = $project->id;
            }
            //Wel date_interest_bearing maar geen confirmed projectRevenues van category 2 revenueEuro
            if (
                $project->date_interest_bearing !== null &&
                $confirmedProjectRevenuesEuro->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenueEuroIds[] = $project->id;
            }

            //Wel date_interest_bearing en projectRevenues van category 2 revenueEuro, maar nieuwe startdatum is niet goed
            if ($confirmedProjectRevenuesEuro->count() > 0) {
                $dateEnd = Carbon::parse($confirmedProjectRevenuesEuro->first()->date_end);
                $dateEndPlusOneDay = $dateEnd->addDay(1)->format('Y-m-d');
                if (
                    $project->date_interest_bearing !== null &&
                    $confirmedProjectRevenuesEuro->count() > 0 &&
                    Carbon::parse($project->date_interest_bearing)->format('Y-m-d') != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenueEuroIds[] = $project->id;
                }
            }

            $confirmedProjectRedemptionsEuro = $project->projectRevenues()->where('category_id', $projectRevenueCategoryRedemptionEuro)->where('confirmed', 1)->orderBy('date_end', 'desc');
            //Geen date_interest_bearing_redemption maar wel confirmed projectRevenues van category 3 redemptionEuro
            if (
                $project->date_interest_bearing_redemption === null &&
                $confirmedProjectRedemptionsEuro->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRedemptionEuroIds[] = $project->id;
            }
            //wel date_interest_bearing_redemption maar geen confirmed projectRevenues van category 3 redemptionEuro
            if(
                $project->date_interest_bearing_redemption !== null &&
                $confirmedProjectRedemptionsEuro->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRedemptionEuroIds[] = $project->id;
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
                    $wrongProjectsDataForLastProjectRedemptionEuroIds[] = $project->id;
                }
            }

            $confirmedRevenuesKwh = $project->revenuesKwh()->where('confirmed', 1)->orderBy('date_end', 'desc');
            //Geen date_interest_bearing_kwh maar wel confirmed revenuesKwh
            if (
                $project->date_interest_bearing_kwh === null &&
                $confirmedRevenuesKwh->count() > 0
            ) {
                $wrongProjectsDataForLastProjectRevenueKwhIds[] = $project->id;
            }

            //wel date_interest_bearing_kwh maar geen confirmed revenuesKwh
            if(
                $project->date_interest_bearing_kwh !== null &&
                $confirmedRevenuesKwh->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenueKwhIds[] = $project->id;
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
                    $wrongProjectsDataForLastProjectRevenueKwhIds[] = $project->id;
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
                $wrongProjectsDataForLastProjectRevenueKwhIds[] = $project->id;
            }
        }

        if(!empty($wrongProjectsDataForLastProjectRevenueEuroIds)
        || !empty($wrongProjectsDataForLastProjectRedemptionEuroIds)
        || !empty($wrongProjectsDataForLastProjectRevenueKwhIds)
            ) {
            $this->sendMail(array_unique($wrongProjectsDataForLastProjectRevenueEuroIds), array_unique($wrongProjectsDataForLastProjectRedemptionEuroIds), array_unique($wrongProjectsDataForLastProjectRevenueKwhIds));
            Log::info('Ongeldige projectgegevens inzake laatste opbrengstverdelingen deelnemers gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige projectgegevens inzake laatste opbrengstverdelingen deelnemers gevonden');
        }

        Log::info('Procedure check op ongeldige projectgegevens inzake laatste opbrengstverdelingen klaar');
    }

    private function sendMail($wrongProjectsDataForLastProjectRevenueEuroIds, $wrongProjectsDataForLastProjectRedemptionEuroIds, $wrongProjectsDataForLastProjectRevenueKwhIds)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();

        $subject = 'Ongeldige projectgegevens inzake laatste opbrengstverdelingen! (' . count($wrongProjectsDataForLastProjectRevenueEuroIds) . '/' . count($wrongProjectsDataForLastProjectRedemptionEuroIds) . '/' . count($wrongProjectsDataForLastProjectRevenueKwhIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongProjectsDataForLastProjectRevenueHtml = "";
        if(!empty($wrongProjectsDataForLastProjectRevenueEuroIds)) {
            $wrongProjectsDataForLastProjectRevenueHtml .=
                "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Euro):<br>" . implode(', ', $wrongProjectsDataForLastProjectRevenueEuroIds) . "</p>";
        }
        if(!empty($wrongProjectsDataForLastProjectRedemptionEuroIds)) {
            $wrongProjectsDataForLastProjectRevenueHtml .=
                "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Aflossing):<br>" . implode(', ', $wrongProjectsDataForLastProjectRedemptionEuroIds) . "</p>";
        }
        if(!empty($wrongProjectsDataForLastProjectRevenueKwhIds)) {
            $wrongProjectsDataForLastProjectRevenueHtml .=
                "<p>De volgende project id's hebben ongeldige projectgegevens inzake laatste opbrengstverdelingen (Kwh):<br>" . implode(', ', $wrongProjectsDataForLastProjectRevenueKwhIds) . "</p>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $wrongProjectsDataForLastProjectRevenueHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
