<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewSourceWoningDossier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sources', function (Blueprint $table) {
            $table->string('code_ref')->nullable(true)->after('name');
        });

        DB::table('sources')->insert(['name' => 'Woningdossier', 'code_ref' => 'housing_file']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('sources', 'code_ref'))
        {
            Schema::table('sources', function (Blueprint $table)
            {
                $table->dropColumn('code_ref');
            });
        }
    }
}
