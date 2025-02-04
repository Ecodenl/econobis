<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        DB::table('energy_suppliers')->where('name', 'DGB Energie')->where('abbreviation', 'DGB')->update(['name' => 'Kikker Energie/DGB Energie']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('energy_suppliers')->where('name', 'Kikker Energie/DGB Energie')->where('abbreviation', 'DGB')->update(['name' => 'DGB Energie']);
    }
};
