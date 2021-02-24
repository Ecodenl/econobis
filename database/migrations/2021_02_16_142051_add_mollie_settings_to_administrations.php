<?php

use App\Eco\Administration\Administration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMollieSettingsToAdministrations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->boolean('uses_mollie')->default(false);
            $table->text('mollie_api_key');
        });

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
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('uses_mollie');
            $table->dropColumn('mollie_api_key');
        });
    }
}
