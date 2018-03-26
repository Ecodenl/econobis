<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedParticipationTypesAddInteresse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            $types = [
                'Interesse',
            ];

            foreach ($types as $type) {
                DB::table('participant_production_project_status')->insert([
                        ['name' => $type],
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
