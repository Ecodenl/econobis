<?php

use App\Eco\ParticipantMutation\ParticipantMutation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AddCodeToParticipantMutations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->string('code')->default('');
        });

        /**
         * Alle bestaande records een random code geven.
         * Via DB facade om zo de observer te omzeilen.
         */
        foreach (ParticipantMutation::all() as $participantMutation){
            \Illuminate\Support\Facades\DB::table('participant_mutations')
                ->where('id', $participantMutation->id)
                ->update([
                    'code' => Str::random(32),
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
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
}
