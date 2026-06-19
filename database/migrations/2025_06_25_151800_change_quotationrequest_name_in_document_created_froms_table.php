<?php

use Illuminate\Database\Migrations\Migration;

class ChangeQuotationrequestNameInDocumentCreatedFromsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('document_created_froms')->where('code_ref', 'quotationrequest')->update(['name' => 'Kansactie']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('document_created_froms')->where('code_ref', 'quotationrequest')->update(['name' => 'Offerteverzoek']);
    }
}
