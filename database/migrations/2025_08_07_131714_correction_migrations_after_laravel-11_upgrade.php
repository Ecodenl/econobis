<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('address_energy_suppliers', function (Blueprint $table) {
            $table->string('margin_fee')->nullable()->change();
        });
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('coach_max_appointments_per_week')->nullable()->default(100)->change();
            $table->integer('coach_min_minutes_between_appointments')->nullable()->default(30)->change();
        });
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('name')->default('')->change();
        });
        Schema::table('emails', function (Blueprint $table) {
            $table->text('to')->nullable()->default(null)->change();
            $table->text('cc')->nullable()->default(null)->change();
            $table->text('bcc')->nullable()->default(null)->change();
            $table->string('subject', 250)->default('')->change();
            $table->text('message_id')->nullable()->change();
        });
        Schema::table('housing_files', function (Blueprint $table) {
            $table->smallInteger('build_year')->nullable()->change();
        });
        Schema::table('intakes', function (Blueprint $table) {
            $table->string('note', 2500)->default('')->change();
        });
        Schema::table('invoices', function (Blueprint $table) {
            $table->text('iban')->nullable()->change();
            $table->string('invoice_text', 1000)->nullable()->change();
        });
        Schema::table('invoice_mollie_payments', function (Blueprint $table) {
            $table->string('checkout_url', 256)->nullable()->change();
        });
        Schema::table('oauth_clients', function (Blueprint $table) {
            $table->string('secret', 191)->nullable()->change();
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->string('invoice_text', 1000)->nullable()->change();
        });
        Schema::table('participant_mutation_mollie_payments', function (Blueprint $table) {
            $table->string('checkout_url', 256)->nullable()->change();
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->string('description', 2500)->nullable()->change();
            $table->string('postalcode_link', 300)->nullable()->change();
        });
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->date('date_begin')->nullable()->change();
            $table->date('date_end')->nullable()->change();
        });
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->datetime('date_recorded')->nullable()->change();
            $table->datetime('date_released')->nullable()->change();
        });
        Schema::table('revenues_kwh', function (Blueprint $table) {
            $table->double('delivered_total_concept')->nullable()->change();
            $table->double('delivered_total_confirmed')->nullable()->change();
            $table->double('delivered_total_processed')->nullable()->change();
        });
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->double('delivered_total_concept')->nullable()->change();
            $table->double('delivered_total_confirmed')->nullable()->change();
            $table->double('delivered_total_processed')->nullable()->change();
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->double('delivered_kwh')->nullable()->change();
        });
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->double('delivered_kwh')->nullable()->change();
        });
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->double('delivered_total_concept')->nullable()->change();
            $table->double('delivered_total_confirmed')->nullable()->change();
            $table->double('delivered_total_processed')->nullable()->change();
        });
        Schema::table('revenue_values_kwh', function (Blueprint $table) {
            $table->double('kwh_start')->nullable()->change();
            $table->double('kwh_start_high')->nullable()->change();
            $table->double('kwh_start_low')->nullable()->change();
            $table->double('delivered_kwh')->nullable()->change();
        });
        Schema::table('titles', function (Blueprint $table) {
            $table->string('name', 26)->default('')->change();
        });

        Schema::dropIfExists('old_project_revenues');
        Schema::dropIfExists('old_project_revenue_delivered_kwh_period');
        Schema::dropIfExists('old_project_revenue_distribution');
        Schema::dropIfExists('xxxx_project_revenue_delivered_kwh_period');
        Schema::dropIfExists('xxx_conversion2021_ozon');
        Schema::dropIfExists('xxx_conversion_revenues_kwh');
        Schema::dropIfExists('xxx_opportunity_evaluation');
        Schema::dropIfExists('xxx_project_revenues');
        Schema::dropIfExists('xxx_project_revenue_delivered_kwh_period');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
