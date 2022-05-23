<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySuppliers17Mrt2022 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $newEnergieSuppliers = [
            ['name' => 'Mijn Domein Energie', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'MDE'],
        ];

        foreach ($newEnergieSuppliers as $newEnergieSupplier) {
            $es = new EnergySupplier();

            $es->name = $newEnergieSupplier['name'];
            $es->does_postal_code_links = $newEnergieSupplier['doesPCR'];
            $es->excel_template_id = $newEnergieSupplier['excelTemplateId'];
            $es->abbreviation = $newEnergieSupplier['abbreviation'];

            $es->save();
        }

        DB::table('energy_suppliers')->where('name', 'United Consumers')->update(['does_postal_code_links' => 0]);

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
