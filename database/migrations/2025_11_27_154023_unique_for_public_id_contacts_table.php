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
        // Unique op public_id
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('public_id', 22)->nullable(false)->change();
            $table->unique('public_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('public_id', 22)->nullable()->change();
            $table->dropUnique('contacts_public_id_unique');
        });
    }
};
