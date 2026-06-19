<?php

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        $newEnergieSuppliers = [
            [
                'name' => 'GroenStroomLokaal',
                'doesPCR' => 1,
                'excelTemplateId' => 2,
                'abbreviation' => 'GSL'
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
     */
    public function down(): void
    {
        //
    }
};
