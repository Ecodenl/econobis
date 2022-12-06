<?php

use App\Eco\Document\Document;
use App\Eco\Document\DocumentCreatedFrom;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamDocumentCreatedFromTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_created_froms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code_ref');
        });

        DB::table('document_created_froms')->insert([
                ['name' => 'Administratie', 'code_ref' => 'administration'],
                ['name' => 'Campagne', 'code_ref' => 'campaign'],
                ['name' => 'Contact', 'code_ref' => 'contact'],
                ['name' => 'Contactgroep', 'code_ref' => 'contactgroup'],
                ['name' => 'Deelnemer', 'code_ref' => 'participant'],
                ['name' => 'Document', 'code_ref' => 'document'],
                ['name' => 'E-mail bijlage', 'code_ref' => 'emailattachment'],
                ['name' => 'Intake', 'code_ref' => 'intake'],
                ['name' => 'Maatregel', 'code_ref' => 'measure'],
                ['name' => 'Kans', 'code_ref' => 'opportunity'],
                ['name' => 'Offerteverzoek', 'code_ref' => 'quotationrequest'],
                ['name' => 'Order', 'code_ref' => 'order'],
                ['name' => 'Project', 'code_ref' => 'project'],
                ['name' => 'Taak', 'code_ref' => 'task'],
                ['name' => 'Woningdossier', 'code_ref' => 'housingfile'],
            ]
        );

        Schema::create('team_document_created_from', function (Blueprint $table) {
            $table->integer('document_created_from_id')->unsigned();;
            $table->foreign('document_created_from_id')->references('id')->on('document_created_froms');
            $table->integer('team_id')->unsigned();
            $table->foreign('team_id')->references('id')->on('teams');
            $table->unique(['document_created_from_id','team_id'], 'team_document_created_from_unique');
            $table->timestamps();
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->unsignedInteger('document_created_from_id')->nullable()->after('document_created_from');
            $table->foreign('document_created_from_id')->references('id')->on('document_created_froms');
        });

        $documents = Document::withTrashed()->get();
        foreach ($documents as $document) {
            if($document->document_created_from == null){
                $document->document_created_from = 'document';
            }
            $document->document_created_from_id = DocumentCreatedFrom::where('code_ref', $document->document_created_from)->first()->id;
            $document->save();
        }

        Schema::table('documents', function (Blueprint $table) {
            $table->renameColumn('document_created_from', 'xxx_document_created_from');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_document_created_from');
        if (Schema::hasColumn('documents', 'document_created_from_id')) {
            Schema::table('documents', function (Blueprint $table) {
                $table->dropForeign(['document_created_from_id']);
                $table->dropColumn('document_created_from_id');
            });
        }
        Schema::table('documents', function (Blueprint $table) {
            $table->renameColumn('xxx_document_created_from', 'document_created_from');
        });
        Schema::dropIfExists('document_created_froms');
    }
}
