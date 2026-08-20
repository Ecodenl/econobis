<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('participant_mutation_types', function (Blueprint $table) {
            $table->unsignedInteger('order_per_type')->nullable();
        });

        DB::table('participant_mutation_types')
            ->where('code_ref', 'withDrawal')
            ->update(['code_ref' => 'with_drawal']);

        DB::table('participant_mutation_types')
            ->where('code_ref', 'energyTaxRefund')
            ->update(['code_ref' => 'energy_tax_refund']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participant_mutation_types', function (Blueprint $table) {
            $table->dropColumn('order_per_type');
        });

        DB::table('participant_mutation_types')
            ->where('code_ref', 'with_drawal')
            ->update(['code_ref' => 'withDrawal']);

        DB::table('participant_mutation_types')
            ->where('code_ref', 'energy_tax_refund')
            ->update(['code_ref' => 'energyTaxRefund']);
    }
};
