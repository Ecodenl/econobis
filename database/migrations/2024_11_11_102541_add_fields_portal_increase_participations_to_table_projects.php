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
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('allow_increase_participations_in_portal')->default(false)->after('document_template_agreement_id');
            $table->unsignedInteger('email_template_increase_participations_id')->nullable()->after('allow_increase_participations_in_portal');
            $table->foreign('email_template_increase_participations_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->unsignedInteger('document_template_increase_participations_id')->nullable()->after('email_template_increase_participations_id');
            $table->foreign('document_template_increase_participations_id')
                ->references('id')->on('document_templates')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['document_template_increase_participations_id']);
            $table->dropColumn('document_template_increase_participations_id');
            $table->dropForeign(['email_template_increase_participations_id']);
            $table->dropColumn('email_template_increase_participations_id');
            $table->dropColumn('allow_increase_participations_in_portal');
        });
    }
};
