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

        // update for new fields
        DB::table('titles')
            ->where('id', 1)
            ->orWhere('name', 'Dhr')
            ->update([
                'address' => 'De heer',
                'salutation' => 'heer',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 2)
            ->orWhere('name', 'Mevr')
            ->update([
                'address' => 'Mevrouw',
                'salutation' => 'mevrouw',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 3)
            ->orWhere('name', 'De heer, Mevrouw')
            ->update([
                'address' => 'De heer, Mevrouw',
                'salutation' => 'heer, mevrouw',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 4)
            ->orWhere('name', 'Familie')
            ->update([
                'address' => 'Familie',
                'salutation' => 'familie',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 5)
            ->orWhere('name', 'De heer of mevrouw')
            ->update([
                'address' => 'De heer of mevrouw',
                'salutation' => 'heer of mevrouw',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 6)
            ->orWhere('name', 'De heren')
            ->update([
                'address' => 'De heren',
                'salutation' => 'heren',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 7)
            ->orWhere('name', 'De dames')
            ->update([
                'address' => 'De dames',
                'salutation' => 'dames',
                'active' => true,
            ]);
        DB::table('titles')
            ->where('id', 8)
            ->orWhere('name', 'Erven')
            ->update([
                'address' => 'Erven van',
                'salutation' => 'erven van',
                'active' => false,
            ]);

        // insert new
        DB::table('titles')->insert(
            [
                'name' => 'Geen voorkeur',
                'address' => '',
                'salutation' => '',
                'active' => true,
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
        DB::table('titles')
            ->where('id', 9)
            ->orWhere('name', 'Geen voorkeur')
            ->delete();

        if (Schema::hasColumn('titles', 'address')) {
            Schema::table('titles', function (Blueprint $table) {
                $table->dropColumn('address');
            });
        }
        if (Schema::hasColumn('titles', 'salutation')) {
            Schema::table('titles', function (Blueprint $table) {
                $table->dropColumn('salutation');
            });
        }
        if (Schema::hasColumn('titles', 'active')) {
            Schema::table('titles', function (Blueprint $table) {
                $table->dropColumn('active');
            });
        }
    }
}
