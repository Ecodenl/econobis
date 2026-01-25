<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
//use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /**
         * 1) Optioneel: dedupe FOC (financial_overview_id + contact_id)
         *    Houdt de laagste id en verwijdert de rest.
         */
//        DB::statement("
//            DELETE foc1 FROM financial_overview_contacts foc1
//            INNER JOIN financial_overview_contacts foc2
//              ON foc1.financial_overview_id = foc2.financial_overview_id
//             AND foc1.contact_id = foc2.contact_id
//             AND foc1.id > foc2.id
//        ");

        /**
         * 2) Optioneel: dedupe FOPP (financial_overview_project_id + participant_project_id)
         */
//        DB::statement("
//            DELETE fopp1 FROM financial_overview_participant_projects fopp1
//            INNER JOIN financial_overview_participant_projects fopp2
//              ON fopp1.financial_overview_project_id = fopp2.financial_overview_project_id
//             AND fopp1.participant_project_id = fopp2.participant_project_id
//             AND fopp1.id > fopp2.id
//        ");

        /**
         * 3) Voeg uniques toe (alleen als ze nog niet bestaan).
         *    Laravel heeft geen built-in 'if not exists' voor indexes,
         *    dus gewoon toevoegen; als je risico op "already exists" hebt,
         *    dan eerst handmatig checken in DB of gebruik try/catch.
         */
        Schema::table('financial_overview_contacts', function (Blueprint $table) {
            $table->unique(
                ['financial_overview_id', 'contact_id'],
                'foc_unique_overview_contact'
            );
        });

        Schema::table('financial_overview_participant_projects', function (Blueprint $table) {
            $table->unique(
                ['financial_overview_project_id', 'participant_project_id'],
                'fopp_unique_overviewproject_participantproject'
            );
        });
    }

    public function down(): void
    {
        Schema::table('financial_overview_contacts', function (Blueprint $table) {
            $table->dropUnique('foc_unique_overview_contact');
        });

        Schema::table('financial_overview_participant_projects', function (Blueprint $table) {
            $table->dropUnique('fopp_unique_overviewproject_participantproject');
        });
    }
};
