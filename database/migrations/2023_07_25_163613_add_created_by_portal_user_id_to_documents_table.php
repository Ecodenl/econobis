<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreatedByPortalUserIdToDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->string('file_path_and_name')->nullable()->after('filename');
            $table->unsignedInteger('created_by_portal_user_id')->after('created_by_id')->nullable();
            $table->foreign('created_by_portal_user_id')->references('id')->on('portal_users');
        });
        if (Schema::hasColumn('documents', 'xxx_document_created_from')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropColumn('xxx_document_created_from');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('documents', 'created_by_portal_user_id')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropForeign(['created_by_portal_user_id']);
                $table->dropColumn('created_by_portal_user_id');
                $table->dropColumn('file_path_and_name');
            });
        }
    }
}
