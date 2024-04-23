<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLatitudeLongitudeInSharedPostalCodesHouseNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    protected $connection = 'econobis_shared';

    public function up()
    {
        Schema::table('shared_postal_codes_house_numbers', function (Blueprint $table) {
            if (!Schema::hasColumn('shared_postal_codes_house_numbers', 'latitude')) {
                $table->string('latitude', 25)->nullable();
            }
            if (!Schema::hasColumn('shared_postal_codes_house_numbers', 'longitude')) {
                $table->string('longitude', 25)->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shared_postal_codes_house_numbers', function (Blueprint $table)
        {
            if (Schema::hasColumn('shared_postal_codes_house_numbers', 'latitude')) {
                $table->dropColumn('latitude');
            }
            if (Schema::hasColumn('shared_postal_codes_house_numbers', 'longitude')) {
                $table->dropColumn('longitude');
            }
        });
    }
};
