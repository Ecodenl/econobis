<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NewOccupation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occ = new \App\Eco\Occupation\Occupation();
        $occ->primary_occupation = 'Energiecoach';
        $occ->secondary_occupation = 'Energiecoach';
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
