<?php

namespace Database\Seeders\Fixed;

use App\Eco\IntakeSource\IntakeSource;
use Illuminate\Database\Seeder;

class SourcesSeeder extends Seeder
{
    public function run(): void
    {
        IntakeSource::upsert([
            ['id' => 1, 'name' => 'E-mail', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 2, 'name' => 'Website', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 3, 'name' => 'Evenement', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 4, 'name' => 'Telefoon', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 5, 'name' => 'Enquete', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 6, 'name' => 'Energieloket', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 7, 'name' => 'Digitaal energieloket', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 8, 'name' => 'Mobiel Energieloket', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 9, 'name' => 'Bewonersavond', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 10, 'name' => 'Netwerk', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 11, 'name' => 'Huisbezoek', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 12, 'name' => 'Online', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 13, 'name' => 'Woningdossier', 'name_custom' => null, 'code_ref' => 'housing_file', 'visible' => 1],
            ['id' => 14, 'name' => 'Gemeente', 'name_custom' => null, 'code_ref' => null, 'visible' => 1],
            ['id' => 15, 'name' => 'Aanmeldingsbron15', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 16, 'name' => 'Aanmeldingsbron16', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 17, 'name' => 'Aanmeldingsbron17', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 18, 'name' => 'Aanmeldingsbron18', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 19, 'name' => 'Aanmeldingsbron19', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 20, 'name' => 'Aanmeldingsbron20', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 21, 'name' => 'Aanmeldingsbron21', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 22, 'name' => 'Aanmeldingsbron22', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 23, 'name' => 'Aanmeldingsbron23', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 24, 'name' => 'Aanmeldingsbron24', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 25, 'name' => 'Aanmeldingsbron25', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 26, 'name' => 'Aanmeldingsbron26', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 27, 'name' => 'Aanmeldingsbron27', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 28, 'name' => 'Aanmeldingsbron28', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 29, 'name' => 'Aanmeldingsbron29', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 30, 'name' => 'Aanmeldingsbron30', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 31, 'name' => 'Aanmeldingsbron31', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 32, 'name' => 'Aanmeldingsbron32', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 33, 'name' => 'Aanmeldingsbron33', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
            ['id' => 34, 'name' => 'Aanmeldingsbron34', 'name_custom' => null, 'code_ref' => null, 'visible' => 0],
        ], ['id'], ['name', 'name_custom', 'code_ref', 'visible']);
    }
}