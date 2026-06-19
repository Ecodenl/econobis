<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE email_templates SET html_body= REPLACE(html_body, '<p>@als{vertegenwoordigde_naam}Inschrijving is gedaan door: {vertegenwoordigde_naam} als@@alsniet@als{contact_organisatie_primair_contact} {contact_organisatie_primair_contact_voornaam} {contact_organisatie_primair_contact_achternaam}, bestuurder van {contact_naam} als@@alsniet{contact_organisatie_primair_contact} {contact_naam}alsniet@ alsniet@</p>', '<p>@als{vertegenwoordigde_naam}Inschrijving is gedaan door: {vertegenwoordigde_naam} als@@alsniet{vertegenwoordigde_naam} {contact_organisatie_primair_contact_voornaam} {contact_organisatie_primair_contact_achternaam}, verantwoordelijke voor {contact_naam} alsniet@</p>')");
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
};
