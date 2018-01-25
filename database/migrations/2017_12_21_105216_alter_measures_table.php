<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterMeasuresTable extends Migration
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
            'manage_measure'
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole->syncPermissions(\Spatie\Permission\Models\Permission::all());

        Schema::create('faq_measure', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('measure_id')->nullable();
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->string('question');
            $table->string('answer');
            $table->timestamps();
        });

        Schema::create('organisation_delivers_measure', function (Blueprint $table) {
            $table->unsignedInteger('measure_id')->nullable();
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');

            $table->unsignedInteger('organisation_id')->nullable();
            $table->foreign('organisation_id')
                ->references('id')->on('organisations')
                ->onDelete('restrict');

            $table->primary(['measure_id', 'organisation_id']);

            $table->timestamps();
        });

        Schema::table('measures', function (Blueprint $table) {
            $table->string('number');
            $table->string('description')->nullable();
            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
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
