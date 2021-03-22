<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreatedWithAndUpdatedWithToParticipantMutationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->string('created_with', 16)->nullable()->default(null)->after('created_at');
            $table->string('updated_with', 16)->nullable()->default(null)->after('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('participant_mutations', 'created_with'))
        {
            Schema::table('participant_mutations', function (Blueprint $table)
            {
                $table->dropColumn('created_with');
            });
        }
        if (Schema::hasColumn('participant_mutations', 'updated_with'))
        {
            Schema::table('participant_mutations', function (Blueprint $table)
            {
                $table->dropColumn('updated_with');
            });
        }
    }
}
