<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToXxxConversion2021OzonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('xxx_conversion2021_ozon', function (Blueprint $table) {
            $table->float('levering_laag_end_2020', 14, 6)->nullable()->after('ozon_project_naam');
            $table->float('levering_hoog_end_2020', 14, 6)->nullable()->after('levering_laag_end_2020');
            $table->float('levering_totaal_end_2020', 14, 6)->nullable()->after('levering_hoog_end_2020');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('xxx_conversion2021_ozon', function (Blueprint $table) {
            $table->dropColumn('levering_laag_end_2020');
            $table->dropColumn('levering_hoog_end_2020');
            $table->dropColumn('levering_totaal_end_2020');
        });
    }
}
