<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Spatie\Valuestore\Valuestore;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//            'portalActive',
//        'portal_active'
//            'portalName',
//        'portal_name'
//            'cooperativeName',
//        'cooperative_name'
//            'portalWebsite',
//        'portal_website'
//            'portalUrl',
//        'portal_url'
//            'responsibleUserId',
//        'responsible_user_id'
//            'contactResponsibleOwnerUserId',
//        'contact_responsible_owner_user_id'
//            'checkContactTaskResponsibleUserId',
//        'check_contact_task_responsible_user_id'
//            'checkContactTaskResponsibleTeamId',
//        'check_contact_task_responsible_team_id'
//            'emailTemplateNewAccountId',
//        'email_template_new_account_id'
//            'linkPrivacyPolicy',
//        'link_privacy_policy'
//            'showNewAtCooperativeLink',
//        'show_new_at_cooperative_link'
//            'newAtCooperativeLinkText',
//        'new_at_cooperative_link_text'
//            'pcrPowerKwhConsumptionPercentage',
//        'pcr_power_kwh'
//            'pcrGeneratingCapacityOneSolorPanel',
//        'pcr_generating_capacity_one_solor_panel'
//            'defaultContactGroupMemberId',
//        'default_contact_group_member_id'
//            'defaultContactGroupNoMemberId',
//        'default_contact_group_no_member_id'
//            'defaultAdministrationId',
//        'default_administration_id'


        Schema::create('portal_settings', function (Blueprint $table) {
            $table->id();

            $table->boolean('portal_active');
            $table->string('portal_name')->nullable();
            $table->string('cooperative_name')->nullable();
            $table->string('portal_website')->nullable();
            $table->string('portal_url')->nullable();
            $table->unsignedInteger('responsible_user_id')->nullable();
            $table->foreign('responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('contact_responsible_owner_user_id')->nullable();
            $table->foreign('contact_responsible_owner_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('check_contact_task_responsible_user_id')->nullable();
            $table->foreign('check_contact_task_responsible_user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('check_contact_task_responsible_team_id')->nullable();
            $table->foreign('check_contact_task_responsible_team_id')
                ->references('id')->on('teams')
                ->onDelete('restrict');
            $table->unsignedInteger('email_template_new_account_id')->nullable();
            $table->foreign('email_template_new_account_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->string('link_privacy_policy')->nullable();
            $table->boolean('show_new_at_cooperative_link')->nullable();
            $table->string('new_at_cooperative_link_text')->nullable();

            $table->double('pcr_power_kwh')->nullable();
            $table->double('pcr_generating_capacity_one_solor_panel')->nullable();

            $table->unsignedInteger('default_contact_group_member_id')->nullable();
            $table->foreign('default_contact_group_member_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->unsignedInteger('default_contact_group_no_member_id')->nullable();
            $table->foreign('default_contact_group_no_member_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->unsignedInteger('default_administration_id')->nullable();
            $table->foreign('default_administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->timestamps();
        });

        $hasPortalSettings = !empty($this->get('portalActive')) ? true : false;

        if ($hasPortalSettings) {

            $portalActive = $this->get('portalActive') === 'true' || $this->get('portalActive') === '1'
                || $this->get('portalActive') === true || $this->get('portalActive') === 1;
            $showNewAtCooperativeLink = $this->get('showNewAtCooperativeLink') === 'true' || $this->get('showNewAtCooperativeLink') === '1'
                || $this->get('showNewAtCooperativeLink') === true || $this->get('showNewAtCooperativeLink') === 1;
            DB::table('portal_settings')->insert([
                [
                    'portal_active' => $portalActive,
                    'portal_name' => !empty($this->get('portalName')) ? $this->get('portalName') : null,
                    'cooperative_name' => !empty($this->get('cooperativeName')) ? $this->get('portalWebsite') : null,
                    'portal_website' => !empty($this->get('portalWebsite')) ? $this->get('portalWebsite') : null,
                    'portal_url' => !empty($this->get('portalUrl')) ? $this->get('portalUrl') : null,
                    'responsible_user_id' => !empty($this->get('responsibleUserId')) ? $this->get('responsibleUserId') : null,
                    'contact_responsible_owner_user_id' => !empty($this->get('contactResponsibleOwnerUserId')) ? $this->get('contactResponsibleOwnerUserId') : null,
                    'check_contact_task_responsible_user_id' => !empty($this->get('checkContactTaskResponsibleUserId')) ? $this->get('checkContactTaskResponsibleUserId') : null,
                    'check_contact_task_responsible_team_id' => !empty($this->get('checkContactTaskResponsibleTeamId')) ? $this->get('checkContactTaskResponsibleTeamId') : null,
                    'email_template_new_account_id' => !empty($this->get('emailTemplateNewAccountId')) ? $this->get('emailTemplateNewAccountId') : null,
                    'link_privacy_policy' => !empty($this->get('linkPrivacyPolicy')) ? $this->get('linkPrivacyPolicy') : null,
                    'show_new_at_cooperative_link' => $showNewAtCooperativeLink,
                    'new_at_cooperative_link_text' => !empty($this->get('newAtCooperativeLinkText')) ? $this->get('newAtCooperativeLinkText') : null,
                    'pcr_power_kwh' => !empty($this->get('pcrPowerKwhConsumptionPercentage')) ? $this->get('pcrPowerKwhConsumptionPercentage') : null,
                    'pcr_generating_capacity_one_solor_panel' => !empty($this->get('pcrGeneratingCapacityOneSolorPanel')) ? $this->get('pcrGeneratingCapacityOneSolorPanel') : null,
                    'default_contact_group_member_id' => !empty($this->get('defaultContactGroupMemberId')) ? $this->get('defaultContactGroupMemberId') : null,
                    'default_contact_group_no_member_id' => !empty($this->get('defaultContactGroupNoMemberId')) ? $this->get('defaultContactGroupNoMemberId') : null,
                    'default_administration_id' => !empty($this->get('defaultAdministrationId')) ? $this->get('defaultAdministrationId') : null,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
            ]);
        } else {
            DB::table('portal_settings')->insert([
                ['portal_active' => false],
            ]);
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portal_settings');
    }

    public static function make()
    {
        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        return Valuestore::make($filePath);
    }

    public static function get(string $name)
    {
        return static::make()->get($name);
    }


};
