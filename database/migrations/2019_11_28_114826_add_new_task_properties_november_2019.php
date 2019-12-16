<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewTaskPropertiesNovember2019 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ([
            'brochure_aanvragen' => 'Brochure aanvragen',
            'buurt_initiatief' => 'Buurt initiatief',
        ] as $code => $name) {
            DB::table('task_properties')->insert([
                'code' => $code,
                'name' => $name,
            ]);
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
