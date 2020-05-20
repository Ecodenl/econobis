<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedDefaultDateLastFetchedTableMailboxes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $defaultDateLast = Carbon::now()->startOfDay();
        $mailboxes = \App\Eco\Mailbox\Mailbox::whereNull('date_last_fetched')->get();
        foreach ($mailboxes as $mailbox){
            $mailbox->date_last_fetched = $defaultDateLast;
            $mailbox->save();
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
