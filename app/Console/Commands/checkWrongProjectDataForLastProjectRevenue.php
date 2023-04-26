<?php

namespace App\Console\Commands;

use App\Eco\Project\Project;
use App\Helpers\Email\EmailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
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

        $wrongProjectsDataForLastProjectRevenue = [];
        $counter = 1;

        $projects = Project::all();

        foreach($projects as $project) {
            //wel date_interest_bearing maar geen confirmed projectRevenues van category 2
            if (
                $project->date_interest_bearing !== null &&
                $project->projectRevenues()->where('category_id', 2)->where('confirmed', 1)->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                $counter++;
                continue;
            }

            //wel date_interest_bearing en projectRevenues van category 2, maar nieuwe startdatum is niet goed
            if (
                $project->projectRevenues()->where('category_id', 2)->where('confirmed', 1)->orderBy('date_end', 'Desc')->count() > 0 &&
                $dateEnd = new \DateTime($project->projectRevenues()->where('category_id', 2)->where('confirmed', 1)->orderBy('date_end', 'Desc')->first()->date_end)
            ) {
                $dateEndPlusOneDay = $dateEnd->modify('+1 day');
                if (
                    $project->date_interest_bearing !== null &&
                    $project->projectRevenues()->where('category_id', 2)->where('confirmed', 1)->count() > 0 &&
                    $project->date_interest_bearing != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                    $counter++;
                    continue;
                }
            }

            //wel date_interest_bearing_redemption maar geen confirmed projectRevenues van category 3
            if(
                $project->date_interest_bearing_redemption !== null &&
                $project->projectRevenues()->where('category_id', 3)->where('confirmed', 1)->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                $counter++;
                continue;
            }

            //wel date_interest_bearing_redemption en confirmed projectRevenues van category 3, maar nieuwe startdatum is niet goed
            if(
                $project->projectRevenues()->where('category_id', 3)->where('confirmed', 1)->orderBy('date_end', 'Desc')->count() > 0 &&
                $dateEnd = new \DateTime($project->projectRevenues()->where('category_id', 3)->where('confirmed', 1)->orderBy('date_end', 'Desc')->first()->date_end)
            ) {
                $dateEndPlusOneDay = $dateEnd->modify('+1 day');
                if (
                    $project->date_interest_bearing_redemption !== null &&
                    $project->projectRevenues()->where('category_id', 2)->where('confirmed', 1)->count() > 0 &&
                    $project->date_interest_bearing_redemption != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                    $counter++;
                    continue;
                }
            }

            //wel date_interest_bearing_kwh maar geen confirmed revenuesKwh
            if(
                $project->date_interest_bearing_kwh !== null &&
                $project->revenuesKwh()->where('confirmed', 1)->count() === 0
            ) {
                $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                $counter++;
                continue;
            }

            //wel date_interest_bearing_kwh en revenuesKwh, maar nieuwe startdatum is niet goed
            if(
                $project->revenuesKwh()->orderBy('date_end', 'Desc')->count() > 0 &&
                $dateEnd = new \DateTime($project->revenuesKwh()->orderBy('date_end', 'Desc')->first()->date_end)
            ) {
                $dateEndPlusOneDay = $dateEnd->modify('+1 day');
                if (
                    $project->date_interest_bearing_kwh !== null &&
                    $project->revenuesKwh()->where('confirmed', 1)->count() > 0 &&
                    $project->date_interest_bearing_kwh != $dateEndPlusOneDay
                ) {
                    $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                    $counter++;
                    continue;
                }
            }

            //wel date_interest_bearing_kwh en revenuesKwh, maar kwh_start_high_next_revenue of kwh_start_low_next_revenue is niet goed
            if(
                $project->date_interest_bearing_kwh !== null &&
                $project->revenuesKwh()->where('confirmed', 1)->count() > 0 &&
                (
                    $project->kwh_start_high_next_revenue != $project->revenuesKwh()->orderBy('date_end', 'Desc')->first()->kwh_start_high ||
                    $project->kwh_start_low_next_revenue != $project->revenuesKwh()->orderBy('date_end', 'Desc')->first()->kwh_start_low
                )
            ) {
                $wrongProjectsDataForLastProjectRevenue[$counter] = $project->id;
                $counter++;
                continue;
            }
        }

        if(!empty($wrongProjectsDataForLastProjectRevenue)) {
            $subject = 'Ongeldige projectgegevens inzake laatste opbrengstverdelingen! - ' . \Config::get('app.APP_COOP_NAME');
            Log::info($subject);
            Log::info($wrongProjectsDataForLastProjectRevenue);

            $this->sendMail($subject, $wrongProjectsDataForLastProjectRevenue);
        }

        Log::info('Procedure check op ongeldige projectgegevens inzake laatste opbrengstverdelingen klaar');
    }

    private function sendMail($subject, $wrongProjectsDataForLastProjectRevenue)
    {
        (new EmailHelper())->setConfigToDefaultMailbox();
        $wrongProjectDataForLastProjectRevenueHtml = "";
        foreach($wrongProjectsDataForLastProjectRevenue as $wrongProjectDataForLastProjectRevenue) {
            $wrongProjectDataForLastProjectRevenueHtml .=
                "Project ID: " . $wrongProjectDataForLastProjectRevenue . "<br>"
            ;
        }

        $mail = Mail::to('patrick@xaris.nl');
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>Ongeldige projectgegevens inzake laatste opbrengstverdelingen!</title></head><body><p>'. $subject . '</p><p>' . \Config::get("app.name") .'</p><p>Ongeldige projectgegevens inzake laatste opbrengstverdelingen:<br>' . $wrongProjectDataForLastProjectRevenueHtml . '</p></body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
