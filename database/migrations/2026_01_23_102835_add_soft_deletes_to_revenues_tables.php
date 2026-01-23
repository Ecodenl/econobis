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
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenues_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
        Schema::table('revenue_values_kwh', function (Blueprint $table) {
            $table->softDeletes(); // adds deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('revenue_values_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('revenue_parts_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('revenues_kwh', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
};
