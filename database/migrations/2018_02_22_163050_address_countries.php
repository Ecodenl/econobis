<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddressCountries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->string('id');
            $table->string('name');

            $table->unique('id');

            $table->timestamps();
        });

        $countries = [
            'AU' => 'Australië',
            'BE' => 'België',
            'CA' => 'Canada',
            'DK' => 'Denemarken',
            'DE' => 'Duitsland',
            'FI' => 'Finland',
            'FR' => 'Frankrijk',
            'IE' => 'Ierland',
            'IT' => 'Italië',
            'LU' => 'Luxemburg',
            'NL' => 'Nederland',
            'NO' => 'Noorwegen',
            'AT' => 'Oostenrijk',
            'PT' => 'Portugal',
            'ES' => 'Spanje',
            'GB' => 'Verenigd Koninkrijk',
            'VS' => 'Verenigde Staten',
            'SE' => 'Zweden',
            'CH' => 'Zwitserland',
        ];

        foreach ($countries as $key => $country) {
            DB::table('countries')->insert([
                    ['id' => $key,
                    'name' => $country],
                ]
            );
        }

        Schema::table('addresses', function (Blueprint $table) {
            $table->string('country_id')->nullable()->default(null);
            $table->foreign('country_id')
                ->references('id')->on('countries')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropForeign(['country_id']);
            $table->dropColumn('country_id');
        });
    }
}
