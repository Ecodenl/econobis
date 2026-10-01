<?php

use App\Eco\User\User;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Voegt het recht manage_email_template en de aanvullende rol
     * "Beheerder e-mail templates" toe.
     *
     * Om te voorkomen dat bestaande gebruikers functionaliteit verliezen, krijgt
     * iedere gebruiker die op dit moment e-mail templates mag beheren (dus het
     * recht create_email_template heeft via een van zijn rollen) de nieuwe rol
     * automatisch toegekend. Beheerders krijgen alle rechten al via hun eigen
     * rol en worden hier dus bewust overgeslagen.
     *
     * Let op: deze migratie draait vóór de seeders, zodat de situatie van vóór de
     * wijziging in RolePermissionsSeeder nog kan worden uitgelezen.
     */
    public function up(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permission = Permission::findOrCreate('manage_email_template', 'api');

        $role = Role::findOrCreate('Beheerder e-mail templates', 'api');
        $role->forceFill([
            'role_code' => 'email_template_admin',
            'role_type' => 'additional',
        ])->save();

        $role->givePermissionTo($permission);

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        User::whereHas('roles.permissions', function ($query) {
            $query->where('name', 'create_email_template');
        })->each(function (User $user) use ($role) {
            if (!$user->hasRole($role)) {
                $user->assignRole($role);
            }
        });

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $role = Role::where('name', 'Beheerder e-mail templates')
            ->where('guard_name', 'api')
            ->first();

        if ($role) {
            $role->delete();
        }

        $permission = Permission::where('name', 'manage_email_template')
            ->where('guard_name', 'api')
            ->first();

        if ($permission) {
            $permission->delete();
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
};
