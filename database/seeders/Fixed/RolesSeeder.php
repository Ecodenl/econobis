<?php

namespace Database\Seeders\Fixed;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $roles = [
            'Beheerder',
            'Medewerker',
            'Medewerker 2',
            'Projectmanager',
            'Financieel medewerker',
            'Financieel controller',
            'Participatie medewerker',
            'Energie adviseur',
            'Marketing medewerker',
            'Beheerder webformulier',
            'Beheerder Mailgun domeinen',
            'Beheerder portal instellingen',
            'Beheerder coöperatie instellingen',
            'Buurtaanpak manager',
            'Buurtaanpak coördinator',
            'Data opschoner',
        ];

        foreach ($roles as $role) {
            Role::findOrCreate($role, 'api');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}