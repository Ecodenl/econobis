<?php

use App\Eco\HousingFile\HousingFile;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateHousingFileSpecificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('housing_file_specification_statuses', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('name');
            $table->timestamps();
        });

//        Keuze Gewenst, Wordt gerealiseerd. Aanwezig, Onbekend
        $statuses = [
                'Gewenst',
                'Wordt gerealiseerd',
                'Aanwezig',
                'Onbekend',
        ];
        foreach ($statuses as $status) {
            DB::table('housing_file_specification_statuses')->insert(
                ['name'=> $status],
            );
        }

        Schema::create('housing_file_specification_sides', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('name');
            $table->timestamps();
        });

//        Keuze Voor, Achter, Links, Rechts
        $sides = [
            'Voor',
            'Achter',
            'Links',
            'Rechts',
        ];
        foreach ($sides as $side) {
            DB::table('housing_file_specification_sides')->insert(
                ['name'=> $side],
            );
        }

        Schema::create('housing_file_specification_floors', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->string('name');
            $table->timestamps();
        });

//        Keuze Begane grond, Eerste verdieping, Tweede verdieping
        $floors = [
            'Begane grond',
            'Eerste verdieping',
            'Tweede verdieping',
        ];
        foreach ($floors as $floor) {
            DB::table('housing_file_specification_floors')->insert(
                ['name'=> $floor],
            );
        }

        Schema::create('housing_file_specifications', function (Blueprint $table) {
            $table->increments('id')->unique();
            $table->integer('housing_file_id')->unsigned();
            $table->foreign('housing_file_id')->references('id')->on('housing_files');
            $table->integer('measure_id')->unsigned();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->date('measure_date')->nullable();
            $table->text('answer')->nullable();;
            $table->integer('status_id')->unsigned()->nullable();
            $table->foreign('status_id')->references('id')->on('housing_file_specification_statuses');
            $table->integer('floor_id')->unsigned()->nullable();
            $table->foreign('floor_id')->references('id')->on('housing_file_specification_floors');
            $table->integer('side_id')->unsigned()->nullable();
            $table->foreign('side_id')->references('id')->on('housing_file_specification_sides');
            $table->string('type_brand')->nullable();;
            $table->timestamps();
            $table->softdeletes();
        });

        $housingFiles = HousingFile::withTrashed()->get();
        foreach ($housingFiles as $housingFile) {
            $measuresTaken = DB::table('housing_file_measure_taken')->where('address_id', $housingFile->address_id)->get();
            foreach ($measuresTaken as $measureTaken) {
                DB::table('housing_file_specifications')->insert(
                    [
                        'housing_file_id' =>  $housingFile->id,
                        'measure_id' => $measureTaken->measure_id,
                        'measure_date' => $measureTaken->measure_date,
                        'created_at' => $measureTaken->created_at,
                        'updated_at' => $measureTaken->updated_at,
                    ]);
            }
        }

//        Schema::table('housing_files', function (Blueprint $table) {
//            $table->unsignedInteger('housing_file_specifications_id')->nullable()->default(null)->after('address_id');
//            $table->foreign('housing_file_specifications_id')
//                ->references('id')->on('housing_file_specifications')
//                ->onDelete('restrict');
//        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        if (Schema::hasColumn('housing_files', 'housing_file_specifications_id'))
//        {
//            Schema::table('housing_files', function (Blueprint $table)
//            {
//                $table->dropForeign('housing_files_housing_file_specifications_id_foreign');
//                $table->dropColumn('housing_file_specifications_id');
//            });
//        }
        Schema::dropIfExists('housing_file_specifications');
        Schema::dropIfExists('housing_file_specification_floors');
        Schema::dropIfExists('housing_file_specification_sides');
        Schema::dropIfExists('housing_file_specification_statuses');

    }
}
