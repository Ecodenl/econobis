<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddParticipationsInteressedAndGrantedFieldsToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('UPDATE participation_project SET participations_granted=0 WHERE participations_granted IS NULL');
        DB::statement('ALTER TABLE participation_project MODIFY participations_granted INT(11) NOT NULL');

        Schema::table('participation_project', function (Blueprint $table) {
            $table->integer('participations_interessed')->nullable(false)->default(0)->after('participations_optioned');
            $table->double('amount_granted', 11, 2)->nullable()->default(0)->after('amount_definitive');
            $table->double('amount_interessed', 11, 2)->nullable()->default(0)->after('amount_optioned');
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('participations_granted')->nullable(false)->default(0)->after('participations_definitive');
            $table->integer('participations_interessed')->nullable(false)->default(0)->after('participations_optioned');
            $table->double('amount_granted', 11, 2)->nullable()->default(0)->after('amount_definitive');
            $table->double('amount_interessed', 11, 2)->nullable()->default(0)->after('amount_optioned');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('projects', function ($table) {
//            $table->dropColumn('participations_granted');
//            $table->dropColumn('participations_interessed');
//            $table->dropColumn('amount_interessed');
//            $table->dropColumn('amount_granted');
//        });
//        Schema::table('participation_project', function ($table) {
//            $table->dropColumn('participations_interessed');
//            $table->dropColumn('amount_interessed');
//            $table->dropColumn('amount_granted');
//        });
    }
}
