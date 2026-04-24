<?php

namespace Database\Seeders\Fixed;

use App\Eco\Financial\VatCode;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VatCodesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        VatCode::upsert([
            [
                'start_date' => '2000-01-01',
                'description' => 'BTW 0%',
                'percentage' => 0,
                'twinfield_code' => 'VN',
                'twinfield_ledger_code' => '1515',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'start_date' => '2019-01-01',
                'description' => 'BTW Laag 9%',
                'percentage' => 9,
                'twinfield_code' => 'VL',
                'twinfield_ledger_code' => '1520',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'start_date' => '2012-10-01',
                'description' => 'BTW Hoog 21%',
                'percentage' => 21,
                'twinfield_code' => 'VH',
                'twinfield_ledger_code' => '1530',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'Leveringen binnen EU',
                'percentage' => 0,
                'twinfield_code' => 'ICP',
                'twinfield_ledger_code' => '1517',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'start_date' => '2000-01-01',
                'description' => 'Leveringen buiten EU',
                'percentage' => 0,
                'twinfield_code' => 'EXP-BUI-EU',
                'twinfield_ledger_code' => '1518',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['twinfield_code'], [
            'start_date',
            'description',
            'percentage',
            'twinfield_ledger_code',
            'updated_at',
        ]);
    }
}