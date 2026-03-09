<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Kolom toevoegen
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('public_id', 22)->nullable()->after('id');
        });

        // 2. public_id vullen in batches
        DB::table('contacts')->orderBy('id')->chunk(500, function ($contacts) {
            foreach ($contacts as $contact) {
                // Alleen vullen als nog leeg (bij nieuwe deployments of reruns)
                if (empty($contact->public_id)) {
                    DB::table('contacts')
                        ->where('id', $contact->id)
                        ->update(['public_id' => Str::random(22)]);
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('public_id');
        });
    }
};
