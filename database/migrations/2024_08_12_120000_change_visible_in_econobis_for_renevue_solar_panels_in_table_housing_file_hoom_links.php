<?php

use Illuminate\Database\Migrations\Migration;

class changeVisibleInEconobisForRenevueSolarPanelsInTableHousingFileHoomLinks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('housing_file_hoom_links')->where('econobis_field_name', 'revenue_solar_panels')->update(['visible_in_econobis' => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('housing_file_hoom_links')->where('econobis_field_name', 'revenue_solar_panels')->update(['visible_in_econobis' => 0]);
    }
}
