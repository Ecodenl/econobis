<?php

use App\Eco\Administration\Administration;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            //
            $table->date('date_sync_twinfield_contacts')->nullable()->default(null);
            $table->date('date_sync_twinfield_payments')->nullable();
        });

        $administrations = Administration::all();

        foreach ($administrations as $administration){
            if($administration->uses_twinfield){
               $administration->date_sync_twinfield_payments = Carbon::parse('2019-01-01');
            }
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
        Schema::table('administrations', function (Blueprint $table) {
            //
            $table->dropColumn('date_sync_twinfield_contacts');
            $table->dropColumn('date_sync_twinfield_payments');
        });
    }
}
