<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactToImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_to_imports', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('last_name_prefix')->nullable();
            $table->string('address');
            $table->string('street');
            $table->unsignedInteger('housenumber')->nullable();
            $table->string('addition')->nullable();
            $table->string('postal_code');
            $table->string('city');
            $table->string('email_contact');
            $table->string('phone_number');
            $table->string('ean');
            $table->string('ean_type');
            $table->string('es_number');
            $table->date('member_since');
            $table->date('end_date')->nullable();
            $table->string('match')->nullable();
            $table->string('status');
            $table->timestamps();

            $table->unsignedInteger('contact_id')->nullable();
            $table->foreign('contact_id')->references('id')->on('contacts');

            $table->string('supplier_code_ref');
            $table->foreign('supplier_code_ref')->references('code_ref')->on('contact_to_import_suppliers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts_to_import');
        Schema::dropIfExists('contact_to_imports');
    }
}