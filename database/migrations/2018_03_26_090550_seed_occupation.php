<?php

use App\Eco\Occupation\Occupation;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use App\Eco\Person\Person;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SeedOccupation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('occupations', function($table) {
            $table->renameColumn('name', 'primary_occupation');
            $table->string('secondary_occupation')->nullable();
        });

        $occupations = Occupation::all();

        foreach ($occupations as $occupation){
            $occupation->secondary_occupation = $occupation->primary_occupation;
            $occupation->save();
        }


        $occupations = [
            'Wettelijke vertegenwoordiger' => 'Vertegenwoordigde',
            'Schenker' => 'Ontvanger',
            'Hoofdvestiging' => 'Nevenvestiging'
        ];

        foreach ($occupations as $po => $so) {
            DB::table('occupations')->insert([
                    ['primary_occupation' => $po, 'secondary_occupation' => $so],
                ]
            );
        }

        Schema::table('occupations', function($table) {
            $table->string('secondary_occupation')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('occupations', function($table) {
            $table->renameColumn('primary_occupation', 'name');
            $table->dropColumn('secondary_occupation');
        });
    }
}
