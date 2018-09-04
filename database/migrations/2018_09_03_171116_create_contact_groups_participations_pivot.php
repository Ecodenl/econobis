<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactGroupsParticipationsPivot extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_participant_pivot', function (Blueprint $table) {
            $table->unsignedInteger('participant_id');
            $table->foreign('participant_id')
                ->references('id')->on('participation_production_project')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_group_id');
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');

            $table->unique(['participant_id', 'contact_group_id']);
        });

        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('composed_of');
        });

        foreach (\App\Eco\ContactGroup\ContactGroup::withTrashed()->get() as $cg){
            $cg->composed_of = 'contacts';
            $cg->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_participant_pivot');

        Schema::table('contact_groups', function (Blueprint $table) {
            $table->dropColumn('composed_of');
        });
    }
}
