<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NewEnergySupplierGulfGasAndPower  extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $newEnergieSuppliers = [
            [
                'name' => 'Gulf Gas and Power',
                'doesPCR' => 0,
                'excelTemplateId' => 2,
                'abbreviation' => 'GGP'
            ],
        ];

        foreach ($newEnergieSuppliers as $newEnergieSupplier) {
            $es = new EnergySupplier();

            $es->name = $newEnergieSupplier['name'];
            $es->does_postal_code_links = $newEnergieSupplier['doesPCR'];
            $es->excel_template_id = $newEnergieSupplier['excelTemplateId'];
            $es->abbreviation = $newEnergieSupplier['abbreviation'];

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