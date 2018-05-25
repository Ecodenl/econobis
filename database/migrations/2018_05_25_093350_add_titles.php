<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddTitles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('titles', function ($table) {
            $table->string('name', 26)->change();
        });

        $titles = ['De heer, Mevrouw', 'Familie', 'De heer of mevrouw', 'De heren', 'De dames'];
        foreach ($titles as $title) {
            DB::table('titles')->insert([
                'name' => $title
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
