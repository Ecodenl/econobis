<?php

namespace Database\Seeders\Fixed;

use App\Eco\Ledger\Ledger;
use App\Eco\VatCode\VatCode;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class LedgersSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // VatCode id's ophalen via business key
        $vatGeenId = VatCode::where('twinfield_code', 'VN')->value('id');
        $vatLaagId = VatCode::where('twinfield_code', 'VL')->value('id');
        $vatHoogId = VatCode::where('twinfield_code', 'VH')->value('id');

        if (!$vatGeenId || !$vatLaagId || !$vatHoogId) {
            throw new \RuntimeException('VatCodesSeeder moet eerst gedraaid zijn.');
        }

        Ledger::upsert([
            [
                'description' => 'Omzet geen',
                'vat_code_id' => $vatGeenId,
                'twinfield_ledger_code' => '8000',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'description' => 'Omzet laag',
                'vat_code_id' => $vatLaagId,
                'twinfield_ledger_code' => '8010',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'description' => 'Omzet hoog',
                'vat_code_id' => $vatHoogId,
                'twinfield_ledger_code' => '8020',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'description' => 'Omzet buiten de EU',
                'vat_code_id' => $vatGeenId,
                'twinfield_ledger_code' => '8022',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'description' => 'Omzet binnen de EU',
                'vat_code_id' => $vatGeenId,
                'twinfield_ledger_code' => '8024',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['twinfield_ledger_code'], [
            'description',
            'vat_code_id',
            'updated_at',
        ]);
    }
}