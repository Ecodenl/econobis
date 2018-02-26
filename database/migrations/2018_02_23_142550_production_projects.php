<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductionProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production_project_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $production_project_statusses = [
            'Voorbereiding',
            'In productie',
            'Beëindigd',
        ];

        foreach (
            $production_project_statusses as $production_project_status
        ) {
            DB::table('production_project_status')->insert([
                    'name' => $production_project_status
                ]
            );
        }

        Schema::create('production_project_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $production_project_types = [
            'SDE',
            'PCR',
            'Investering',
        ];

        foreach (
            $production_project_types as $production_project_type
        ) {
            DB::table('production_project_type')->insert([
                    'name' => $production_project_type
                ]
            );
        }

        Schema::create('production_projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code');
            $table->string('description')->nullable();

            $table->unsignedInteger('owned_by_id');
            $table->foreign('owned_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('production_project_status_id')->nullable();
            $table->foreign('production_project_status_id')
                ->references('id')->on('production_project_status')
                ->onDelete('restrict');

            $table->date('date_start')->nullable();
            $table->date('date_production')->nullable();
            $table->date('date_start_registrations')->nullable();
            $table->date('date_end_registrations')->nullable();

            $table->unsignedInteger('production_project_type_id')->nullable();
            $table->foreign('production_project_type_id')
                ->references('id')->on('production_project_type')
                ->onDelete('restrict');

            $table->string('postal_code')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('ean')->nullable();
            $table->string('ean_manager')->nullable();
            $table->string('warranty_origin')->nullable();
            $table->string('ean_supply')->nullable();
            $table->float('participation_worth')->default(0);
            $table->integer('power_kwh_available')->nullable();
            $table->integer('max_participations')->nullable();
            $table->string('tax_referral')->nullable();
            $table->integer('max_participations_youth')->nullable();
            $table->integer('total_participations')->nullable();
            $table->integer('min_participations')->nullable();
            $table->boolean('is_membership_required')->default(false);
            $table->boolean('is_participation_transferable')->default(false);

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('production_projects');
        Schema::dropIfExists('production_project_type');
        Schema::dropIfExists('production_project_status');
    }
}
