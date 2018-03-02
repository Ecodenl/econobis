<?php

use App\Eco\Opportunity\Opportunity;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OpportunitiesMeasures extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $opportunities = Opportunity::all();

        foreach ($opportunities as $opportunity) {
            $opportunity->measure_id = 1;
            $opportunity->save();
        }

        Schema::table('opportunities', function (Blueprint $table) {
            $table->dropForeign(['measure_id']);
            $table->renameColumn('measure_id', 'measure_category_id');

            $table->foreign('measure_category_id')
                ->references('id')->on('measure_categories')
                ->onDelete('restrict');
        });

        Schema::create('measure_opportunity', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('opportunity_id')->nullable()->default(null);
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');

            $table->unsignedInteger('measure_id')->nullable()->default(null);
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->unique(['opportunity_id', 'measure_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
