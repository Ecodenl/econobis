<?php

namespace Database\Seeders\Fixed;

use App\Eco\VatCode\VatCode;
use Illuminate\Database\Seeder;

class VatCodesSeeder extends Seeder
{
    public function run(): void
    {
        $vatCodes = [
            ['start_date' => '2000-01-01', 'description' => 'BTW 0%', 'percentage' => 0, 'twinfield_code' => 'VN', 'twinfield_ledger_code' => '1515'],
            ['start_date' => '2019-01-01', 'description' => 'BTW Laag 9%', 'percentage' => 9, 'twinfield_code' => 'VL', 'twinfield_ledger_code' => '1520'],
            ['start_date' => '2012-10-01', 'description' => 'BTW Hoog 21%', 'percentage' => 21, 'twinfield_code' => 'VH', 'twinfield_ledger_code' => '1530'],
            ['start_date' => '2000-01-01', 'description' => 'Leveringen binnen EU', 'percentage' => 0, 'twinfield_code' => 'ICP', 'twinfield_ledger_code' => '1517'],
            ['start_date' => '2000-01-01', 'description' => 'Leveringen buiten EU', 'percentage' => 0, 'twinfield_code' => 'EXP-BUI-EU', 'twinfield_ledger_code' => '1518'],
        ];

        foreach ($vatCodes as $vatCode) {
            VatCode::firstOrCreate(
                ['twinfield_code' => $vatCode['twinfield_code']],
                $vatCode
            );
        }
    }
}