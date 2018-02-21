<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpportunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $superuserRole = \Spatie\Permission\Models\Role::find(1);

        $permissions = [
            'manage_opportunity'
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole->syncPermissions(\Spatie\Permission\Models\Permission::all());

        Schema::create('opportunity_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        $opportunityStatus = [
            'Actief',
            'In afwachting',
            'Realisatie',
            'Realisatie, doe het zelf',
            'Geen realisatie',
        ];

        foreach ($opportunityStatus as $status) {
            DB::table('opportunity_status')->insert([
                    ['name' => $status],
                ]
            );
        }
        Schema::create('opportunities', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('measure_id');
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');
            $table->string('number');
            $table->unsignedInteger('status_id');
            $table->foreign('status_id')
                ->references('id')->on('opportunity_status')
                ->onDelete('restrict');
            $table->unsignedInteger('intake_id')->nullable();
            $table->foreign('intake_id')
                ->references('id')->on('intakes')
                ->onDelete('restrict');
            $table->text('quotation_text')->nullable();
            $table->date('desired_date')->nullable();
            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('updated_by_id')->nullable();
            $table->foreign('updated_by_id')
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
        Schema::dropIfExists('opportunity_status');
        Schema::dropIfExists('opportunities');
    }
}
