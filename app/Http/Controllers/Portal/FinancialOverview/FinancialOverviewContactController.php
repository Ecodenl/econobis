<?php

namespace App\Http\Controllers\Portal\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewContactController extends Controller
{
    public function download(FinancialOverviewContact $financialOverviewContact)
    {
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