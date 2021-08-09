<?php

use App\Eco\Jobs\JobsLog;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeLogTextDidFinish extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $jobsLogs = JobsLog::where('value', 'E-mail(s) verstuurd: didFinish.')->get();
        foreach ($jobsLogs as $jobsLog){
            $jobsLog->value = 'E-mail(s) versturen klaar.';
            $jobsLog->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
