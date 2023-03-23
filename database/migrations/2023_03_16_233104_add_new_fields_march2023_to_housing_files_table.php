<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsMarch2023ToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->integer('hoom_building_id')->nullable(true)->after('remark');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('housing_files', 'hoom_building_id'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('hoom_building_id');
            });
        }
    }
}
