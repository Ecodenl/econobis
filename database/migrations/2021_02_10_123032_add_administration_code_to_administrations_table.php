<?php

use App\Eco\Administration\Administration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdministrationCodeToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->string('administration_code', 5)->nullable()->after('administration_number');
        });
        $administrations = Administration::withTrashed()->get();
        foreach ($administrations as $administration){
            $administration->administration_code = $administration->administration_number;
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
        if (Schema::hasColumn('administrations', 'administration_code'))
        {
            Schema::table('administrations', function (Blueprint $table)
            {
                $table->dropColumn('administration_code');
            });
        }
    }
}
