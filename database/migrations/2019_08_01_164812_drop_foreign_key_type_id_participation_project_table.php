<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropForeignKeyTypeIdParticipationProjectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            try{
                $table->dropForeign('participation_project_type_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
        });

        Schema::table('participation_project', function (Blueprint $table) {
            $table->integer('type_id')->nullable()->default(null)->unsigned()->change();
        });
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
