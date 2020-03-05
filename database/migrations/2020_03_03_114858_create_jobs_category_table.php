<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('job_categories');

        Schema::create('job_categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 100)->nullable(false);
            $table->timestamps();
        });

        Schema::table('jobs_log', function (Blueprint $table) {
            $table->unsignedBigInteger('job_category_id')->nullable();
            $table->foreign('job_category_id')->references('id')->on('job_categories')
                ->onDelete('set null');
        });

        $this->insertJobCategories();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jobs_log', function(Blueprint $table) {
           $table->dropForeign(['job_category_id']);
           $table->dropColumn('job_category_id');
        });

        Schema::dropIfExists('jobs_category');
    }

    function insertJobCategories() {
        \Illuminate\Support\Facades\DB::table('job_categories')->insertOrIgnore([
            ['name' => 'Deelnemer rapportage'],
            ['name' => 'Opbrengstverdeling rapportage']
        ]);
    }
}
