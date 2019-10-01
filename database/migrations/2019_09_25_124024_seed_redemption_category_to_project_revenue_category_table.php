<?php

use Illuminate\Database\Migrations\Migration;

class SeedRedemptionCategoryToProjectRevenueCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('project_revenue_category')->insert([
                [
                    'name' => 'Aflossing Euro',
                    'code_ref' => 'redemptionEuro'
                ],
            ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
