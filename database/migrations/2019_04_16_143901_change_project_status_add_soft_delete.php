<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProjectStatusAddSoftDelete extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add softdelete to table
        Schema::table('project_status', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Set existing status 'Gerealiseerd' on delete
        DB::table('project_status')->where('name', 'gerealiseerd')->update(['deleted_at' => Carbon::now()]);
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