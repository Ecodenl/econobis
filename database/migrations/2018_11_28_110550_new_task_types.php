<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NewTaskTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $newTt = ['Aanmelding', 'Advies Gesprek', 'Factuur maken', 'Informatie toesturen', 'Bezoek', 'Overstap energie leverancier'];

        foreach ($newTt as $name) {
            $taskType = new \App\Eco\Task\TaskType();

            $taskType->name = $name;
            $taskType->save();
        }
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
