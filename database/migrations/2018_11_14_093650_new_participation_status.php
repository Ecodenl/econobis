<?php

use Illuminate\Database\Migrations\Migration;

class NewParticipationStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_production_project_status')->insert(
            ['name' => 'Beëindigd']
        );
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
