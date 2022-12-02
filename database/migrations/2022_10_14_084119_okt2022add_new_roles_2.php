<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class Okt2022addNewRoles2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $permissions = [
            'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
        ];
        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        //make roles inzake contact details
        $newContactRolePermissions = [
            'Medewerker' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Medewerker 2' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Projectmedewerker' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Financieel medewerker' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Financieel controller' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Participatie medewerker' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Energie adviseur' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Marketing medewerker' => [
                'view_contact_conclusion', 'update_contact_conclusion', 'download_contact', 'download_contact_consumption',
            ],
            'Energiemanager' => [
                'view_contact_conclusion', 'download_contact_consumption',
            ],
            'Energiecoordinator' => [
                'view_contact_conclusion', 'download_contact_consumption',
            ],
        ];
        foreach($newContactRolePermissions as $newContactRolePermissionName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newContactRolePermissionName);
            $role->givePermissionTo($permissions);

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
