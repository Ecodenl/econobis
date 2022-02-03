<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewTaskPropertiesFebruary2020 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        foreach ([
                     'verzendwijze' => 'Verzendwijze',
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
