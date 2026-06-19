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
        Schema::table('housing_files', function ($table) {
            $table->string('is_house_for_sale', 1)->change();
            $table->string('is_monument', 1)->nullable()->change();
        });

        DB::table('housing_files')
            ->whereNull('is_monument')
            ->update(['is_monument' => '2']); // '2' = Onbekend

        Schema::table('housing_files', function ($table) {
            $table->string('is_monument', 1)->nullable(false)->change();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('housing_files', function ($table) {
            $table->string('is_monument', 1)->nullable(true)->change();
        });

        DB::table('housing_files')
            ->where('is_monument', '2')
            ->update(['is_monument' => null]);

        // Stap 2: Zet kolommen terug naar boolean/tinyint met nullable true (zoals oorspronkelijk)
        Schema::table('housing_files', function ($table) {
            $table->boolean('is_house_for_sale')->change();
            $table->boolean('is_monument')->nullable()->change();
        });
    }
};
