<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\Task\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeEmailSubjectLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function ($table) {
            $table->string('subject', 250)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
