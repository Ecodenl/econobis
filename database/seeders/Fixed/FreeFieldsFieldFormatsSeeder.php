<?php

namespace Database\Seeders\Fixed;

use App\Eco\FreeFields\FreeFieldsFieldFormat;
use Illuminate\Database\Seeder;

class FreeFieldsFieldFormatsSeeder extends Seeder
{
    public function run(): void
    {
        FreeFieldsFieldFormat::upsert([
            ['format_type' => 'boolean', 'format_name' => 'Schuifje (Ja/Nee)', 'format_length' => 1, 'format_decimals' => 0],
            ['format_type' => 'text_short', 'format_name' => 'Korte tekst', 'format_length' => 191, 'format_decimals' => 0],
            ['format_type' => 'text_long', 'format_name' => 'Lange tekst', 'format_length' => 0, 'format_decimals' => 0],
            ['format_type' => 'int', 'format_name' => 'Numeriek geen decimalen', 'format_length' => 10, 'format_decimals' => 0],
            ['format_type' => 'double_2_dec', 'format_name' => 'Numeriek 2 decimalen', 'format_length' => 11, 'format_decimals' => 2],
            ['format_type' => 'amount_euro', 'format_name' => 'Bedrag', 'format_length' => 11, 'format_decimals' => 2],
            ['format_type' => 'date', 'format_name' => 'Datum', 'format_length' => 0, 'format_decimals' => 0],
            ['format_type' => 'datetime', 'format_name' => 'Datum met tijd', 'format_length' => 0, 'format_decimals' => 0],
        ], ['format_type'], ['format_name', 'format_length', 'format_decimals']);
    }
}