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
            ['name' => 'Beheerder', 'role_code' => 'admin', 'role_type' => 'primary'],
            ['name' => 'Medewerker', 'role_code' => 'employee', 'role_type' => 'primary'],
            ['name' => 'Medewerker 2', 'role_code' => 'employee_2', 'role_type' => 'primary'],
            ['name' => 'Projectmanager', 'role_code' => 'project_manager', 'role_type' => 'primary'],
            ['name' => 'Financieel medewerker', 'role_code' => 'financial_employee', 'role_type' => 'primary'],
            ['name' => 'Financieel controller', 'role_code' => 'financial_controller', 'role_type' => 'primary'],
            ['name' => 'Participatie medewerker', 'role_code' => 'participation_employee', 'role_type' => 'primary'],
            ['name' => 'Energie adviseur', 'role_code' => 'energy_advisor', 'role_type' => 'primary'],
            ['name' => 'Marketing medewerker', 'role_code' => 'marketing_employee', 'role_type' => 'primary'],
            ['name' => 'Buurtaanpak manager', 'role_code' => 'district_approach_manager', 'role_type' => 'primary'],
            ['name' => 'Buurtaanpak coördinator', 'role_code' => 'district_approach_coordinator', 'role_type' => 'primary'],

            ['name' => 'Beheerder webformulier', 'role_code' => 'webform_admin', 'role_type' => 'additional'],
            ['name' => 'Beheerder Mailgun domeinen', 'role_code' => 'mailgun_domain_admin', 'role_type' => 'additional'],
            ['name' => 'Beheerder portal instellingen', 'role_code' => 'portal_settings_admin', 'role_type' => 'additional'],
            ['name' => 'Beheerder coöperatie instellingen', 'role_code' => 'cooperation_settings_admin', 'role_type' => 'additional'],
            ['name' => 'Beheerder data opschoner', 'role_code' => 'data_cleaner_admin', 'role_type' => 'additional'],
        ];

        foreach ($roles as $roleData) {
            $role = Role::findOrCreate($roleData['name'], 'api');

            $role->forceFill([
                'role_code' => $roleData['role_code'],
                'role_type' => $roleData['role_type'],
            ])->save();
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}