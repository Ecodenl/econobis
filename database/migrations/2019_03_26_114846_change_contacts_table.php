<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //
        Schema::table('contacts', function (Blueprint $table) {
            $table->boolean('is_collect_mandate')->nullable(false)->default(false);
            $table->string('collect_mandate_code')->nullable(false)->default('');
            $table->date('collect_mandate_signature_date')->nullable();
            $table->date('collect_mandate_first_run_date')->nullable();
            $table->string('collect_mandate_collection_schema')->nullable(false)->default('');
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
