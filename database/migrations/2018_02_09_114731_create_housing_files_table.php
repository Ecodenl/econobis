<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('roof_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('building_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('energy_label_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('housing_files', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses');

            $table->integer('building_type_id')->unsigned()->nullable();
            $table->foreign('building_type_id')->references('id')->on('building_types');

            $table->year('build_year')->nullable();
            $table->integer('surface')->nullable();

            $table->integer('roof_type_id')->unsigned()->nullable();
            $table->foreign('roof_type_id')->references('id')->on('roof_types');

            $table->integer('energy_label_id')->unsigned()->nullable();
            $table->foreign('energy_label_id')->references('id')->on('energy_labels');

            $table->integer('floors')->nullable();

            $table->integer('energy_label_status_id')->unsigned()->nullable();
            $table->foreign('energy_label_status_id')->references('id')->on('energy_label_status');

            $table->boolean('is_monument')->nullable();

            $table->integer('created_by_id')->unsigned();
            $table->foreign('created_by_id')->references('id')->on('users');

            $table->integer('updated_by_id')->unsigned();
            $table->foreign('updated_by_id')->references('id')->on('users');
            
            $table->timestamps();
        });

        Schema::create('measure_taken_address', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->integer('address_id')->unsigned();
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->integer('measure_id')->unsigned();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->date('measure_date')->nullable();
            $table->unique(['address_id','measure_id']);
            $table->timestamps();
        });

        $buildingTypes = [
            'Vrijstaand',
            'Hoekwoning',
            'Tussenwoning',
            'Appartement',
            'Appartement VVE',
            'Gehele tussenwoning',
            'Beneden woning meerdere verdiepingen',
        ];

        foreach ($buildingTypes as $types) {
            DB::table('building_types')->insert([
                    ['name' => $types],
                ]
            );
        }

        $energyLabels = [
            'A+++',
            'A++',
            'A+',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
        ];

        foreach ($energyLabels as $energyLabel) {
            DB::table('energy_labels')->insert([
                    ['name' => $energyLabel],
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('intakes');
        Schema::dropIfExists('intake_status');
    }
}
