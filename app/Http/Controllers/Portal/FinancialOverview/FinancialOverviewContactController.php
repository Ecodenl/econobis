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
        $allowedContactIds = $portalUser->contact->occupations->pluck('primary_contact_id')->toArray();
        $authorizedForContact = in_array($financialOverviewContact->contact_id, $allowedContactIds);
        if ($portalUser->contact_id != $financialOverviewContact->contact_id && !$authorizedForContact) {
            abort(403, 'Verboden');
        }

        if ($financialOverviewContact->filename) {
            $filePath = Storage::disk('administrations')->getDriver()
                ->getAdapter()->applyPathPrefix($financialOverviewContact->filename);
            header('Access-Control-Expose-Headers: X-Filename');
            header('X-Filename:' . $financialOverviewContact->name);
        } else {
            $financialOverviewContactNumber = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->financialOverview->administration_id . '-' . $financialOverviewContact->contact->number;
            header('X-Filename:' . $financialOverviewContactNumber . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
            return FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact, true);
        }

        return response()->download($filePath, $financialOverviewContact->name);
    }

}