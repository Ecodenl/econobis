<?php

use App\Eco\InspectionPersonType\InspectionPersonType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddInspectionTypeIdToContactsAndContactGroupsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('inspection_person_type_id', 16)->nullable()->default(null)->after('is_coach');
        });
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('inspection_person_type_id', 16)->nullable()->default(null)->after('is_coach_group');
        });

        $contactCoaches = DB::table('contacts')->where('is_coach', true)->get();
        foreach ($contactCoaches as $contactCoach) {
            DB::table('contacts')
                ->where('id',$contactCoach->id)
                ->update(['inspection_person_type_id' => 'coach']);
        }
        $contactGroupCoachGroups = DB::table('contact_groups')->where('is_coach_group', true)->get();
        foreach ($contactGroupCoachGroups as $contactGroupCoachGroup) {
            DB::table('contact_groups')
                ->where('id',$contactGroupCoachGroup->id)
                ->update(['inspection_person_type_id' => 'coach']);
        }

        Schema::table('contacts', function (Blueprint $table) {
            $table->renameColumn('is_coach', 'xxx_is_coach');
        });
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->renameColumn('is_coach_group', 'xxx_is_coach_group');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups', 'inspection_person_type_id'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('inspection_person_type_id');
                $table->renameColumn('xxx_is_coach_group', 'is_coach_group');
            });
        }
        if (Schema::hasColumn('contacts', 'inspection_person_type_id'))
        {
            Schema::table('contacts', function (Blueprint $table)
            {
                $table->dropColumn('inspection_person_type_id');
                $table->renameColumn('xxx_is_coach', 'is_coach');
            });
        }
    }
}
