<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoice_document', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('invoice_mollie_payments', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('invoice_product', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('order_product', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('invoice_product', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('invoice_mollie_payments', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('invoice_document', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
};
