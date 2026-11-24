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
        Schema::table('occupations', function (Blueprint $table) {
            $table->string('code_ref')->nullable()->after('id');
            $table->boolean('is_active')
                ->default(true)
                ->after('occupation_for_portal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('occupations', function (Blueprint $table) {
            $table->dropColumn('is_active');
            $table->dropColumn('code_ref');
        });
    }
};
