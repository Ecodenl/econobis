<?php
// todo WM portalsettings: hier aanpassen!


namespace App\Http\Controllers\Api\PortalSettings;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\PortalSettings\PortalSettings;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortalSettings\FullPortalSettings;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use JosKolenberg\LaravelJory\Facades\Jory;

class PortalSettingsController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettings::class);
    }

    // Nog niet nodig. Per cooperatie is er altijd 1 record die bij installatie al wordt aangemaakt
    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettings::class);
    }

    public function update(PortalSettings $portalSettings, RequestInput $input, Request $request)
    {

        $this->authorize('manage', PortalSettings::class);

        // Alleen bij eerste aanmaak (portal_url is nog leeg) en als groepen niet opgegeven zijn,
        // worden er automatisch contactgroepen aangemaakt
        if( $portalSettings && empty($portalSettings->portal_url) )
        {
            if(empty($request->get('defaultContactGroupMemberId'))){
                $contactGroupMember = new ContactGroup();
                $contactGroupMember->type_id = 'static';
                $contactGroupMember->composed_of = 'contacts';
                $contactGroupMember->name =  'Wil lid worden op basis van inschrijving.';
                $contactGroupMember->description = '';
                $contactGroupMember->dynamic_filter_type = 'and';
                $contactGroupMember->save();
                $defaultContactGroupMemberId = $contactGroupMember->id;
            }
            if(empty($request->get('defaultContactGroupNoMemberId'))){
                $contactGroupNoMember = new ContactGroup();
                $contactGroupNoMember->type_id = 'static';
                $contactGroupNoMember->composed_of = 'contacts';
                $contactGroupNoMember->name =  'Wil geen lid worden op basis van inschrijving en betaald.';
                $contactGroupNoMember->description = '';
                $contactGroupNoMember->dynamic_filter_type = 'and';
                $contactGroupNoMember->save();
                $defaultContactGroupNoMemberId = $contactGroupNoMember->id;
            }
        }

        $data = $input->boolean('portalActive')->whenMissing(false)->onEmpty(false)->alias('portal_active')->next()
            ->string('portalName')->onEmpty(null)->alias('portal_name')->next()
            ->string('cooperativeName')->onEmpty(null)->alias('cooperative_name')->next()
            ->string('portalWebsite')->onEmpty(null)->alias('portal_website')->next()
            ->string('portalUrl')->onEmpty(null)->alias('portal_url')->next()
            ->integer('responsibleUserId')->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('contactResponsibleOwnerUserId')->onEmpty(null)->alias('contact_responsible_owner_user_id')->next()
            ->integer('checkContactTaskResponsibleUserId')->onEmpty(null)->alias('check_contact_task_responsible_user_id')->next()
            ->integer('checkContactTaskResponsibleTeamId')->onEmpty(null)->alias('check_contact_task_responsible_team_id')->next()
            ->integer('emailTemplateNewAccountId')->onEmpty(null)->alias('email_template_new_account_id')->next()
            ->string('linkPrivacyPolicy')->onEmpty(null)->alias('link_privacy_policy')->next()
            ->boolean('showNewAtCooperativeLink')->onEmpty(false)->alias('show_new_at_cooperative_link')->next()
            ->string('newAtCooperativeLinkText')->onEmpty(null)->alias('new_at_cooperative_link_text')->next()
            ->double('pcrPowerKwhConsumptionPercentage')->onEmpty(null)->alias('pcr_power_kwh_consumption_percentage')->next()
            ->double('pcrGeneratingCapacityOneSolorPanel')->onEmpty(null)->alias('pcr_generating_capacity_one_solor_panel')->next()
            // Gebruik meegegeven ID, of fallback naar automatisch aangemaakte groep bij eerste keer (als portal_url nog leeg was)
            ->integer('defaultContactGroupMemberId')->whenMissing($defaultContactGroupMemberId ?? null)->onEmpty($defaultContactGroupMemberId ?? null)->alias('default_contact_group_member_id')->next()
            // Gebruik meegegeven ID, of fallback naar automatisch aangemaakte groep bij eerste keer (als portal_url nog leeg was)
            ->integer('defaultContactGroupNoMemberId')->whenMissing($defaultContactGroupNoMemberId ?? null)->onEmpty($defaultContactGroupNoMemberId ?? null)->alias('default_contact_group_no_member_id')->next()
            ->integer('defaultAdministrationId')->onEmpty(null)->alias('default_administration_id')->next()
            ->get();

        $portalSettings->fill($data);
        $portalSettings->save();

        return FullPortalSettings::make($portalSettings);

    }

}