<?php

namespace App\Http\Controllers\Portal\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewContactController extends Controller
{
    public function download(FinancialOverviewContact $financialOverviewContact)
    {
        $portalUser = Auth::user();
        if (!Auth::isPortalUser() || !$portalUser->contact) {
            abort(501, 'Er is helaas een fout opgetreden.');
        }
        $allowedContactOrganisationIds = $portalUser->contact->occupations->where('type_id', 'organisation')->where('primary', true)->pluck('primary_contact_id')->toArray();
        $allowedContactPersonIds = $portalUser->contact->occupations->where('type_id', 'person')->where('occupation_for_portal', true)->pluck('primary_contact_id')->toArray();
        $allowedContactIds = array_merge($allowedContactOrganisationIds, $allowedContactPersonIds);

        $authorizedForContact = in_array($financialOverviewContact->contact_id, $allowedContactIds);
        if ($portalUser->contact_id != $financialOverviewContact->contact_id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

        if ($financialOverviewContact->filename) {
            $filePath = Storage::disk('administrations')
                ->path($financialOverviewContact->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            header('X-Filename:' . $financialOverviewContact->name);
        } else {
            if($financialOverviewContact->financialOverview->administration->administration_code){
                $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration->administration_code . '-' . $financialOverviewContact->contact->number;
            } else {
                $financialOverviewContactReference = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->contact->number . '-' . $financialOverviewContact->financialOverview->id;
            }
            header('X-Filename:' . $financialOverviewContactReference . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
            return FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact, true);
        }

        return response()->download($filePath, $financialOverviewContact->name);
    }

}