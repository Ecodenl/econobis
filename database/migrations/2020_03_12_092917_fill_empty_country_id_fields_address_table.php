<?php

use Illuminate\Database\Migrations\Migration;

class FillEmptyCountryIdFieldsAddressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

       $addressesWithNoCountry = \App\Eco\Address\Address::where('country_id', null)->get();

       foreach ($addressesWithNoCountry as $addressWithNoCountry){
           $addressWithNoCountry->country_id = 'NL';
           $addressWithNoCountry->save();
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
