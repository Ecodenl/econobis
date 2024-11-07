<?php

use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('measures', function (Blueprint $table) {
            $table->string('name_custom')->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('measures', function (Blueprint $table)
        {
            $table->dropColumn('name_custom');
        });
    }
};
