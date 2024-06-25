<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;

class SeedInDenLastNamePrefixesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $prefixes = [
            'in den',
        ];

        foreach ($prefixes as $prefix) {
            DB::table('last_name_prefixes')->insert([
                    ['name' => $prefix,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]
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
        $prefixes = [
            'in den',
        ];

        foreach ($prefixes as $prefix) {
            DB::table('last_name_prefixes')->where('name', $prefix)->delete();
        }
    }
}
