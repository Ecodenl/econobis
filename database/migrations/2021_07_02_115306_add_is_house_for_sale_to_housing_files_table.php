<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsHouseForSaleToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->boolean('is_house_for_sale')->default(true)->after('build_year');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('housing_files', 'is_house_for_sale'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('is_house_for_sale');
            });
        }
    }
}
