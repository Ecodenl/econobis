<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewEnergySuppliersNovember2019 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //
        $newEs = [
            'ParkStroom',
            'Groenpand',
            'Windcentrale',
            'Energiebesteding'
        ];

        foreach ($newEs as $name) {
            $es = new EnergySupplier();

            $es->name = $name;
            $es->does_postal_code_links = 1;
            $es->save();
        }

        $es = EnergySupplier::where('name', 'Nuon')->first();
        $es->name = 'Vattenvall';
        $es->save();
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
