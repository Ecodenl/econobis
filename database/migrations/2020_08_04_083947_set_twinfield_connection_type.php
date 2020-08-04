<?php

use App\Eco\Administration\Administration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetTwinfieldConnectionType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $administrations = Administration::where('uses_twinfield', 1)->whereNull('twinfield_connection_type')->get();

        foreach ($administrations as $administration){
            $administration->twinfield_connection_type = "webservice";
            $administration->save();
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
