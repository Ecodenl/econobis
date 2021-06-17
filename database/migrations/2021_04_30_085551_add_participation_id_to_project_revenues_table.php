<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParticipationIdToProjectRevenuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->unsignedInteger('contact_energy_supplier_id')->nullable()->default(null)->after('project_id');
            $table->foreign('contact_energy_supplier_id')
                ->references('id')->on('contact_energy_supplier')
                ->onDelete('restrict');

            $table->unsignedInteger('participation_id')->nullable()->default(null)->after('project_id');
            $table->foreign('participation_id')
                ->references('id')->on('participation_project')
                ->onDelete('restrict');
            $table->integer('kwh_end_calendar_year_high')->nullable()->after('kwh_start_high');
            $table->integer('kwh_end_calendar_year_low')->nullable()->after('kwh_start_low');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_revenues', 'kwh_end_calendar_year_low'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropColumn('kwh_end_calendar_year_low');
            });
        }
        if (Schema::hasColumn('project_revenues', 'kwh_end_calendar_year_high'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropColumn('kwh_end_calendar_year_high');
            });
        }
        if (Schema::hasColumn('project_revenues', 'participation_id'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropForeign('project_revenues_participation_id_foreign');
                $table->dropColumn('participation_id');
            });
        }

        if (Schema::hasColumn('project_revenues', 'contact_energy_supplier_id'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropForeign('project_revenues_contact_energy_supplier_id_foreign');
                $table->dropColumn('contact_energy_supplier_id');
            });
        }
    }
}
