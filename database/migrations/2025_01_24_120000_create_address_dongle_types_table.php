<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_dongle_types', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('type_read_out');
            $table->string('name');
            $table->unsignedInteger('order');
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });

        DB::table('address_dongle_types')->insert(
            [
                'type_read_out'=> 2,
                'name' => 'Smartstuff type A',
                'order' => 1,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );

        DB::table('address_dongle_types')->insert(
            [
                'type_read_out'=> 2,
                'name' => 'Smartstuff type B',
                'order' => 2,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );

        DB::table('address_dongle_types')->insert(
            [
                'type_read_out'=> 2,
                'name' => 'Ander merk',
                'order' => 3,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('address_dongle_types');
    }
};
