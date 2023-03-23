<?php

use App\Eco\HousingFile\HousingFileSpecificationStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNew2FieldsMarch2023ToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::table('housing_files', function (Blueprint $table) {
//            //
//        });
        Schema::table('housing_file_specification_statuses', function (Blueprint $table) {
            $table->string('code_ref')->nullable(true)->after('name');
            $table->integer('order')->nullable(true)->after('code_ref');
        });

        foreach (HousingFileSpecificationStatus::all() as $housingFileSpecificationStatus){
            switch ($housingFileSpecificationStatus->id){
                case 1:                                             // Gewenst
                    $housingFileSpecificationStatus->code_ref = 'desirable';
                    $housingFileSpecificationStatus->order = 1;
                    $housingFileSpecificationStatus->save();
                    break;
                case 2:                                             // Wordt gerealiseerd
                    $housingFileSpecificationStatus->code_ref = 'is_realized';
                    $housingFileSpecificationStatus->order = 3;
                    $housingFileSpecificationStatus->save();
                    break;
                case 3:                                             // Aanwezig
                    $housingFileSpecificationStatus->code_ref = 'present';
                    $housingFileSpecificationStatus->order = 4;
                    $housingFileSpecificationStatus->save();
                    break;
                case 4:                                             // Onbekend
                    $housingFileSpecificationStatus->code_ref = 'unknown';
                    $housingFileSpecificationStatus->order = 5;
                    $housingFileSpecificationStatus->save();
                    break;
            }
        }
        $housingFileSpecificationStatus = New HousingFileSpecificationStatus();
        $housingFileSpecificationStatus->name = 'Kans gemaakt';
        $housingFileSpecificationStatus->code_ref = "opportunity_created";
        $housingFileSpecificationStatus->order = 2;
        $housingFileSpecificationStatus->save();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        HousingFileSpecificationStatus::where('code_ref', 'opportunity_created')->delete();

        if (Schema::hasColumn('housing_file_specification_statuses', 'code_ref'))
        {
            Schema::table('housing_file_specification_statuses', function (Blueprint $table)
            {
                $table->dropColumn('code_ref');
            });
        }
        if (Schema::hasColumn('housing_file_specification_statuses', 'order'))
        {
            Schema::table('housing_file_specification_statuses', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
    }
}
