<?php


namespace App\Http\Controllers\Api\PortalSettings;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Http\Controllers\Controller;
use App\Jobs\Portal\GeneratePortalCss;
use Config;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Valuestore\Valuestore;

class PortalSettingController extends Controller
{

    public function get(Request $request)
    {
        $key = $request->input('key');

        if(!$this->isWhiteListed($key)){
            return [];
        }

        return [
            $key => $this->getStore()->get($key)
        ];
    }

    public function multiple(Request $request)
    {
//todo WM: Hiervoor moet nog een aparte permission view_portal_settings komen
// en in PortalSettingsLayoutPolicy moeten we dan wellicht ook nog rekening houden met verschil
// User en PortalUser ?!
//        $this->authorize('view', PortalSettingsLayout::class);

        $store = $this->getStore();
        $keys = $this->getWhitelistedKeys($request);

        $response = [];

        foreach ($keys as $key){
            $response[$key] = $store->get($key);
        }

        return $response;
    }

    public function store(Request $request)
    {
        $this->authorize('manage', PortalSettingsLayout::class);

        $store = $this->getStore();
        if(empty($store->get('portalUrl'))){
            if(empty($request['defaultContactGroupMemberId'])){
                $contactGroupMember = new ContactGroup();
                $contactGroupMember->type_id = 'static';
                $contactGroupMember->composed_of = 'contacts';
                $contactGroupMember->name =  'Wil lid worden op basis van inschrijving.';
                $contactGroupMember->description = '';
                $contactGroupMember->dynamic_filter_type = 'and';
                $contactGroupMember->save();
                $request['defaultContactGroupMemberId'] = $contactGroupMember->id;
            }
            if(empty($request['defaultContactGroupNoMemberId'])){
                $contactGroupNoMember = new ContactGroup();
                $contactGroupNoMember->type_id = 'static';
                $contactGroupNoMember->composed_of = 'contacts';
                $contactGroupNoMember->name =  'Wil geen lid worden op basis van inschrijving en betaald.';
                $contactGroupNoMember->description = '';
                $contactGroupNoMember->dynamic_filter_type = 'and';
                $contactGroupNoMember->save();
                $request['defaultContactGroupNoMemberId'] = $contactGroupNoMember->id;
            }
        }

        $keyValues = $this->getWhitelistedKeyValues($request);

        $store->put($keyValues);

        return $store->all();
    }

    protected function getWhitelistedKeyValues(Request $request): array
    {
        $keyValues = [];
        foreach ($request->all() as $key => $value) {
            if ($this->isWhiteListed($key)) {
                $keyValues[$key] = $value;
            }
        }

        return $keyValues;
    }

    protected function getWhitelistedKeys(Request $request): array
    {
        $keys = [];
        foreach ($request->input('keys', []) as $key) {
            if ($this->isWhiteListed($key)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    protected function isWhiteListed($key): bool
    {
        return in_array($key, [
            'portalActive',
            'portalName',
            'cooperativeName',
            'portalWebsite',
            'portalUrl',
            'responsibleUserId',
            'contactResponsibleOwnerUserId',
            'checkContactTaskResponsibleUserId',
            'checkContactTaskResponsibleTeamId',
            'emailTemplateNewAccountId',
            'linkPrivacyPolicy',
            'showNewAtCooperativeLink',
            'newAtCooperativeLinkText',
            'pcrPowerKwhConsumptionPercentage',
            'pcrGeneratingCapacityOneSolorPanel',
            'defaultContactGroupMemberId',
            'defaultContactGroupNoMemberId',
            'defaultAdministrationId',
        ]);
    }

    protected function getStore(): Valuestore
    {
        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        return Valuestore::make($filePath);
    }
}