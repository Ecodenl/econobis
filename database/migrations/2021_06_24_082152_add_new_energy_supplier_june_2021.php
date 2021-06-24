<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySupplierJune2021 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $newEs = [
            'Discount Energie',
        ];

        foreach ($newEs as $name) {
            $es = new EnergySupplier();

            $es->name = $name;
            $es->does_postal_code_links = 0;
            $es->excel_template_id = 2;
            $es->abbreviation = 'DCE';

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
