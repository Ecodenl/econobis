<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEsAndOccupations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $es = new \App\Eco\EnergySupplier\EnergySupplier();

        $es->name = 'Energie VanOns';
        $es->does_postal_code_links = 1;
        $es->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Bewindvoerder';
        $occ->secondary_occupation = 'Bewindvoerder';
        $occ->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Penningmeester';
        $occ->secondary_occupation = 'Penningmeester';
        $occ->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Voorzitter';
        $occ->secondary_occupation = 'Voorzitter';
        $occ->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Secretaris';
        $occ->secondary_occupation = 'Secretaris';
        $occ->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Medewerker';
        $occ->secondary_occupation = 'Medewerker';
        $occ->save();

        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Bestuurslid';
        $occ->secondary_occupation = 'Bestuurslid';
        $occ->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
