<?php

namespace App\Console;

use App\Console\Commands\checkContactEmailAddress;
use App\Console\Commands\checkContactIban;
use App\Console\Commands\checkContactPostalCode;
use App\Console\Commands\checkMailboxes;
use App\Console\Commands\checkJobsLogForRecovery;
use App\Console\Commands\conversionParticipationsToMutationsDeltaWind;
use App\Console\Commands\conversionParticipationsToMutationsLoanDiv100;
use App\Console\Commands\conversionParticipationsToMutationsDefault;
use App\Console\Commands\conversionProjectRevenues;
use App\Console\Commands\conversionProjects;
use App\Console\Commands\conversionProjectRevenueDistribution;
use App\Console\Commands\conversionPortalRegistrationCode;
use App\Console\Commands\getAllEmail;
use App\Console\Commands\processPaidInvoices;
use App\Console\Commands\processWorkflowEmailCompleteTask;
use App\Console\Commands\processWorkflowEmailExpiredTask;
use App\Console\Commands\processWorkflowEmailOpportunityStatus;
use App\Console\Commands\processWorkflowEmailQuotationRequestStatus;
use App\Console\Commands\rebuildPortalCss;
use App\Console\Commands\recoveryJobsLog;
use App\Console\Commands\setDaysLastReminderInvoice;
use App\Console\Commands\setDaysToExpireInvoice;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        checkContactEmailAddress::class,
        checkContactIban::class,
        checkContactPostalCode::class,
        checkJobsLogForRecovery::class,
        getAllEmail::class,
        setDaysLastReminderInvoice::class,
        setDaysToExpireInvoice::class,
        processPaidInvoices::class,
        checkMailboxes::class,
        processWorkflowEmailCompleteTask::class,
        processWorkflowEmailExpiredTask::class,
        processWorkflowEmailOpportunityStatus::class,
        processWorkflowEmailQuotationRequestStatus::class,
        rebuildPortalCss::class,
        conversionProjects::class,
        conversionProjectRevenues::class,
        conversionProjectRevenueDistribution::class,
        conversionParticipationsToMutationsDeltaWind::class,
        conversionParticipationsToMutationsLoanDiv100::class,
        conversionParticipationsToMutationsDefault::class,
        conversionPortalRegistrationCode::class,
        recoveryJobsLog::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $appCoopName =  \Config::get('app.APP_COOP_NAME');

        $timeSetDaysLastReminder = (isset($this->getArrayTimeSetDaysLastReminder()[$appCoopName]) ? $this->getArrayTimeSetDaysLastReminder()[$appCoopName] : '01:56' );
        $timeSetDaysToExpire = (isset($this->getArrayTimeSetDaysToExpire()[$appCoopName]) ? $this->getArrayTimeSetDaysToExpire()[$appCoopName] : '03:56' );

        $schedule->command('email:getAllEmail')->everyFiveMinutes()->between('06:00', '23.30');
        $schedule->command('email:checkMailboxes')->dailyAt('05:58');
        $schedule->command('email:checkMailboxes')->dailyAt('08:58');
        $schedule->command('email:checkMailboxes')->dailyAt('11:58');
        $schedule->command('email:checkMailboxes')->dailyAt('14:58');
        $schedule->command('email:checkMailboxes')->dailyAt('17:58');
        $schedule->command('invoice:setDaysLastReminder')->dailyAt($timeSetDaysLastReminder);
        $schedule->command('invoice:setDaysToExpire')->dailyAt($timeSetDaysToExpire);
        $schedule->command('invoice:processPaidInvoices')->dailyAt('04:30');
        $schedule->command('workflow:processWorkflowEmailCompleteTask')->dailyAt('05:00');
        $schedule->command('workflow:processWorkflowEmailExpiredTask')->dailyAt('05:05');
        $schedule->command('workflow:processWorkflowEmailOpportunityStatus')->dailyAt('05:10');
        $schedule->command('workflow:processWorkflowEmailQuotationRequestStatus')->dailyAt('05:15');
    }

    protected function getArrayTimeSetDaysLastReminder()
    {
        return array(
            'alkmaarenergie' => '00:05',
            'amsterdamenergie' => '00:06',
            'beng' => '00:07',
            'bergenenergie' => '00:08',
            'blauwvinger' => '00:09',
            'blijstroom' => '00:10',
            'bresbreda' => '00:11',
            'bunnik' => '00:12',
            'buurtstroom' => '00:13',
            'cdmn' => '00:14',
            'cronius' => '00:15',
            'de-a' => '00:16',
            'deelstroomdelft' => '00:17',
            'degroeneleye' => '00:18',
            'degroenereus' => '00:19',
            'deltawind' => '00:20',
            'demo' => '00:21',
            'denhaag' => '00:22',
            'denieuwemolenaars' => '00:23',
            'drechtsestromen' => '00:24',
            'duurzaamalphenchaam' => '00:25',
            'duurzaamheidsloketwestbrabant' => '00:26',
            'ec2030' => '00:27',
            'ecduurzaamassen' => '00:28',
            'ecl' => '00:29',
            'ecloenen' => '00:30',
            'ecloz' => '00:31',
            'econobis' => '00:32',
            'ecopn' => '00:33',
            'ecsteenwijk' => '00:34',
            'eemnesenergie' => '00:35',
            'endona' => '00:36',
            'endura' => '00:37',
            'energiecmiddendelfland' => '00:38',
            'energiecooperatiewijdemeren' => '00:39',
            'energiedongen' => '00:40',
            'energiegraftderijp' => '00:41',
            'energiekalphenaandenrijn' => '00:42',
            'energiekbaarn' => '00:43',
            'energiekschiedam' => '00:44',
            'energierijck' => '00:45',
            'energierijkvoorst' => '00:46',
            'energievoorvier' => '00:47',
            'energiezeist' => '00:48',
            'enschedeenergie' => '00:49',
            'esg' => '00:50',
            'garenkokerskwartier' => '00:51',
            'gebiedscooperatienieuwkoop' => '00:52',
            'goederenhub' => '00:53',
            'grunnegerpower' => '00:54',
            'haagsopgewekt' => '00:55',
            'heerdeenergiek' => '00:56',
            'hellendoornoprozen' => '00:57',
            'hetcooperatie' => '00:58',
            'heumen' => '00:59',
            'hilverzon' => '01:00',
            'hofvantwenteoprozen' => '01:01',
            'hoom' => '01:02',
            'kennemerenergie (kennemerkracht)' => '01:03',
            'krammer' => '01:04',
            'leimuiden' => '01:05',
            'leudalenergie' => '01:06',
            'nieuwelansingerstroom' => '01:07',
            'nijmegen' => '01:08',
            'opgewektrijssen' => '01:09',
            'peelenergie' => '01:10',
            'reindonk' => '01:11',
            'rijneenergie' => '01:12',
            'rijnenijsselenergie' => '01:13',
            'samenstroom' => '01:14',
            'test' => '01:15',
            'test-acceptatie' => '01:16',
            'testagem' => '01:17',
            'testduurzaamheidsloketwestbrabant' => '01:18',
            'testeconobis10' => '01:19',
            'testnijmegen' => '01:20',
            'testrijnenijsselenergie' => '01:21',
            'testtraais' => '01:22',
            'testwindvogel' => '01:23',
            'traaisenergiecollectief' => '01:24',
            'valleienergie' => '01:25',
            'vecnh' => '01:26',
            'veluweenergie' => '01:27',
            'vogelwijk' => '01:28',
            'voorneputtenenergie' => '01:29',
            'vrijstad' => '01:30',
            'wattnu' => '01:31',
            'westbrabantwoontslim' => '01:32',
            'wfrwind' => '01:33',
            'wiek' => '01:34',
            'windmolenboekel' => '01:35',
            'windvogel' => '01:36',
            'wow' => '01:37',
            'zetdezonaanhetwerkoptexel' => '01:38',
            'zon4ons' => '01:39',
            'zondergaslaan' => '01:40',
            'zonnevogel' => '01:41',
            'zonopalledaken' => '01:42',
            'zonopmacharen' => '01:43',
            'zpv' => '01:44',
            'zuiderlicht' => '01:45',
            'zutphenenergie' => '01:46',
            'bestenergie' => '01:47',
            'energiecooperatieoss' => '01:48',
            'energiekebuurtschappen' => '01:49',
            'ewec' => '01:50',
            'fruitstadenergie' => '01:51',
            'testzutphenenergie' => '01:52',
            'watbeters' => '01:53',
            'weespecoenergie' => '01:54',
            'ecoburen' => '01:55',
        );
    }
    protected function getArrayTimeSetDaysToExpire()
    {
        return array(
            'alkmaarenergie' => '02:05',
            'amsterdamenergie' => '02:06',
            'beng' => '02:07',
            'bergenenergie' => '02:08',
            'blauwvinger' => '02:09',
            'blijstroom' => '02:10',
            'bresbreda' => '02:11',
            'bunnik' => '02:12',
            'buurtstroom' => '02:13',
            'cdmn' => '02:14',
            'cronius' => '02:15',
            'de-a' => '02:16',
            'deelstroomdelft' => '02:17',
            'degroeneleye' => '02:18',
            'degroenereus' => '02:19',
            'deltawind' => '02:20',
            'demo' => '02:21',
            'denhaag' => '02:22',
            'denieuwemolenaars' => '02:23',
            'drechtsestromen' => '02:24',
            'duurzaamalphenchaam' => '02:25',
            'duurzaamheidsloketwestbrabant' => '02:26',
            'ec2030' => '02:27',
            'ecduurzaamassen' => '02:28',
            'ecl' => '02:29',
            'ecloenen' => '02:30',
            'ecloz' => '02:31',
            'econobis' => '02:32',
            'ecopn' => '02:33',
            'ecsteenwijk' => '02:34',
            'eemnesenergie' => '02:35',
            'endona' => '02:36',
            'endura' => '02:37',
            'energiecmiddendelfland' => '02:38',
            'energiecooperatiewijdemeren' => '02:39',
            'energiedongen' => '02:40',
            'energiegraftderijp' => '02:41',
            'energiekalphenaandenrijn' => '02:42',
            'energiekbaarn' => '02:43',
            'energiekschiedam' => '02:44',
            'energierijck' => '02:45',
            'energierijkvoorst' => '02:46',
            'energievoorvier' => '02:47',
            'energiezeist' => '02:48',
            'enschedeenergie' => '02:49',
            'esg' => '02:50',
            'garenkokerskwartier' => '02:51',
            'gebiedscooperatienieuwkoop' => '02:52',
            'goederenhub' => '02:53',
            'grunnegerpower' => '02:54',
            'haagsopgewekt' => '02:55',
            'heerdeenergiek' => '02:56',
            'hellendoornoprozen' => '02:57',
            'hetcooperatie' => '02:58',
            'heumen' => '02:59',
            'hilverzon' => '03:00',
            'hofvantwenteoprozen' => '03:01',
            'hoom' => '03:02',
            'kennemerenergie (kennemerkracht)' => '03:03',
            'krammer' => '03:04',
            'leimuiden' => '03:05',
            'leudalenergie' => '03:06',
            'nieuwelansingerstroom' => '03:07',
            'nijmegen' => '03:08',
            'opgewektrijssen' => '03:09',
            'peelenergie' => '03:10',
            'reindonk' => '03:11',
            'rijneenergie' => '03:12',
            'rijnenijsselenergie' => '03:13',
            'samenstroom' => '03:14',
            'test' => '03:15',
            'test-acceptatie' => '03:16',
            'testagem' => '03:17',
            'testduurzaamheidsloketwestbrabant' => '03:18',
            'testeconobis10' => '03:19',
            'testnijmegen' => '03:20',
            'testrijnenijsselenergie' => '03:21',
            'testtraais' => '03:22',
            'testwindvogel' => '03:23',
            'traaisenergiecollectief' => '03:24',
            'valleienergie' => '03:25',
            'vecnh' => '03:26',
            'veluweenergie' => '03:27',
            'vogelwijk' => '03:28',
            'voorneputtenenergie' => '03:29',
            'vrijstad' => '03:30',
            'wattnu' => '03:31',
            'westbrabantwoontslim' => '03:32',
            'wfrwind' => '03:33',
            'wiek' => '03:34',
            'windmolenboekel' => '03:35',
            'windvogel' => '03:36',
            'wow' => '03:37',
            'zetdezonaanhetwerkoptexel' => '03:38',
            'zon4ons' => '03:39',
            'zondergaslaan' => '03:40',
            'zonnevogel' => '03:41',
            'zonopalledaken' => '03:42',
            'zonopmacharen' => '03:43',
            'zpv' => '03:44',
            'zuiderlicht' => '03:45',
            'zutphenenergie' => '03:46',
            'bestenergie' => '03:47',
            'energiecooperatieoss' => '03:48',
            'energiekebuurtschappen' => '03:49',
            'ewec' => '03:50',
            'fruitstadenergie' => '03:51',
            'testzutphenenergie' => '03:52',
            'watbeters' => '03:53',
            'weespecoenergie' => '03:54',
            'ecoburen' => '03:55',
        );
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
