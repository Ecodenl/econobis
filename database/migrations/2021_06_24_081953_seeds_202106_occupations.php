<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Seeds202106Occupations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occupations = [
            'Projectleider' => 'Projectleider van'
        ];

        foreach ($occupations as $po => $so) {
            DB::table('occupations')->insert([
                    ['primary_occupation' => $po, 'secondary_occupation' => $so],
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
