<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropIndex('idx_emails_advanced');
        });
        Schema::table('emails', function (Blueprint $table) {
            $table->string('subject_for_filter', 150)->default('')->after('subject');
        });

        // Update de nieuwe kolom met de eerste 150 tekens van 'subject'
        // Batchverwerking
        $batchSize = 500; // Pas dit aan op basis van je servercapaciteit
        $lastId = 0;
        $totalRecordsAffected = 0;

        echo "Batch bijwerken vanaf ID: $lastId\n";

        do {
            $affectedRows = DB::table('emails')
                ->where('id', '>', $lastId)
                ->orderBy('id') // Zorg voor consistente verwerking
                ->limit($batchSize)
                ->update([
                    'subject_for_filter' => DB::raw('LEFT(subject, 150)')
                ]);

            // Bepaal de hoogste ID uit de geüpdatete batch
            $lastId = DB::table('emails')
                ->where('id', '>', $lastId)
                ->orderBy('id')
                ->limit($batchSize)
                ->pluck('id')
                ->last();

            if($lastId){
//                echo "Bijgewerkte records: $affectedRows. Batch verder bijwerken vanaf ID $lastId\n";
            } else {
//                echo "Bijgewerkte records: $affectedRows. Laatste record bereikt\n";
            }
            $totalRecordsAffected += $affectedRows;

        } while ($affectedRows > 0 && $lastId);

        Log::info("Totaal bijgewerkte email records: $totalRecordsAffected");

        Schema::table('emails', function (Blueprint $table) {
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'date_sent', 'from', 'status', 'subject_for_filter', 'responsible_user_id', 'responsible_team_id'], 'idx_emails_advanced');
        });

        DB::statement('ANALYZE TABLE emails');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('emails', function (Blueprint $table) {
            $table->dropIndex('idx_emails_advanced');
        });

        // Verwijder de nieuwe kolom
        Schema::table('emails', function (Blueprint $table) {
            $table->dropColumn('subject_for_filter');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->index(['folder', 'mailbox_id', 'deleted_at', 'from', \DB::raw('subject(191)'), 'status', 'date_sent'], 'idx_emails_advanced');
        });

        DB::statement('ANALYZE TABLE emails');
    }
};
