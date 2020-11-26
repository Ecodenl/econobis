<?php

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Valuestore\Valuestore;

class AddPortalActiveAndDefaultGroupsToPortalSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $cooperativeName = PortalSettings::get('cooperativeName');
        $portalActive = !empty($cooperativeName) ? true : false;

        $portalSettings = Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        $portalSettings->put('portalActive', $portalActive);

        if($portalActive){
            $user = User::where('email', 'support@econobis.nl')->first();

            $contactGroupMember = new ContactGroup();
            $contactGroupMember->type_id = 'static';
            $contactGroupMember->composed_of = 'contacts';
            $contactGroupMember->name =  'Wil lid worden op basis van inschrijving.';
            $contactGroupMember->description = '';
            $contactGroupMember->dynamic_filter_type = 'and';
            $contactGroupMember->created_by_id = $user ? $user->id : 1;
            $contactGroupMember->save();
            $portalSettings->put('defaultContactGroupMemberId', $contactGroupMember->id);

            $contactGroupNoMember = new ContactGroup();
            $contactGroupNoMember->type_id = 'static';
            $contactGroupNoMember->composed_of = 'contacts';
            $contactGroupNoMember->name =  'Wil geen lid worden op basis van inschrijving en betaald.';
            $contactGroupNoMember->description = '';
            $contactGroupNoMember->dynamic_filter_type = 'and';
            $contactGroupNoMember->created_by_id = $user ? $user->id : 1;
            $contactGroupNoMember->save();
            $portalSettings->put('defaultContactGroupNoMemberId', $contactGroupNoMember->id);

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
