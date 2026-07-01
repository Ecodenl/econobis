<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('iban_old');
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('IBAN');
            $table->dropColumn('iban_attn');
        });

        DB::table('invoice_mollie_payments')
            ->whereNotNull('iban')
            ->where('iban', '!=', '')
            ->orderBy('id')
            ->chunkById(100, function ($invoiceMolliePayments) {
                foreach ($invoiceMolliePayments as $invoiceMolliePayment) {
                    DB::table('invoice_mollie_payments')
                        ->where('id', $invoiceMolliePayment->id)
                        ->update([
                            'iban' => Crypt::encryptString($invoiceMolliePayment->iban),
                        ]);
                }
            });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
