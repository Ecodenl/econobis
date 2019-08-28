<?php

use Illuminate\Database\Migrations\Migration;

class ChangeParticipantStatusVerkocht extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_production_project_status')
            ->where('id', 3)
            ->update(['name' => 'Overgedragen']);
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
