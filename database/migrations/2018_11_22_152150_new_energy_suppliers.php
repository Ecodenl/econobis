<?php

use Illuminate\Database\Migrations\Migration;

class NewEnergySuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $newEs = ['Huismerk Energie', 'Energieflex', 'United Consumers', 'Innova Energie', 'Betuwe stroom'];

        foreach ($newEs as $name) {
            $es = new \App\Eco\EnergySupplier\EnergySupplier();

            $es->name = $name;
            $es->does_postal_code_links = 1;
            $es->save();
        }

        $es = \App\Eco\EnergySupplier\EnergySupplier::where('name', 'Mainz')->first();
        $es->name = 'Main energie';
        $es->save();
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
