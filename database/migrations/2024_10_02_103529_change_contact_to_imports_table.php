<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_to_imports', function (Blueprint $table) {
            $table->string('contact_type')->after('id');
        });
        Schema::create('contact_for_imports', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contact_to_import_id')->nullable();
            $table->foreign('contact_to_import_id')->references('id')->on('contact_to_imports')->onDelete('cascade');
            $table->unsignedInteger('contact_id')->nullable();
            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->string('match_code');
            $table->string('match_description');
            $table->string('match_color');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact_for_imports');

        Schema::table('contact_to_imports', function (Blueprint $table) {
            $table->dropColumn('contact_type');
        });
    }
};
