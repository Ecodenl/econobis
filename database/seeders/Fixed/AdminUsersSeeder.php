<?php

namespace Database\Seeders\Fixed;

use App\Eco\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::firstOrCreate(
            ['id' => 1],
            [
                'first_name' => config('app.admin_user.first_name'),
                'last_name_prefix_id' => config('app.admin_user.last_name_prefix_id') ?: null,
                'last_name' => config('app.admin_user.last_name'),
                'email' => config('app.admin_user.email'),
                'password' => Hash::make(config('app.admin_user.password')),
                'active' => 1,
                'alfresco_password' => '',
                'has_alfresco_account' => 0,
                'require_two_factor_authentication' => 0,
                'show_two_factor_notification' => 1,
            ]
        );

        $adminUser->assignRole(Role::findByName('Beheerder', 'api'));
    }
}