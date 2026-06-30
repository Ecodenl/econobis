<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('webforms', function (Blueprint $table) {
            $table->string('api_type', 50)->nullable()->after('api_key');
        });

        Schema::create('webform_actions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('webform_id');
            $table->string('action_code', 100);
            $table->boolean('enabled')->default(true);
            $table->timestamps();

            $table->unique(['webform_id', 'action_code'], 'webform_actions_webform_id_action_code_unique');

            $table->foreign('webform_id')
                ->references('id')
                ->on('webforms')
                ->onDelete('cascade');
        });

        Schema::create('webform_action_filters', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('webform_action_id');
            $table->string('field', 100);
            $table->string('operator', 30)->default('=');
            $table->string('value', 191)->nullable();
            $table->timestamps();

            $table->index('webform_action_id', 'webform_action_filters_action_id_index');

            $table->foreign('webform_action_id', 'webform_action_filters_action_id_foreign')
                ->references('id')
                ->on('webform_actions')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webform_action_filters');
        Schema::dropIfExists('webform_actions');

        Schema::table('webforms', function (Blueprint $table) {
            $table->dropColumn('api_type');
        });
    }
};
