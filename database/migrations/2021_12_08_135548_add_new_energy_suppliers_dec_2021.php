<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySuppliersDec2021 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $newEnergieSuppliers = [
            ['name' => 'EnerZie (www.enerzie.eu)', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'ENZ'],
            ['name' => 'DVEP Energie (www.dvep.nl)', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'DVP'],
            ['name' => 'Clean Energy (www.cleanenergy.nl)', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'CE'],
            ['name' => 'Samsam (wijsamsam.nl)', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'SAM'],
            ['name' => 'Gezinsenergie (Gezinsenergie.nl)', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'GZE'],
            ['name' => 'Onbekend', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'ONB'],
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
