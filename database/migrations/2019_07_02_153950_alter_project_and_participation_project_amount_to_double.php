<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjectAndParticipationProjectAmountToDouble extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE projects MODIFY amount_definitive DOUBLE(11,2);');
        DB::statement('ALTER TABLE projects MODIFY amount_optioned DOUBLE(11,2);');
        DB::statement('ALTER TABLE participation_project MODIFY amount_definitive DOUBLE(11,2);');
        DB::statement('ALTER TABLE participation_project MODIFY amount_optioned DOUBLE(11,2);');
        DB::statement('ALTER TABLE participant_mutations MODIFY amount DOUBLE(8,2);');
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
