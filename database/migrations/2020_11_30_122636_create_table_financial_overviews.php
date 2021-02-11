<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableFinancialOverviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('financial_overviews', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')->references('id')->on('administrations');
            $table->year('year');
            $table->boolean('definitive')->default(false);
            $table->string('status_id')->default('concept');
            $table->date('date_processed')->nullable();
            $table->timestamps();
        });

        Schema::create('financial_overview_projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_id');
            $table->foreign('financial_overview_id', 'fo_id_foreign')->references('id')->on('financial_overviews');
            $table->unsignedInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->boolean('definitive')->default(false);
            $table->string('status_id')->default('concept');
            $table->timestamps();

        });

        Schema::create('financial_overview_participant_projects', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_project_id');
            $table->foreign('financial_overview_project_id', 'fop_id_foreign')->references('id')->on('financial_overview_projects');
            $table->unsignedInteger('participant_project_id');
            $table->foreign('participant_project_id','pp_id_foreign')->references('id')->on('participation_project');
            $table->integer('quantity_start_value')->default(0);
            $table->integer('quantity_end_value')->default(0);
            $table->double('bookworth_start_value', 11, 2)->default(0);
            $table->double('bookworth_end_value', 11, 2)->default(0);
            $table->double('amount_start_value', 11, 2)->default(0);
            $table->double('amount_end_value', 11, 2)->default(0);
            $table->timestamps();

        });

        Schema::create('financial_overview_contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_id');
            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')->references('id')->on('contacts');
            $table->string('status_id')->default('concept');
            $table->string('filename')->nullable();;
            $table->string('name')->nullable();;
            $table->date('date_sent')->nullable();
            $table->string('emailed_to')->nullable();;
            $table->timestamps();
        });
        Schema::create('financial_overviews_to_send', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('financial_overview_contact_id');
            $table->foreign('financial_overview_contact_id','foc_id_foreign')->references('id')->on('financial_overview_contacts');
            $table->boolean('financial_overview_created')->default(false);
            $table->timestamps();
        });

        Schema::table('administrations', function (Blueprint $table) {
            $table->unsignedInteger('email_template_financial_overview_id')->nullable()->after('email_template_exhortation_id');
            $table->foreign('email_template_financial_overview_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
        });

        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->boolean('financial_overview_definitive')->default(false)->after('paid_on');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('participant_mutations', 'financial_overview_definitive'))
        {
            Schema::table('participant_mutations', function (Blueprint $table)
            {
                $table->dropColumn('financial_overview_definitive');
            });
        }
        if (Schema::hasColumn('administrations', 'email_template_financial_overview_id'))
        {
            Schema::table('administrations', function (Blueprint $table)
            {
                $table->dropForeign(['email_template_financial_overview_id']);
                $table->dropColumn('email_template_financial_overview_id');
            });
        }
        Schema::dropIfExists('financial_overviews_to_send');
        Schema::dropIfExists('financial_overview_contacts');
        Schema::dropIfExists('financial_overview_participant_projects');
        Schema::dropIfExists('financial_overview_projects');
        Schema::dropIfExists('financial_overviews');
    }
}
