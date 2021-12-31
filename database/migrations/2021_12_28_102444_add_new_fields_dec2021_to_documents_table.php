<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsDec2021ToDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            Schema::table('documents', function (Blueprint $table) {
                $table->string('document_created_from')->nullable()->after('sent_by_id');
            });
        });

        $documents = \App\Eco\Document\Document::withTrashed()->get();
        foreach ($documents as $document){
            $documentCreatedFrom = '';
            if ($document->participation_project_id != null
                && $document->project_id != null
                && $document->contact_id != null
                && $document->intake_id == null
                && $document->campaign_id == null
                && $document->order_id == null
                && $document->contact_group_id == null
            ) {
                $documentCreatedFrom = 'participant';
            } else if ($document->project_id !== null
                && $document->participation_project_id == null
                && $document->contact_id == null
                && $document->intake_id == null
                && $document->campaign_id == null
                && $document->order_id == null
                && $document->contact_group_id == null
                && $document->document_group != 'revenue'
            ) {
                $documentCreatedFrom = 'project';
//            } else if ($document->intake_id) {
//                $documentCreatedFrom = 'intake';
//            } else if ($document->campaign_id) {
//                $documentCreatedFrom = 'campagne';
//            } else if ($document->order_id) {
//                $documentCreatedFrom = 'order';
//            } else if ($document->contact_group_id) {
//                $documentCreatedFrom = 'contactgroup';
//            } else if ($document->contact_id) {
//                $documentCreatedFrom = 'contact';
            } else {
                $documentCreatedFrom = 'document';
            }
            $document->document_created_from = $documentCreatedFrom;
            $document->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('documents', 'document_created_from')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropColumn('document_created_from');
            });
        }
    }
}
