<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedOccupationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occupations = [
            'Directeur',
            'Eigenaar',
            'Verkoper',
            'Administratief medewerker',
            'Technisch medewerker',
            'Financieel medewerker',
        ];

        foreach ($occupations as $occupation) {
            DB::table('occupations')->insert([
                    ['name' => $occupation],
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('occupations', function (Blueprint $table) {
            //
        });
    }
}
