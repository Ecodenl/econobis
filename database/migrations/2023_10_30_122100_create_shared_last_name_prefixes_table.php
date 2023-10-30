<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSharedLastNamePrefixesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::connection('econobis_shared')->create('shared_last_name_prefixes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 16)->default('');
            $table->timestamps();
        });

        $prefixes = [
            [1, 'van'],
            [2, 'de'],
            [3, 'van der'],
            [4, 'van de'],
            [5, 'van den'],
            [6, 'den'],
            [7, 'ten'],
            [8, 'ter'],
            [9, 'te'],
            [10, 'van \'t'],
            [11, 'el'],
            [12, 'le'],
            [13, 'van het'],
            [14, 'in \'t'],
            [15, '\'t'],
            [16, 'von'],
            [17, 'du'],
            [18, 'da'],
            [19, 'de la'],
            [20, 'la'],
            [21, 'der'],
            [22, 'van ter'],
            [23, 'op \'t'],
            [24, 'op den'],
            [25, 'op ten'],
            [26, 'op de'],
            [27, 'uit den'],
            [28, 'di'],
        ];

        foreach ($prefixes as $prefix) {
            DB::connection('econobis_shared')->table('shared_last_name_prefixes')->insert([
                    [
                        'id' => $prefix[0],
                        'name' => $prefix[1]
                    ],
                ]
            );
        }

        //change the foreign keys from users to this new table
        Schema::connection('mysql')->table('users', function (Blueprint $table) {
            $table->dropForeign('users_last_name_prefix_id_foreign');
            $table->foreign('last_name_prefix_id')->references('id')->on(config('database.connections.econobis_shared.database') . '.shared_last_name_prefixes')->onDelete('restrict');
        });

        //rename the original table
        Schema::connection('mysql')->rename('last_name_prefixes', 'xxx_last_name_prefixes');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql')->rename('xxx_last_name_prefixes', 'last_name_prefixes');

        Schema::connection('mysql')->table('users', function (Blueprint $table) {
            $table->dropForeign('users_last_name_prefix_id_foreign');
            $table->foreign('last_name_prefix_id')->references('id')->on('last_name_prefixes')->onDelete('restrict');
        });

        Schema::connection('econobis_shared')->dropIfExists('shared_last_name_prefixes');


    }
}
