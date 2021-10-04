<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Seeds202110Occupations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occupations = [
            'Adviseur' => 'Adviseur van',
            'Manager' => 'Manager van',
            'Beheerder abbonement' => 'Abonnement beheerd door',
            'Factuur organisatie' => 'Afnemer organisatie',
            'Buren' => 'Buren van',
        ];

        foreach ($occupations as $po => $so) {
            DB::table('occupations')->insert([
                    ['primary_occupation' => $po, 'secondary_occupation' => $so],
                ]
            );
        }    }

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
