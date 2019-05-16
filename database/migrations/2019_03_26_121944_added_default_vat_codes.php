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
                'description' => 'BTW 0%',
                'percentage' => '0.00',
                'twinfield_code' => 'VN',
                'twinfield_ledger_code' => '',
            ],
            [
                'start_date' => '2019-01-01',
                'description' => 'BTW Laag 9%',
                'percentage' => '9.00',
                'twinfield_code' => 'VL',
                'twinfield_ledger_code' => '1520',
            ],
            [
                'start_date' => '2012-10-01',
                'description' => 'BTW Hoog 21%',
                'percentage' => '21.00',
                'twinfield_code' => 'VH',
                'twinfield_ledger_code' => '1530',
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'Leveringen binnen EU',
                'percentage' => '0.00',
                'twinfield_code' => 'ICP',
                'twinfield_ledger_code' => '',
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'Leveringen buiten EU',
                'percentage' => '0.00',
                'twinfield_code' => 'EXP-BUI-EU',
                'twinfield_ledger_code' => '',
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
                    'twinfield_ledger_code' => $defaultVatCode['twinfield_ledger_code'],
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
