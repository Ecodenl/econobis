<?php


namespace App\Http\Controllers\Portal\PortalFreeFieldsPage;


use App\Eco\Contact\Contact;
use App\Eco\PortalFreeFields\PortalFreeFieldsPage;
use App\Http\Controllers\Controller;
use App\Http\Resources\Portal\PortalFreeFieldsPage\PortalFreeFieldsPageResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PortalFreeFieldsPageController extends Controller
{

    public function show(Contact $contact, $urlPageRef)
    {
        // ophalen contactgegevens portal user
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        $allowedContactOrganisationIds = $portalUser->contact->occupations->where('type_id', 'organisation')->where('primary', true)->pluck('primary_contact_id')->toArray();
        $allowedContactPersonIds = $portalUser->contact->occupations->where('type_id', 'person')->where('occupation_for_portal', true)->pluck('primary_contact_id')->toArray();
        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);

        $authorizedForContact = in_array($contact->id, $allowedContactIds);
        if ($portalUser->contact_id != $contact->id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

// todo WM: opschonen
//        Log::info('urlPageRef:');
//        Log::info($urlPageRef);

        $portalFreeFieldsPage = PortalFreeFieldsPage::where('url_page_ref', $urlPageRef)->first();

        if (!$portalFreeFieldsPage) {
            abort(403, 'Geen toegang tot deze pagina.');
        }

// todo WM: opschonen
//        Log::info('portalFreeFieldsPage:');
//        Log::info($portalFreeFieldsPage);

        return PortalFreeFieldsPageResource::make($portalFreeFieldsPage);
    }

}