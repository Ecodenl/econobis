<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreatedWithAndUpdatedWithToParticipationProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
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
        if (Schema::hasColumn('participation_project', 'created_with'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropColumn('created_with');
            });
        }
        if (Schema::hasColumn('participation_project', 'updated_with'))
        {
            Schema::table('participation_project', function (Blueprint $table)
            {
                $table->dropColumn('updated_with');
            });
        }

    }
}
