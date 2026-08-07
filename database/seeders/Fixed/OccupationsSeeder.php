<?php

namespace Database\Seeders\Fixed;

use App\Eco\Occupation\Occupation;
use Illuminate\Database\Seeder;

class OccupationsSeeder extends Seeder
{
    public function run(): void
    {
        $occupations = [
            ['code_ref' => 'director', 'primary_occupation' => 'Directeur', 'secondary_occupation' => 'Directeur van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'owner', 'primary_occupation' => 'Eigenaar', 'secondary_occupation' => 'Eigenaar van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'sales', 'primary_occupation' => 'Verkoper', 'secondary_occupation' => 'Verkoper bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'administrative_employee', 'primary_occupation' => 'Administratief medewerker', 'secondary_occupation' => 'Administratief medewerker bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'technical_employee', 'primary_occupation' => 'Technisch medewerker', 'secondary_occupation' => 'Technisch medewerker bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'financial_employee', 'primary_occupation' => 'Financieel medewerker', 'secondary_occupation' => 'Financieel medewerker bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'legal_representative', 'primary_occupation' => 'Wettelijke vertegenwoordiger', 'secondary_occupation' => 'Wordt vertegenwoordigd door', 'occupation_for_portal' => 1, 'is_active' => true],
            ['code_ref' => 'donor', 'primary_occupation' => 'Schenker', 'secondary_occupation' => 'Ontvanger', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'head_office', 'primary_occupation' => 'Hoofdvestiging', 'secondary_occupation' => 'Nevenvestiging van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'administrator', 'primary_occupation' => 'Bewindvoerder', 'secondary_occupation' => 'Bewindvoerder van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'treasurer', 'primary_occupation' => 'Penningmeester', 'secondary_occupation' => 'Penningmeester bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'chairman', 'primary_occupation' => 'Voorzitter', 'secondary_occupation' => 'Voorzitter bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'secretary', 'primary_occupation' => 'Secretaris', 'secondary_occupation' => 'Secretaris bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'employee', 'primary_occupation' => 'Medewerker', 'secondary_occupation' => 'Medewerker bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'board_member', 'primary_occupation' => 'Bestuurslid', 'secondary_occupation' => 'Bestuurslid bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'housemate', 'primary_occupation' => 'Huisgenoot', 'secondary_occupation' => 'Huisgenoot van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'coach', 'primary_occupation' => 'Coach van', 'secondary_occupation' => 'Gecoacht door', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'managing_director', 'primary_occupation' => 'Directeur/bestuurder', 'secondary_occupation' => 'Directeur/bestuurder bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'director_major_shareholder', 'primary_occupation' => 'Directeur-grootaandeelhouder', 'secondary_occupation' => 'Directeur-grootaandeelhouder bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'superior', 'primary_occupation' => 'Overste', 'secondary_occupation' => 'Overste bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'data_manager', 'primary_occupation' => 'Gegevens beheerd door', 'secondary_occupation' => 'Gegevensbeheerder van', 'occupation_for_portal' => 1, 'is_active' => true],
            ['code_ref' => 'project_manager', 'primary_occupation' => 'Projectleider', 'secondary_occupation' => 'Projectleider van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'advisor', 'primary_occupation' => 'Adviseur', 'secondary_occupation' => 'Adviseur van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'manager', 'primary_occupation' => 'Manager', 'secondary_occupation' => 'Manager van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'subscription_manager', 'primary_occupation' => 'Beheerder abonnement', 'secondary_occupation' => 'Abonnement beheerd door', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'invoice_organization', 'primary_occupation' => 'Factuur organisatie', 'secondary_occupation' => 'Afnemer organisatie', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'neighbor', 'primary_occupation' => 'Buren', 'secondary_occupation' => 'Buren van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'politician', 'primary_occupation' => 'Politicus', 'secondary_occupation' => 'Politicus van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'coordinator', 'primary_occupation' => 'Coördinator', 'secondary_occupation' => 'Coördinator van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'vve_member', 'primary_occupation' => 'VvE lid', 'secondary_occupation' => 'VvE lid van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'general_member', 'primary_occupation' => 'Algemeen lid', 'secondary_occupation' => 'Algemeen lid van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'volunteer', 'primary_occupation' => 'Vrijwilliger', 'secondary_occupation' => 'Vrijwilliger van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'hoomdossier_key_user', 'primary_occupation' => 'Key user Hoomdossier', 'secondary_occupation' => 'Key user Hoomdossier', 'occupation_for_portal' => 0, 'is_active' => false],
            ['code_ref' => 'econobis_key_user', 'primary_occupation' => 'Key user Econobis', 'secondary_occupation' => 'Key user Econobis', 'occupation_for_portal' => 0, 'is_active' => false],
            ['code_ref' => 'initiative_lead', 'primary_occupation' => 'Kar/voortrekker', 'secondary_occupation' => 'Kar/voortrekker van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'board_chair', 'primary_occupation' => 'Voorzitter - Bestuur', 'secondary_occupation' => 'Voorzitter - Bestuur van', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'unknown_role', 'primary_occupation' => 'Rol onbekend', 'secondary_occupation' => 'Rol onbekend bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'working_group_member', 'primary_occupation' => 'Werkgroep lid', 'secondary_occupation' => 'Werkgroep lid bij', 'occupation_for_portal' => 0, 'is_active' => true],
            ['code_ref' => 'network', 'primary_occupation' => 'Netwerk', 'secondary_occupation' => 'Netwerk lid', 'occupation_for_portal' => 0, 'is_active' => true],
        ];

        foreach ($occupations as $occupation) {
            $existingOccupation = Occupation::firstOrCreate(
                [
                    'primary_occupation' => $occupation['primary_occupation'],
                ],
                $occupation
            );

            $existingOccupation->update([
                'code_ref' => $occupation['code_ref'],
                'primary_occupation' => $occupation['primary_occupation'],
                'secondary_occupation' => $occupation['secondary_occupation'],
                'occupation_for_portal' => $occupation['occupation_for_portal'],
            ]);

// todo: later dan seeder zo maken met key op code_ref ipv primary_occupation
//            $existingOccupation = Occupation::firstOrCreate(
//                [
//                    'code_ref' => $occupation['code_ref'],
//                ],
//                $occupation
//            );
//
//            $existingOccupation->update([
//                'primary_occupation' => $occupation['primary_occupation'],
//                'secondary_occupation' => $occupation['secondary_occupation'],
//                'occupation_for_portal' => $occupation['occupation_for_portal'],
//            ]);
        }


    }
}