<?php

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Migrations\Migration;

class ChangingElectricityNameOrLabel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('housing_file_hoom_links')->where('external_hoom_short_name', 'amount-electricity')->update(['label' => 'Verbruik elektriciteit']);
        DB::table('energy_supply_types')->where('name', 'Electriciteit')->update(['name' => 'Elektriciteit']);
        DB::table('energy_supply_types')->where('name', 'Electriciteit en gas')->update(['name' => 'Elektriciteit en gas']);
        DB::table('measures')->where('name', 'Electrische boiler')->update(['name' => 'Elektrische boiler']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('housing_file_hoom_links')->where('external_hoom_short_name', 'amount-electricity')->update(['label' => 'Verbruik electriciteit']);
        DB::table('energy_supply_types')->where('name', 'Elektriciteit')->update(['name' => 'Electriciteit']);
        DB::table('energy_supply_types')->where('name', 'Elektriciteit en gas')->update(['name' => 'Electriciteit en gas']);
        DB::table('measures')->where('name', 'Elektrische boiler')->update(['name' => 'Electrische boiler']);
    }
}
