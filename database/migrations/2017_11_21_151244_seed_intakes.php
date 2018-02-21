<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedIntakes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $intakeReasons = [
            'Milieu',
            'Comfort',
            'Besparing',
        ];

        foreach ($intakeReasons as $reason) {
            DB::table('reasons')->insert([
                    ['name' => $reason],
                ]
            );
        }

        $intakeSources = [
            'E-mail',
            'Website',
            'Evenement',
            'Telefoon',
            'Enquete',
        ];

        foreach ($intakeSources as $source) {
            DB::table('sources')->insert([
                    ['name' => $source],
                ]
            );
        }

        $statussen = [
            'Open',
            'Afgesloten met kans',
            'Afgesloten zonder kans',
        ];

        foreach ($statussen as $status) {
            DB::table('intake_status')->insert([
                    ['name' => $status],
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

    }
}
