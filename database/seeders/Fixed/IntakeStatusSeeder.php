<?php

namespace Database\Seeders\Fixed;

use App\Eco\Intake\IntakeStatus;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class IntakeStatusSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        IntakeStatus::upsert([
            ['name' => 'Open', 'code_ref' => 'open', 'order' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Afgesloten met kans', 'code_ref' => 'closed_with_opportunity', 'order' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Afgesloten zonder kans', 'code_ref' => 'closed_without_opportunity', 'order' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'In behandeling', 'code_ref' => 'in_progress', 'order' => 2, 'created_at' => $now, 'updated_at' => $now],
        ], ['code_ref'], ['name', 'order', 'updated_at']);
    }
}