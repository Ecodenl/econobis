<?php
// todo WM portalsettings: hier aanpassen!


namespace App\Http\Controllers\Api\PortalSettings;


use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Controller;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use JosKolenberg\LaravelJory\Facades\Jory;

class PortalSettingController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettings::class);
    }

    public function store(Request $request)
    {
        Log::info('Hier store PortalSettings');
        $this->authorize('manage', PortalSettings::class);

//        $store = $this->getStore();
//        if(empty($store->get('portalUrl'))){
//            if(empty($request['defaultContactGroupMemberId'])){
//                $contactGroupMember = new ContactGroup();
//                $contactGroupMember->type_id = 'static';
//                $contactGroupMember->composed_of = 'contacts';
//                $contactGroupMember->name =  'Wil lid worden op basis van inschrijving.';
//                $contactGroupMember->description = '';
//                $contactGroupMember->dynamic_filter_type = 'and';
//                $contactGroupMember->save();
//                $request['defaultContactGroupMemberId'] = $contactGroupMember->id;
//            }
//            if(empty($request['defaultContactGroupNoMemberId'])){
//                $contactGroupNoMember = new ContactGroup();
//                $contactGroupNoMember->type_id = 'static';
//                $contactGroupNoMember->composed_of = 'contacts';
//                $contactGroupNoMember->name =  'Wil geen lid worden op basis van inschrijving en betaald.';
//                $contactGroupNoMember->description = '';
//                $contactGroupNoMember->dynamic_filter_type = 'and';
//                $contactGroupNoMember->save();
//                $request['defaultContactGroupNoMemberId'] = $contactGroupNoMember->id;
//            }
//        }
    }
    public function update(Request $request)
    {
        Log::info('Hier update PortalSettings');
        $this->authorize('manage', PortalSettings::class);
    }

}