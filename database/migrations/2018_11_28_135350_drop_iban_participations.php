<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\Task\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropIbanParticipations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_production_project', function ($table) {
            $table->dropColumn('iban_payed');
            $table->dropColumn('iban_attn');
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
