<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->integer('number_of_residents')->after('is_monument');
            $table->integer('revenue_solar_panels')->after('number_of_residents');
            $table->text('remark')->after('revenue_solar_panels');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('housing_files', 'remark'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('remark');
            });
        }
        if (Schema::hasColumn('housing_files', 'revenue_solar_panels'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('revenue_solar_panels');
            });
        }
        if (Schema::hasColumn('housing_files', 'number_of_residents'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('number_of_residents');
            });
        }
    }
}
