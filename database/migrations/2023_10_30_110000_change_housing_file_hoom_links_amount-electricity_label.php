<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class ChangeHousingFileHoomLinksAmountElectricityLabel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('housing_file_hoom_links')->where('external_hoom_short_name', 'amount-electricity')->update(['label' => 'Verbruik elektriciteit']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('housing_file_hoom_links')->where('external_hoom_short_name', 'amount-electricity')->update(['label' => 'Verbruik electriciteit']);
    }
}
