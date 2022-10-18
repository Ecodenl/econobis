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
        Schema::create('portal_two_factor_tokens', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('portal_user_id');
            $table->foreign('portal_user_id')
                ->references('id')->on('portal_users')
                ->onDelete('cascade');
            $table->string('token');
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
        Schema::dropIfExists('portal_two_factor_tokens');
    }
};