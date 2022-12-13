<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProjectManagerIdAndExternalPartyIdToQuotationRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->unsignedInteger('project_manager_id')->nullable()->default(null)->after('contact_id');
            $table->foreign('project_manager_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->unsignedInteger('external_party_id')->nullable()->default(null)->after('contact_id');
            $table->foreign('external_party_id')
                ->references('id')->on('contacts')
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
        if (Schema::hasColumn('quotation_requests', 'project_manager_id')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropForeign(['project_manager_id']);
                $table->dropColumn('project_manager_id');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'external_party_id')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropForeign(['external_party_id']);
                $table->dropColumn('external_party_id');
            });
        }
    }
}
