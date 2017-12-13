<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedTaskPropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $properties = [
            'Aantal',
            'Advies',
            'Conceptovereenkomst',
            'Lid',
            'Bedrijf',
            'Naam bedrijf',
            'Energiemaatschappij',
            'Akkoord',
            'Later bellen',
        ];

        foreach ($properties as $property) {
            DB::table('task_properties')->insert([
                    ['name' => $property],
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
        Schema::table('task_properties', function (Blueprint $table) {
            //
        });
    }
}
