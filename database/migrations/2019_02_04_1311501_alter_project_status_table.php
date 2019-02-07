<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProjectStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Change name existing projectStatus
        $projectStatus = \App\Eco\Project\ProjectStatus::where('name', 'In productie')->first();

        if($projectStatus) {
            $projectStatus->name = 'Actief';
            $projectStatus->save();
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