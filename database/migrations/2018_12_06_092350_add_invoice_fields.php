<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AddInvoicefields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function ($table) {
            $table->string('iban_attn')->nullable();
            $table->string('sent_to_name')->nullable();
            $table->string('sent_to_street')->nullable();
            $table->integer('sent_to_street_number')->nullable();
            $table->string('sent_to_addition')->nullable();
            $table->string('sent_to_postal_code')->nullable();
            $table->string('sent_to_country')->nullable();
            $table->string('sent_to_contact_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function ($table) {
            $table->dropColumn('iban_attn');
            $table->dropColumn('sent_to_name');
            $table->dropColumn('sent_to_street');
            $table->dropColumn('sent_to_street_number');
            $table->dropColumn('sent_to_addition');
            $table->dropColumn('sent_to_postal_code');
            $table->dropColumn('sent_to_country');
            $table->dropColumn('sent_to_contact_number');
        });
    }
}
