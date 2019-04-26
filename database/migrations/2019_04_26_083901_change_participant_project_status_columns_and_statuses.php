<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeParticipantProjectStatusColumnsAndStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_project_status', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
            $table->integer('order')->nullable()->after('code_ref');
            $table->softDeletes();
        });

        // Set existing status 'Overgedragen' and 'Beëindigd' on delete
        DB::table('participant_project_status')->where('name', 'Overgedragen')->update(['deleted_at' => Carbon::now()]);
        DB::table('participant_project_status')->where('name', 'Beëindigd')->update(['deleted_at' => Carbon::now()]);

        // Add code ref and sort order to all active statuses
        DB::table('participant_project_status')
            ->where('name', 'Interesse')
            ->update(['code_ref' => 'interest', 'order' => 1]);

        DB::table('participant_project_status')
            ->where('name', 'Optie')
            ->update(['code_ref' => 'option', 'order' => 2]);

        DB::table('participant_project_status')
            ->where('name', 'Definitief')
            ->update(['code_ref' => 'final', 'order' => 4]);

        DB::table('participant_project_status')
            ->insert([
                'name' => 'Toegekend',
                'code_ref' => 'granted',
                'order' => 3,
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
        //
    }
}