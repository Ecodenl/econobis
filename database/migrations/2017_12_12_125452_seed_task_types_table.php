<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedTaskTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('task_types', function (Blueprint $table) {
            $types = [
                'Bellen',
                'Email',
                'Offerte maken',
                'Contact moment',
            ];

            foreach ($types as $type) {
                DB::table('task_types')->insert([
                        ['name' => $type],
                    ]
                );
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('task_types', function (Blueprint $table) {
            //
        });
    }
}
