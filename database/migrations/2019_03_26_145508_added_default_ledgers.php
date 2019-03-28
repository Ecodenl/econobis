<?php

use App\Eco\VatCode\VatCode;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedDefaultLedgers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $vatCodeGeen =  VatCode::whereTwinfieldCode('VN')->first()->id;
        $vatCodeLaag =  VatCode::whereTwinfieldCode('VL')->first()->id;
        $vatCodeHoog =  VatCode::whereTwinfieldCode('VH')->first()->id;
        // Default ledgers
        $defaultLedgers = [
            [
                'description' => 'Omzet geen',
                'vat_code_id' => $vatCodeGeen,
                'twinfield_ledger_code' => '8000',
            ],
            [
                'description' => 'Omzet laag',
                'vat_code_id' => $vatCodeLaag,
                'twinfield_ledger_code' => '8010',
            ],
            [
                'description' => 'Omzet hoog',
                'vat_code_id' => $vatCodeHoog,
                'twinfield_ledger_code' => '8020',
            ],
            [
                'description' => 'Omzet buiten de EU',
                'vat_code_id' => $vatCodeGeen,
                'twinfield_ledger_code' => '8022',
            ],
            [
                'description' => 'Omzet binnen de EU',
                'vat_code_id' => $vatCodeGeen,
                'twinfield_ledger_code' => '8024',
            ],
        ];
        foreach (
            $defaultLedgers as $defaultLedger
        ) {
            DB::table('ledgers')->insert([
                    'description' => $defaultLedger['description'],
                    'vat_code_id' => $defaultLedger['vat_code_id'],
                    'twinfield_ledger_code' => $defaultLedger['twinfield_ledger_code'],
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
