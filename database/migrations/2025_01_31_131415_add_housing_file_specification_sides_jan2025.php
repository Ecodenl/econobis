<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Wijzig keuzes:
        //   Voor -> Voorzijde
        //   Achter -> Achterzijde

        DB::table('housing_file_specification_sides')->where('name', 'Voor')->update(["name" => "Voorzijde"]);
        DB::table('housing_file_specification_sides')->where('name', 'Achter')->update(["name" => "Achterzijde"]);

        // Nieuwe keuzes:
        //   Linkervoorzijde
        //   Linkerachterzijde
        //   Rechtervoorzijde
        //   Rechterachterzijde
        $sides = [
            'Linkervoorzijde',
            'Linkerachterzijde',
            'Rechtervoorzijde',
            'Rechterachterzijde',
        ];
        foreach ($sides as $side) {
            DB::table('housing_file_specification_sides')->insert(
                ['name'=> $side],
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
        // Delete keuzes:
        //   Linkervoorzijde
        //   Linkerachterzijde
        //   Rechtervoorzijde
        //   Rechterachterzijde
        $sides = [
            'Linkervoorzijde',
            'Linkerachterzijde',
            'Rechtervoorzijde',
            'Rechterachterzijde',
        ];
        foreach ($sides as $side) {
            DB::table('housing_file_specification_sides')
                ->where('name', $side)
                ->delete();
        }

        // Rollback wijzig keuzes:
        //   Voorzijde -> Voor
        //   Achterzijde - > Achter

        DB::table('housing_file_specification_sides')->where('name', 'Voorzijde')->update(["name" => "Voor"]);
        DB::table('housing_file_specification_sides')->where('name', 'Achterzijde')->update(["name" => "Achter"]);

        // Herstel van AUTO_INCREMENT
        DB::statement('ALTER TABLE housing_file_specification_sides AUTO_INCREMENT = 0');

    }
};
