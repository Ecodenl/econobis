<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWozValueToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->double('woz_value')->nullable()->after('amount_electricity');
        });

        DB::table('housing_file_hoom_links')->insert([
            [
                'external_hoom_short_name'=> 'woz_value',
                'econobis_field_name'=> 'woz_value',
                'housing_file_data_type'=> 'B',
                'label' => 'Woz waarde',
                'import_from_hoom'=> false,
                'visible_in_econobis'=> true,
                'created_at'=> Carbon::now(),
                'updated_at'=> Carbon::now()
            ],
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('housing_file_hoom_links')
            ->where('external_hoom_short_name', 'woz_value')
            ->delete();

        Schema::table('housing_files', function (Blueprint $table) {
            $table->dropColumn('woz_value');
        });
    }
};
