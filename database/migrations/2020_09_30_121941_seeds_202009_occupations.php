<?php

use App\Eco\Occupation\Occupation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Seeds202009Occupations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $occupations = [
            'Gegevens beheerd door' => 'Gegevensbeheerder van'
        ];

        foreach ($occupations as $po => $so) {
            DB::table('occupations')->insert([
                    ['primary_occupation' => $po, 'secondary_occupation' => $so],
                ]
            );
        }
        $occupationEnergiecoach = Occupation::where('primary_occupation', 'Energiecoach')->first();
        $occupationEnergiecoach->primary_occupation = 'Energiecoach van';
        $occupationEnergiecoach->secondary_occupation = 'Gecoacht door';
        $occupationEnergiecoach->save();

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
