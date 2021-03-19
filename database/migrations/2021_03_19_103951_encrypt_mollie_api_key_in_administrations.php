<?php

use App\Eco\Administration\Administration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EncryptMollieApiKeyInAdministrations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * mollie_api_key wordt ge-encrypt.
         * Overal eenmalig setten om fouten bij decrypten te voorkomen.
         */
        foreach (Administration::all() as $administration){
            $administration->mollie_api_key = '';
            $administration->save();
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
