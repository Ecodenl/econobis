<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddNewSourcesAugust182025 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $intakeSources = [
            'Aanmeldingsbron15',
            'Aanmeldingsbron16',
            'Aanmeldingsbron17',
            'Aanmeldingsbron18',
            'Aanmeldingsbron19',
            'Aanmeldingsbron20',
            'Aanmeldingsbron21',
            'Aanmeldingsbron22',
            'Aanmeldingsbron23',
            'Aanmeldingsbron24',
            'Aanmeldingsbron25',
            'Aanmeldingsbron26',
            'Aanmeldingsbron27',
            'Aanmeldingsbron28',
            'Aanmeldingsbron29',
            'Aanmeldingsbron30',
            'Aanmeldingsbron31',
            'Aanmeldingsbron32',
            'Aanmeldingsbron33',
            'Aanmeldingsbron34'
        ];

        foreach ($intakeSources as $source) {
            DB::table('sources')->insert([
                    ['name' => $source, 'visible' => 0],
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
        //
    }
}
