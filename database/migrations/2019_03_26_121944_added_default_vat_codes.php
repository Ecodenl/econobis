<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedDefaultVatCodes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Default VAT codes
        $defaultVatCodes = [
            [
                'start_date' => '2000-01-01',
                'description' => 'IC leveringen binnen EU naam',
                'percentage' => '0.00',
                'twinfield_code' => 'ICP',
            ],
            [
                'start_date' => '2019-01-01',
                'description' => 'Verkoop laag',
                'percentage' => '9.00',
                'twinfield_code' => 'VL',
            ],
            [
                'start_date' => '2012-10-01',
                'description' => 'BTW Hoog naam',
                'percentage' => '21.00',
                'twinfield_code' => 'VH',
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'BTW 0% naam',
                'percentage' => '0.00',
                'twinfield_code' => 'VN',
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'Export Buiten EU naam',
                'percentage' => '0.00',
                'twinfield_code' => 'EXP-BUI-EU',
            ],
        ];
        foreach (
            $defaultVatCodes as $defaultVatCode
        ) {
            DB::table('vat_codes')->insert([
                    'start_date' => $defaultVatCode['start_date'],
                    'description' => $defaultVatCode['description'],
                    'percentage' => $defaultVatCode['percentage'],
                    'twinfield_code' => $defaultVatCode['twinfield_code'],
                    'created_at' => \Carbon\Carbon::now(),
                ]
            );
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
