<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDocumentTemplateIdToFinancialOverviewTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('financial_overviews', function (Blueprint $table) {
            $table->unsignedInteger('document_template_financial_overview_id')->nullable();
            $table->foreign('document_template_financial_overview_id', 'financial_overviews_document_template_fo_id_foreign')->references('id')->on('document_templates')
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
        if (Schema::hasColumn('financial_overviews', 'document_template_financial_overview_id'))
        {
            Schema::table('financial_overviews', function (Blueprint $table)
            {
                $table->dropForeign('financial_overviews_document_template_fo_id_foreign');
                $table->dropColumn('document_template_financial_overview_id');
            });
        }

    }
}
