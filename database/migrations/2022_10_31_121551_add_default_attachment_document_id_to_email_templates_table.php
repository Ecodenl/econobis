<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultAttachmentDocumentIdToEmailTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('email_templates', function (Blueprint $table) {
            $table->unsignedInteger('default_attachment_document_id')->nullable()->after('subject');
            $table->foreign('default_attachment_document_id')
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
        Schema::table('email_templates', function (Blueprint $table) {
            $table->dropForeign(['default_attachment_document_id']);
            $table->dropColumn('default_attachment_document_id');
        });
    }
}
