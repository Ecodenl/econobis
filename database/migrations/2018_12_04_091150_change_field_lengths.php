<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\Task\Task;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFieldLengths extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('production_projects', function ($table) {
            $table->string('description', 2500)->change();
        });

        Schema::table('intakes', function ($table) {
            $table->string('note', 2500)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('production_projects', function ($table) {
            $table->string('description', 191)->change();
        });

        Schema::table('intakes', function ($table) {
            $table->string('note', 191)->change();
        });
    }
}
