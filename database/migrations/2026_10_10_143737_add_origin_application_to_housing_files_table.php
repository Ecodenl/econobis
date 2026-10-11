<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->string('origin_application')->nullable()->after('hoom_building_id');
        });

        DB::table('housing_files')
            ->whereNotNull('hoom_building_id')
            ->update(['origin_application' => 'hoom']);

        DB::table('housing_files')
            ->whereNull('hoom_building_id')
            ->update(['origin_application' => 'econobis']);

        Schema::table('housing_files', function (Blueprint $table) {
            $table->string('origin_application')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->dropColumn('origin_application');
        });
    }
};