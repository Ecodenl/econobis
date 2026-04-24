<?php

namespace Database\Seeders\Fixed;

use App\Eco\Document\DocumentCreatedFrom;
use Illuminate\Database\Seeder;

class DocumentCreatedFromsSeeder extends Seeder
{
    public function run(): void
    {
        DocumentCreatedFrom::upsert([
            ['name' => 'Administratie', 'code_ref' => 'administration'],
            ['name' => 'Campagne', 'code_ref' => 'campaign'],
            ['name' => 'Contact', 'code_ref' => 'contact'],
            ['name' => 'Contactgroep', 'code_ref' => 'contactgroup'],
            ['name' => 'Deelnemer', 'code_ref' => 'participant'],
            ['name' => 'Document', 'code_ref' => 'document'],
            ['name' => 'E-mail bijlage', 'code_ref' => 'emailattachment'],
            ['name' => 'Intake', 'code_ref' => 'intake'],
            ['name' => 'Maatregel', 'code_ref' => 'measure'],
            ['name' => 'Kans', 'code_ref' => 'opportunity'],
            ['name' => 'Kansactie', 'code_ref' => 'quotationrequest'],
            ['name' => 'Order', 'code_ref' => 'order'],
            ['name' => 'Project', 'code_ref' => 'project'],
            ['name' => 'Taak', 'code_ref' => 'task'],
            ['name' => 'Woningdossier', 'code_ref' => 'housingfile'],
        ], ['code_ref'], ['name']);
    }
}