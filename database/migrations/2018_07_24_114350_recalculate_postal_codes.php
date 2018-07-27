<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RecalculatePostalCodes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $addresses = \App\Eco\Address\Address::all();

        foreach ($addresses as $address){

            if(preg_match('/^\d{4}\s[A-Za-z]{2}$/', $address->postal_code)){
                $address->postal_code = preg_replace('/\s+/', '', $address->postal_code);
            }

            $address->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
