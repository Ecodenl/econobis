<?php

namespace Database\Seeders\Fixed;

use App\Eco\FreeFields\FreeFieldsTable;
use Illuminate\Database\Seeder;

class FreeFieldsTablesSeeder extends Seeder
{
    public function run(): void
    {
        $freeFieldsTables = [
            ['table' => 'contacts', 'name' => 'Contacten', 'prefix_field_name_webform' => 'contact_'],
            ['table' => 'addresses', 'name' => 'Adressen', 'prefix_field_name_webform' => 'adres_'],
            ['table' => 'projects', 'name' => 'Projecten', 'prefix_field_name_webform' => null],
        ];

        foreach ($freeFieldsTables as $freeFieldsTable) {
            FreeFieldsTable::updateOrCreate(
                ['table' => $freeFieldsTable['table']],
                $freeFieldsTable
            );
        }
    }
}