<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedIndustriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $industries = [
            'ICT',
            'Pharmacie',
            'Verpakking',
            'Auto',
            'Bouw',
            'Cultuur',
            'Dienstverlening',
            'Elektro',
            'Food',
            'Groothandel',
            'Handel',
            'Industrie',
            'Kantoor',
            'Landbouw',
            'Logistiek',
            'Metaal',
            'Non-profit',
            'Sport',
            'Techniek',
            'Verhuur',
            'Winkel',
        ];

        foreach ($industries as $industry) {
            DB::table('industries')->insert([
                    ['name' => $industry],
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
        Schema::table('industries', function (Blueprint $table) {
            //
        });
    }
}
