<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeVsCountryIdIntoUs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $countryNew = new \App\Eco\Country\Country();

        $countryNew->id = 'US';
        $countryNew->name = 'Verenigde Staten';
        $countryNew->save();

        $addressesWithCountryIdVS = \App\Eco\Address\Address::where('country_id', 'VS')->get();

        foreach ($addressesWithCountryIdVS as $addressWithCountryIdVS){
            $addressWithCountryIdVS->country_id = 'US';
            $addressWithCountryIdVS->save();
        }

        $countryOld = \App\Eco\Country\Country::find('VS');
        $countryOld->delete();
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
