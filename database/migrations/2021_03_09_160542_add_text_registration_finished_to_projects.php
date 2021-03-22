<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTextRegistrationFinishedToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('text_registration_finished', 2500)
                ->default('Bedankt voor je inschrijving. Per e-mail sturen wij een bevestiging van je inschrijving met informatie over de vervolgstappen.\n\n
Het kan zijn dat de mail door een spamfilter is geblokkeerd. Spamfilters van bijvoorbeeld Gmail en Hotmail staan erg "scherp". Kijk even bij de Spam/Reclame of je onze mail daar terug vindt.\n\n
Onder de menuknop “Huidige deelnames” vind je je inschrijving terug.\n\n
Wil je je inschrijving aanpassen? Neem dan contact met ons op.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('text_registration_finished');
        });
    }
}
