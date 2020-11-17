<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewPortalMemberFieldsToParticipationProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            $table->string('choice_membership', 1)->nullable()->default(null)->after('date_did_understand_info');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            $table->dropColumn('choice_membership');
        });
    }
}
