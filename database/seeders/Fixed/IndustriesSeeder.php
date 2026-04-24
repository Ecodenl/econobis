<?php

namespace Database\Seeders\Fixed;

use App\Eco\Industry\Industry;
use Illuminate\Database\Seeder;

class IndustriesSeeder extends Seeder
{
    public function run(): void
    {
        Industry::upsert([
            ['name' => 'ICT'],
            ['name' => 'Pharmacie'],
            ['name' => 'Verpakking'],
            ['name' => 'Auto'],
            ['name' => 'Bouw'],
            ['name' => 'Cultuur'],
            ['name' => 'Dienstverlening'],
            ['name' => 'Elektro'],
            ['name' => 'Food'],
            ['name' => 'Groothandel'],
            ['name' => 'Handel'],
            ['name' => 'Industrie'],
            ['name' => 'Kantoor'],
            ['name' => 'Landbouw'],
            ['name' => 'Logistiek'],
            ['name' => 'Metaal'],
            ['name' => 'Non-profit'],
            ['name' => 'Sport'],
            ['name' => 'Techniek'],
            ['name' => 'Verhuur'],
            ['name' => 'Winkel'],
            ['name' => 'Energie'],
        ], ['name'], []);
    }
}