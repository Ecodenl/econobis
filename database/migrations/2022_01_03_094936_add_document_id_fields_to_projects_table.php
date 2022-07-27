<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDocumentIdFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->unsignedInteger('document_id_project_info')->nullable();
            $table->foreign('document_id_project_info')
                ->references('id')->on('documents')
                ->onDelete('restrict');
            $table->unsignedInteger('document_id_agree_terms')->nullable();
            $table->foreign('document_id_agree_terms')
                ->references('id')->on('documents')
                ->onDelete('restrict');
            $table->unsignedInteger('document_id_understand_info')->nullable();
            $table->foreign('document_id_understand_info')
                ->references('id')->on('documents')
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
        if (Schema::hasColumn('projects', 'document_id_understand_info')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign('projects_document_id_understand_info_foreign');
                $table->dropColumn('document_id_understand_info');
            });
        }
        if (Schema::hasColumn('projects', 'document_id_agree_terms')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign('projects_document_id_agree_terms_foreign');
                $table->dropColumn('document_id_agree_terms');
            });
        }
        if (Schema::hasColumn('projects', 'document_id_project_info')) {
            Schema::table('projects', function (Blueprint $table) {
                $table->dropForeign('projects_document_id_project_info_foreign');
                $table->dropColumn('document_id_project_info');
            });
        }
    }
}
