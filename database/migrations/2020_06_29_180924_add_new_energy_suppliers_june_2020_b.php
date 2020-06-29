<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySuppliersJune2020B extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $energySuppliers = [
            'Easyenergy' => 0,
            'Dorpstroom' => 1,
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
        //
    }
}
