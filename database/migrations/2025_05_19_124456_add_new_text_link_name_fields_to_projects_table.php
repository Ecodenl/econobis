<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('projects', function (Blueprint $table) {
            $table->string('text_register_page_header')->default('')->after('document_template_agreement_id');
            $table->string('text_register_current_book_worth')->default('')->after('text_register_page_header');
            $table->string('text_register_participation_singular')->default('')->after('text_register_current_book_worth');
            $table->string('text_register_participation_plural')->default('')->after('text_register_participation_singular');
            $table->string('text_link_name_agree_terms')->default('')->after('text_link_agree_terms');
            $table->string('text_link_name_understand_info')->default('')->after('text_link_understand_info');
        });

        $defaultTextRegisterPageHeader = 'Inschrijven project';
        $defaultTextLinkNameAgreeTerms = 'voorwaarden';
        $defaultTextLinkNameUnderstandInfo = 'project informatie';

        $projects = \App\Eco\Project\Project::all();
        foreach ($projects as $project){
            $project->text_register_page_header = $defaultTextRegisterPageHeader;
            $project->text_link_name_agree_terms = $defaultTextLinkNameAgreeTerms;
            $project->text_link_name_understand_info = $defaultTextLinkNameUnderstandInfo;

            $projectTypeCodeRef = $project->projectType->code_ref;
            switch ($projectTypeCodeRef) {
                case 'obligation':
                    $defaultTextRegisterCurrentBookWorth = 'Huidige hoofdsom';
                    $defaultTextRegisterParticipationSingular = 'obligatie';
                    $defaultTextRegisterParticipationPlural = 'obligaties';
                    break;
                case 'capital':
                    $defaultTextRegisterCurrentBookWorth = 'Huidige boekwaarde';
                    $defaultTextRegisterParticipationSingular = 'participatie';
                    $defaultTextRegisterParticipationPlural = 'participaties';
                    break;
                case 'postalcode_link_capital':
                    $defaultTextRegisterCurrentBookWorth = 'Huidige boekwaarde';
                    $defaultTextRegisterParticipationSingular = 'participatie';
                    $defaultTextRegisterParticipationPlural = 'participaties';
                    break;
                default:
                    $defaultTextRegisterCurrentBookWorth = '';
                    $defaultTextRegisterParticipationSingular = '';
                    $defaultTextRegisterParticipationPlural = '';
                    break;
            }

            $project->text_register_current_book_worth = $defaultTextRegisterCurrentBookWorth;
            $project->text_register_participation_singular = $defaultTextRegisterParticipationSingular;
            $project->text_register_participation_plural = $defaultTextRegisterParticipationPlural;

            $project->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('text_register_page_header');
            $table->dropColumn('text_register_current_book_worth');
            $table->dropColumn('text_register_participation_singular');
            $table->dropColumn('text_register_participation_plural');
            $table->dropColumn('text_link_name_agree_terms');
            $table->dropColumn('text_link_name_understand_info');
        });
    }
};
