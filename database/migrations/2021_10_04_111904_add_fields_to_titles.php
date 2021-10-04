<?php

use App\Eco\Title\Title;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddFieldsToTitles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('titles', function (Blueprint $table) {
            $table->string('address')->nullable(true)->after('name');
            $table->string('salutation')->nullable(true)->after('address');
            $table->boolean('active')->default(true)->after('salutation');
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('titles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $titlesToSeed = [
            [
                'id' => 1,
                'name' => 'Dhr',
                'address' => 'De heer',
                'salutation' => 'heer',
                'active' => true,
            ],
            [
                'id' => 2,
                'name' => 'Mevr',
                'address' => 'Mevrouw',
                'salutation' => 'mevrouw',
                'active' => true,
            ],
            [
                'id' => 3,
                'name' => 'De heer, Mevrouw',
                'address' => 'De heer, Mevrouw',
                'salutation' => 'heer, mevrouw',
                'active' => true,
            ],
            [
                'id' => 4,
                'name' => 'Familie',
                'address' => 'Familie',
                'salutation' => 'familie',
                'active' => true,
            ],
            [
                'id' => 5,
                'name' => 'De heer of mevrouw',
                'address' => 'De heer of mevrouw',
                'salutation' => 'heer of mevrouw',
                'active' => true,
            ],
            [
                'id' => 6,
                'name' => 'De heren',
                'address' => 'De heren',
                'salutation' => 'heren',
                'active' => true,
            ],
            [
                'id' => 7,
                'name' => 'De dames',
                'address' => 'De dames',
                'salutation' => 'dames',
                'active' => true,
            ],
            [
                'id' => 8,
                'name' => 'Erven',
                'address' => 'Erven van',
                'salutation' => 'erven van',
                'active' => false,
            ],
            [
                'id' => 9,
                'name' => 'Geen voorkeur',
                'address' => '',
                'salutation' => '',
                'active' => true,
            ]
        ];

        DB::table('titles')->insert($titlesToSeed);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('titles', function (Blueprint $table) {
            $table->removeColumn('address');
            $table->removeColumn('salutation');
            $table->removeColumn('active');
        });
    }
}
