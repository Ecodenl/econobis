<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedEnergySuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $energySuppliers = [
            //name => does_postal_code_links
            '=om' => 1,
            'Budget Energie' => 1,
            'E.on' => 0,
            'Eneco' => 1,
            'Energiedirect' => 0,
            'Engie' => 0,
            'Essent' => 0,
            'Greenchoice' => 1,
            'Holland Wind' => 0,
            'Mainz' => 0,
            'N.E.M.' => 0,
            'NL Energie' => 0,
            'Nuon' => 0,
            'Oxxio' => 0,
            'Pure energy' => 0,
            'Qurrent' => 0,
            'VanDeBron' => 0,
            'Overig' => 0
        ];

        foreach ($energySuppliers as $energySupplier => $pcr) {
            DB::table('energy_suppliers')->insert([
                    [
                        'name' => $energySupplier,
                        'does_postal_code_links' => $pcr
                    ],
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
    }
}
