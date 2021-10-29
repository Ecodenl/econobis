<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsOkt2021ToDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->unsignedInteger('administration_id')->nullable()->after('order_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations');
            $table->boolean('show_on_portal')->default(false)->after('administration_id');
            $table->unsignedInteger('portal_filter_contact_group_id')->nullable()->after('show_on_portal');
            $table->foreign('portal_filter_contact_group_id')
                ->references('id')->on('contact_groups')
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
        if (Schema::hasColumn('documents', 'administration_id')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropForeign(['administration_id']);
                $table->dropColumn('administration_id');
            });
        }
        if (Schema::hasColumn('documents', 'show_on_portal')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropColumn('show_on_portal');
            });
        }
        if (Schema::hasColumn('documents', 'portal_filter_contact_group_id')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropForeign(['portal_filter_contact_group_id']);
                $table->dropColumn('portal_filter_contact_group_id');
            });
        }
    }
}
