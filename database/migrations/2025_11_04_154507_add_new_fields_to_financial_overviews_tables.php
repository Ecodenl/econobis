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
     */
    public function up(): void
    {
        // Nieuw veld email_template_financial_overview_id in tabel financial_overviews
        Schema::table('financial_overviews', function (Blueprint $table) {
            $table->unsignedInteger('email_template_financial_overview_id')->nullable()->after('document_template_financial_overview_id');
            $table->foreign('email_template_financial_overview_id', 'financial_overviews_email_template_fo_id_foreign')->references('id')->on('email_templates')
                ->onDelete('restrict');
        });
        // Nieuwe velden document_template_financial_overview_id en email_template_financial_overview_id in tabel financial_overview_contacts
        Schema::table('financial_overview_contacts', function (Blueprint $table) {
            $table->unsignedInteger('document_template_financial_overview_id')->nullable()->after('emailed_to');
            $table->foreign('document_template_financial_overview_id', 'foc_document_template_fo_id_foreign')->references('id')->on('document_templates')
                ->onDelete('restrict');
            $table->unsignedInteger('email_template_financial_overview_id')->nullable()->after('document_template_financial_overview_id');
            $table->foreign('email_template_financial_overview_id', 'foc_email_template_fo_id_foreign')->references('id')->on('email_templates')
                ->onDelete('restrict');
        });

        // 1) kolommen toevoegen (voor nu nullable)
        Schema::table('financial_overview_participant_projects', function (Blueprint $table) {
            $table->unsignedInteger('contact_id')->nullable()->after('participant_project_id');
            $table->string('status_id')->default('concept')->after('contact_id');
        });

        // 2) bestaande records vullen
        DB::table('financial_overview_participant_projects')
            ->orderBy('id')
            ->chunk(500, function ($rows) {
                foreach ($rows as $row) {
                    // participant_project ophalen
                    $participantProject = DB::table('participation_project')
                        ->where('id', $row->participant_project_id)
                        ->whereNull('deleted_at')
                        ->first();

                    if (! $participantProject) {
                        // geen participant project: sla gewoon over
                        Log::error('Onbekende participant project: ' . $row->participant_project_id);
                        continue;
                    }

                    // bijpassende financial_overview_project zoeken
                    $fop = DB::table('financial_overview_projects')
                        ->where('id', $row->financial_overview_project_id)
                        ->first();

                    if (! $fop) {
                        // geen financial_overview_project: sla gewoon over
                        Log::error('Onbekende financial_overview_project: ' . $row->financial_overview_project_id);
                        continue;
                    }

                    // bijpassende financial_overview_contact zoeken
                    $foc = DB::table('financial_overview_contacts')
                        ->where('financial_overview_id', $fop->financial_overview_id)
                        ->where('contact_id', $participantProject->contact_id)
                        ->first();

                    // default values
                    $statusId = 'concept';
                    $contactId = $participantProject->contact_id;

                    if ($foc) {
                        $statusId = $foc->status_id;
                        $contactId = $foc->contact_id;
                    }

                    DB::table('financial_overview_participant_projects')
                        ->where('id', $row->id)
                        ->update([
                            'contact_id' => $contactId,
                            'status_id'  => $statusId,
                        ]);
                }
            });

        // 3) nu pas non-nullable + FK + index
        Schema::table('financial_overview_participant_projects', function (Blueprint $table) {
            // als je doctrine/dbal hebt:
            $table->unsignedInteger('contact_id')->nullable(false)->change();

            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts');

            $table->index(
                ['financial_overview_project_id', 'contact_id', 'status_id'],
                'fopp_project_contact_status_idx'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('financial_overview_participant_projects', function (Blueprint $table) {
            $table->dropForeign(['contact_id']);
            $table->dropIndex('fopp_project_contact_status_idx');
            $table->dropColumn('contact_id');
            $table->dropColumn('status_id');
        });

        if (Schema::hasColumn('financial_overview_contacts', 'email_template_financial_overview_id'))
        {
            Schema::table('financial_overview_contacts', function (Blueprint $table)
            {
                $table->dropForeign('foc_email_template_fo_id_foreign');
                $table->dropColumn('email_template_financial_overview_id');
            });
        }
        if (Schema::hasColumn('financial_overview_contacts', 'document_template_financial_overview_id'))
        {
            Schema::table('financial_overview_contacts', function (Blueprint $table)
            {
                $table->dropForeign('foc_document_template_fo_id_foreign');
                $table->dropColumn('document_template_financial_overview_id');
            });
        }
        if (Schema::hasColumn('financial_overviews', 'email_template_financial_overview_id'))
        {
            Schema::table('financial_overviews', function (Blueprint $table)
            {
                $table->dropForeign('financial_overviews_email_template_fo_id_foreign');
                $table->dropColumn('email_template_financial_overview_id');
            });
        }

    }
};
