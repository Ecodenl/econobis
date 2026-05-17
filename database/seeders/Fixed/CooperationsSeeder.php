<?php

namespace Database\Seeders\Fixed;

use App\Eco\Cooperation\Cooperation;
use App\Eco\User\User;
use Illuminate\Database\Seeder;

class CooperationsSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::where('email', config('app.admin_user.email'))->first();

        $cooperations = [
            [
                'id' => 1,
                'name' => config('app.APP_COOP_NAME'),
                'send_email' => false,
                'use_laposta' => false,
                'use_export_address_consumption' => false,
                'show_external_url_for_contacts' => false,
                'external_url_contacts_button_text' => '',
                'external_url_contacts_on_new_page' => false,
                'external_url_contacts' => '',
                'use_dongle_registration' => false,
                'require_two_factor_authentication' => false,
                'create_contacts_for_report_table' => false,
                'create_contacts_for_report_table_in_progress' => false,
                'created_by_id' => $adminUser ? $adminUser->id : 1,
                'updated_by_id' => $adminUser ? $adminUser->id : 1,
            ]
        ];

        // Alle velden (op id na natuurlijk), zijn muteerbaar voor gebruiker.
        // We voegen alleen ontbrekende (nieuwe) records toe en laten bestaande ongemoeid.
        // We gebruiken hier daarom firstOrCreate() ipv updateOrCreate() en doen geen update().
        foreach ($cooperations as $cooperation) {
            Cooperation::firstOrCreate(
                ['id' =>  (int) $cooperation['id']],
                $cooperation
            );
        }
    }
}