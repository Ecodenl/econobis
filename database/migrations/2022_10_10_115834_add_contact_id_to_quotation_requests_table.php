<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddContactIdToQuotationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->unsignedInteger('contact_id')->nullable()->default(null)->after('id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->dropForeign('quotation_requests_organisation_id_foreign');
            $table->dropIndex('quotation_requests_organisation_id_foreign');
        });

//        $quotationRequests = \App\Eco\QuotationRequest\QuotationRequest::all();
//        foreach ($quotationRequests as $quotationRequest){
//            DB::table('quotation_requests')->where('id', $quotationRequest->id)->update(["contact_id" => $quotationRequest->organisation->contact_id]);
//        }
        DB::statement('UPDATE `quotation_requests` SET `quotation_requests`.`contact_id` = (select `organisations`.`contact_id` from `organisations` where `organisations`.`id` = `quotation_requests`.`organisation_id`) WHERE contact_id IS NULL');
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->renameColumn('organisation_id', 'xxx_organisation_id');
        });
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->unsignedInteger('xxx_organisation_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('quotation_requests', 'contact_id')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropForeign('quotation_requests_contact_id_foreign');
                $table->dropIndex('quotation_requests_contact_id_foreign');
                $table->renameColumn('xxx_organisation_id', 'organisation_id');
            });
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('contact_id');
                $table->foreign('organisation_id')->references('id')->on('organisations');
                $table->unsignedInteger('organisation_id')->nullable(false)->change();
            });
        }
    }
}
