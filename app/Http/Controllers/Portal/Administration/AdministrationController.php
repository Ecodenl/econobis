<?php


namespace App\Http\Controllers\Portal\Administration;


use App\Eco\Administration\Administration;
use App\Eco\Document\Document;
use App\Eco\User\User;
use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Api\Document\DocumentController;
use App\Http\Controllers\Controller;
use Config;
use DB;
use Illuminate\Support\Facades\Auth;

class AdministrationController extends Controller
{
    public function documentDownload(Administration $administration, Document $document)
    {
        $portalUser = Auth::user();
//        todo WM: checken of dit hier moeten doen?
//        if (!Auth::isPortalUser() || !$portalUser->contact) {
//            abort(501, 'Er is helaas een fout opgetreden.');
//        }
//        $allowedContactOrganisationIds = $portalUser->contact->occupations->where('type_id', 'organisation')->where('primary', true)->pluck('primary_contact_id')->toArray();
//        $allowedContactPersonIds = $portalUser->contact->occupations->where('type_id', 'person')->where('occupation_for_portal', true)->pluck('primary_contact_id')->toArray();
//        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);
//
//        $authorizedForContact = in_array($participantProject->contact_id, $allowedContactIds);
//        if ($portalUser->contact_id != $participantProject->contact_id && !$authorizedForContact) {
//            abort(403, 'Verboden');
//        }

        if ($document->filename) {
            // todo wellicht moeten we hier nog wat op anders verzinnen, voornu gebruiken we responisibleUserId from settings.json, verderop zetten we dat weer terug naar portal user
            $responsibleUserId = PortalSettings::get('responsibleUserId');
            if (!$responsibleUserId) {
                abort(501, 'Er is helaas een fout opgetreden (5).');
            }
            Auth::setUser(User::find($responsibleUserId));

            $documentController = new DocumentController();
            return $documentController->download($document);

            // Voor zekerheid hierna weer even Auth user herstellen met portal user
            Auth::setUser($portalUser);
        }
    }

}