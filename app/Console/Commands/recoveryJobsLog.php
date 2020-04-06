<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use App\Eco\Jobs\JobsLog;
use Illuminate\Console\Command;

class recoveryJobsLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jobsLog:recoveryJobsLog';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herstel foute JobsLog records';

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
        $searchField1 = "Maken en versturen";
        $searchField2 = "voltooid.";

        $this->doRecoveryJobsLog($searchField1, $searchField2);

        $searchField1 = "Maken en versturen";
        $searchField2 = "mislukt.";

        $this->doRecoveryJobsLog($searchField1, $searchField2);

        dd('Einde Herstel foute JobsLog records.');
    }

    /**
     * @param string $searchField1
     * @param string $searchField2
     *
     * @return array
     */
    public function doRecoveryJobsLog(string $searchField1, string $searchField2)
    {
        print_r("Start Herstel foute JobsLog records op: '" . $searchField1 . "' en '" . $searchField2 . "'.\n");
        foreach (
            JobsLog::where('value', 'like', $searchField1 . '%')->where('value', 'like', '%' . $searchField2 . '%')
                ->get() as $jobsLog
        ) {
            $beginPositionVoltooid = strpos($jobsLog->value, $searchField2);
            $leftValue = substr($jobsLog->value, 0, $beginPositionVoltooid);
            $beginPositionContactId = strrpos($leftValue, '(') + 1;
            $lengthContactId = strrpos($leftValue, ')') - $beginPositionContactId;
            $contactId = substr($leftValue, $beginPositionContactId, $lengthContactId);
            $contactName = Contact::find($contactId)->full_name;
            $beginPositionNaar = strpos($leftValue, ') naar');
            $rigthValue2 = substr($jobsLog->value, $beginPositionContactId - 2);

            $jobsLogOldValue = $jobsLog->value;
            $jobsLogNewValue = substr($leftValue, 0, $beginPositionNaar + 6) . " " . $contactName . $rigthValue2;
            if ($jobsLogOldValue != $jobsLogNewValue) {
                print_r("Old :" . $jobsLog->value . "\n");
                print_r("New :" . substr($leftValue, 0, $beginPositionNaar + 6) . " " . $contactName . $rigthValue2
                    . "\n");
                $jobsLog->value = $jobsLogNewValue;
                $jobsLog->save();
            }
        }
    }
}
