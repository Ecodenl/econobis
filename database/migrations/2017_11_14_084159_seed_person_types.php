<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedPersonTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $types = [
            'Particulier',
            'Adviseur',
            'Eigenaar bedrijf',
            'ZZP\'er',
            'Journalist',
            'Wethouder',
            'Kunstenaar',
            'Collega cooperatie',
        ];

        foreach ($types as $type) {
            DB::table('person_types')->insert([
                    ['name' => $type],
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
        Schema::table('person_types', function (Blueprint $table) {
            //
        });
    }
}
