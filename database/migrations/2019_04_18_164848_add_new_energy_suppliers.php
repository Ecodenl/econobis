<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewEnergySuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $newEs = [
            'Delta Energie',
            'Agem',
            'Anode Energie',
            'De Groene Stroomfabriek',
            'Energie Van Ons',
            'HVC Kringloop Energie',
            'Sepa Green',
            'Servicehouse',
            'Holthausen Clean Energy (HCE)',
            'Total',
            'Fenor energie',
            'Power peers',
            'Energyhouse'];

        foreach ($newEs as $name) {
            $es = new EnergySupplier();

            $es->name = $name;
            $es->does_postal_code_links = 1;
            $es->save();
        }    }

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
