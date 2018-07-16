<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEmailContactGroup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('contact_group_id')->nullable()->default(null);
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
        });

        Schema::create('email_group_email_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('email_id')->nullable();
            $table->foreign('email_id')
                ->references('id')->on('emails')
                ->onDelete('restrict');
            $table->unsignedInteger('email_address_id')->nullable();
            $table->foreign('email_address_id')
                ->references('id')->on('email_addresses')
                ->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['contact_group_id']);
            $table->dropColumn('contact_group_id');
        });

        Schema::dropIfExists('email_group_email_addresses');
    }
}
