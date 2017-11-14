<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedLastNamePrefixesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $prefixes = [
            'van',
            'de',
            'van der',
            'van de',
            'van den',
            'den',
            'ten',
            'ter',
            'te',
            'van \'t',
            'el',
            'le',
            'van het',
            'in \'t',
            '\'t',
            'von',
            'du',
            'da',
            'de la',
            'la',
            'der',
        ];

        foreach ($prefixes as $prefix) {
            DB::table('last_name_prefixes')->insert([
                    ['name' => $prefix],
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('people', function (Blueprint $table) {
            $table->dropForeign('people_last_name_prefix_id_foreign');
        });

        DB::table('last_name_prefixes')->truncate();

        Schema::table('people', function (Blueprint $table) {
            $table->foreign('last_name_prefix_id')->references('id')->on('last_name_prefixes')->onDelete('restrict');
        });
    }
}
