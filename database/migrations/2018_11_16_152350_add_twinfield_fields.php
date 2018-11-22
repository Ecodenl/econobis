<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwinfieldFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administration_contact_twinfield', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->string('twinfield_number')->nullable();
        });

        Schema::create('administration_ledger_twinfield', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->string('code');
            $table->string('name');
        });

        Schema::table('administrations', function (Blueprint $table) {
            $table->string('twinfield_username')->nullable();
            $table->text('twinfield_password')->nullable();
            $table->string('twinfield_organization_code')->nullable();
            $table->string('twinfield_office_code')->nullable();
            $table->boolean('uses_twinfield');
            $table->boolean('twinfield_is_valid');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('administration_ledger_twinfield_id')->nullable();
            $table->foreign('administration_ledger_twinfield_id')
                ->references('id')->on('administration_ledger_twinfield')
                ->onDelete('restrict');
        });

        Schema::table('invoice_product', function (Blueprint $table) {
            $table->string('twinfield_ledger_code')->nullable();
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->string('twinfield_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('administration_ledger_twinfield');
        Schema::dropIfExists('administration_contact_twinfield');

        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('twinfield_username');
            $table->dropColumn('twinfield_password');
            $table->dropColumn('twinfield_organization_code');
            $table->dropColumn('twinfield_office_code');
            $table->boolean('uses_twinfield');
            $table->boolean('twinfield_is_valid');
        });


        Schema::table('invoice_product', function (Blueprint $table) {
            $table->dropColumn('twinfield_ledger_code');
        });


        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('twinfield_number');
        });
    }
}
