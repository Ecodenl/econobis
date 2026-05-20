<?php

namespace Databases\Seeders\Fixed;

use App\Eco\Contact\Contact;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Illuminate\Database\Seeder;

/**
 * Seeder voor systeemcontact "Verwijderde contacten".
 *
 * Oorspronkelijk bedoeld als mogelijke tussenoplossing voor behoud van
 * housingfiles/adressen bij cleanup/force-delete van contacten.
 *
 * Mogelijk vervalt deze aanpak later bij structurele herziening van het
 * address/housingfile datamodel (splitsing contact-adressen en fysieke adressen).
 *
 * Daarom momenteel nog niet standaard opgenomen in FixedSeeder.
 */
class SystemContactSeeder extends Seeder
{
    public function run(): void
    {
        $cooperation = Cooperation::first();
        if ($cooperation?->contact_id_deleted_contacts !== null && $cooperation?->contact_id_deleted_cooperations !== 0) {
            return;
        };

        $adminUser = User::where('email', config('app.admin_user.email'))->first();
        $timeStampNow = Carbon::now();

        $contactOrganisation = Contact::create([
            'type_id' => 'organisation',
            'status_id' => 'system',
            'created_by_id' => $adminUser ? $adminUser->id : 1,
            'created_at' => $timeStampNow,
            'created_with' => 'econobis',
            'updated_by_id' => $adminUser ? $adminUser->id : 1,
            'updated_at' => $timeStampNow,
            'updated_with' => 'econobis',
        ]);

        Organisation::create([
            'contact_id' => $contactOrganisation->id,
            'name' => 'Systeem contact',
            'statutory_name' => '',
            'created_at' => $timeStampNow,
            'updated_at' => $timeStampNow,
            'deleted_at' => $timeStampNow,
        ]);
        $contactOrganisation->deleted_at = $timeStampNow;
        $contactOrganisation->save();

        $cooperation = Cooperation::first();
        if ($cooperation) {
            $cooperation->contact_id_deleted_contacts = $contactOrganisation->id;
            $cooperation->saveQuietly();
        }

    }
}