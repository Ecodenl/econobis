<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySuppliersJuly2020 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $newEs = [
            'Welkom Energie',
            'Qwint',
            'Energie Zero',
        ];

        foreach ($newEs as $name) {
            $es = new EnergySupplier();

            $es->name = $name;
            $es->does_postal_code_links = 1;
            $es->save();
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
