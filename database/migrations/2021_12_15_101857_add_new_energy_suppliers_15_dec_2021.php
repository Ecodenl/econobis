<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewEnergySuppliers15Dec2021 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $newEnergieSuppliers = [
            ['name' => 'CEN / WoonEnergie', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'CEN'],
            ['name' => 'De Vrije Energie Producent', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'VEP'],
            ['name' => 'Gazprom', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'GAZ'],
            ['name' => 'Nieuw Hollands Energiebedrijf', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'NHE'],
            ['name' => 'PostcodeStroom', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'PCS'],
            ['name' => 'PZEM', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'PZM'],
            ['name' => 'Vrij Op Naam', 'doesPCR' => 1, 'excelTemplateId' => 2, 'abbreviation' => 'VON'],
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
