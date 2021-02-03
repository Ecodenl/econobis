<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPortalTextFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('text_agree_terms', 2500)->default('');
            $table->string('text_link_agree_terms')->default('');
            $table->string('text_link_understand_info')->default('');
            $table->string('text_accept_agreement', 2500)->default('');
            $table->string('text_accept_agreement_question')->default('');
        });

        $defaultTextAgreeTerms =
        'Om deel te kunnen nemen dien je akkoord te gaan met de voorwaarden en dien je te bevestigen dat je de project informatie hebt gelezen en begrepen.';
        $defaultTextLinkAgreeTerms = 'Ik ga akkoord met de {voorwaarden_link}';
        $defaultTextLinkUnderstandInfo =
        'Ik heb de {project_informatie_link} (inclusief de daarin beschreven risico’s) behorende bij het project gelezen en begrepen';
        $defaultTextAcceptAgreement =
        'Wanneer je akkoord gaat met het inschrijfformulier en in de inschrijving bevestigd, is je inschrijving definitief';
        $defaultTextAcceptAgreementQuestion = 'Ik ben akkoord met deze inschrijving';

        $projects = \App\Eco\Project\Project::all();

        foreach ($projects as $project){
            $project->text_agree_terms = $defaultTextAgreeTerms;
            $project->text_link_agree_terms = $defaultTextLinkAgreeTerms;
            $project->text_link_understand_info = $defaultTextLinkUnderstandInfo;
            $project->text_accept_agreement = $defaultTextAcceptAgreement;
            $project->text_accept_agreement_question = $defaultTextAcceptAgreementQuestion;
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
            $table->dropColumn('text_agree_terms');
            $table->dropColumn('text_link_agree_terms');
            $table->dropColumn('text_link_understand_info');
            $table->dropColumn('text_accept_agreement');
            $table->dropColumn('text_accept_agreement_question');
        });
    }
}
