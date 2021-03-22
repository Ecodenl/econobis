<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCzAndNzToCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $countryNZ = \App\Eco\Country\Country::find('NZ');
        if(!$countryNZ){
            $country = new \App\Eco\Country\Country();
            $country->id = 'NZ';
            $country->name = 'Nieuw-Zeeland';
            $country->save();
        }

        $countryCZ = \App\Eco\Country\Country::find('CZ');
        if(!$countryCZ) {
            $country = new \App\Eco\Country\Country();
            $country->id = 'CZ';
            $country->name = 'Tsjechië';
            $country->save();
        }
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
