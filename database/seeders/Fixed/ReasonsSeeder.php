<?php

namespace Database\Seeders\Fixed;

use App\Eco\Intake\IntakeReason;
use Illuminate\Database\Seeder;

class ReasonsSeeder extends Seeder
{
    public function run(): void
    {
        $reasons = [
            ['name' => 'Milieu'],
            ['name' => 'Comfort'],
            ['name' => 'Besparing'],
        ];

        foreach ($reasons as $reason) {
            IntakeReason::updateOrCreate(
                ['name' => $reason['name']],
                $reason
            );
        }
    }
}