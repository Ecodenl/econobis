<?php

namespace App\Helpers\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\Project\Project;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewController;
use App\Http\Resources\Project\GridProject;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewHelper
{
    public static function getNewProjectsForFinancialOverviewGrid(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
        $projects = $projectsQuery->get();

        $projects->load([
            'projectType',
        ]);

        return GridProject::collection($projects)
            ->additional(['meta' => [
                'total' => $projectsQuery->count(),
            ]
            ]);
    }

    public static function getNewProjectsForFinancialOverview(FinancialOverview $financialOverview)
    {
        $projectsQuery = self::getNewProjectsForFinancialOverviewQuery($financialOverview);
        return $projectsQuery->get();
    }

    /**
     * @param FinancialOverview $financialOverview
     * @return mixed
     */
    protected static function getNewProjectsForFinancialOverviewQuery(FinancialOverview $financialOverview)
    {
        $projectsQuery = Project::where('administration_id', $financialOverview->administration_id)
            ->whereDoesntHave('financialOverviewProjects', function ($query1) use ($financialOverview) {
                $query1->whereHas('financialOverview', function ($query2) use ($financialOverview) {
                    $query2->where('administration_id', $financialOverview->administration_id)
                        ->where('year', $financialOverview->year);
                });
            });
        return $projectsQuery;
    }

    public static function createFinancialOverviewContactDocument(FinancialOverview $financialOverview, Contact $contact, $preview = false)
    {
        $img = '';
        if ($financialOverview->administration->logo_filename) {
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR . $financialOverview->administration->logo_filename);
            $logo = file_get_contents($path);

            $src = 'data:' . mime_content_type($path)
                . ';charset=binary;base64,' . base64_encode($logo);
            $src = str_replace(" ", "", $src);
            $img = '<img src="' . $src . '" width="auto" height="156px"/>';
        }

        self::checkStorageDir($financialOverview->administration->id);

        $financialOverviewController = new FinancialOverviewController();
        $financialOverviewContact = $financialOverviewController->getFinancialOverviewContact($financialOverview, $contact);
        $contactName = null;

        if ($contact->type_id == 'person') {
            $prefix = $contact->person->last_name_prefix;
            $contactName = $prefix ? $contact->person->first_name . ' ' . $prefix . ' ' . $contact->person->last_name : $contact->person->first_name . ' ' . $contact->person->last_name;
        } elseif ($contact->type_id == 'organisation') {
            $contactName = $contact->full_name;
        }
        $contactPerson = $contactName;
        // indien preview, dan zijn we nu klaar om PDF te tonen
        if ($preview) {
            $pdf = PDF::loadView('financial.overview.generic', [
                'financialOverview' => $financialOverview,
                'financialOverviewContactTotalProjects' => $financialOverviewContact['financialOverviewContactTotalProjects'],
                'financialOverviewContactLoanProjects' => $financialOverviewContact['financialOverviewContactLoanProjects'],
                'financialOverviewContactObligationProjects' => $financialOverviewContact['financialOverviewContactObligationProjects'],
                'financialOverviewContactCapitalProjects' => $financialOverviewContact['financialOverviewContactCapitalProjects'],
                'financialOverviewContactPcrProjects' => $financialOverviewContact['financialOverviewContactPcrProjects'],
                'contact' => $contact,
                'contactPerson' => $contactPerson,
                'contactName' => $contactName,
                'logo' => $img,
            ]);
            return $pdf->output();
        }

//        // indien geen preview, dan gaan nu definitief notanummer bepalen
//        $currentYear = Carbon::now()->year;
//
//        // Haal new notanummer op (voor dit jaar en administratie)
//        $newInvoiceNumber = InvoiceHelper::newInvoiceNumber($currentYear, $invoice->administration_id);
//
//        if(Invoice::where('administration_id', $invoice->administration_id)->where('invoice_number', '=', $newInvoiceNumber)->whereYear('created_at', '=', $currentYear)->exists())
//        {
//            Log::error("Voor nota met ID " . $invoice->id . " kon geen nieuw notanummer bepaald worden.");
//            self::invoicePdfIsNotCreated($invoice);
//            return false;
//        }else{
//            $invoice->invoice_number = $newInvoiceNumber;
//            $invoice->number = 'F' . $currentYear . '-' . $newInvoiceNumber;
//            $invoice->save();
//        }
//
//        // nu we nieuw notanummer hebben kunnen we PDF maken
//        $pdf = PDF::loadView('invoices.generic', [
//            'invoice' => $invoice,
//            'contactPerson' => $contactPerson,
//            'contactName' => $contactName,
//            'logo' => $img,
//        ]);
//
//        $name = $invoice->number . '.pdf';
//
//        $path = 'administration_' . $invoice->administration->id
//            . DIRECTORY_SEPARATOR . 'invoices' . DIRECTORY_SEPARATOR . $name;
//
//        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'administrations' . DIRECTORY_SEPARATOR) . $path);
//
//        $pdf->save($filePath);
//
//        $invoiceDocument = new InvoiceDocument();
//        $invoiceDocument->invoice_id = $invoice->id;
//        $invoiceDocument->filename = $path;
//        $invoiceDocument->name = $name;
//        $invoiceDocument->save();
//
//        self::invoicePdfIsCreated($invoice);

        return true;
    }

    public static function checkStorageDir($administration_id)
    {
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $administration_id . DIRECTORY_SEPARATOR . 'financial-overviews';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }


}