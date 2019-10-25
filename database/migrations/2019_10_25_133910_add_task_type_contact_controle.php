<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTaskTypeContactControle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $types = [
            'Controleer contactgegevens',
        ];

        foreach ($types as $type) {
            DB::table('task_types')->insert([
                    ['name' => $type],
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
