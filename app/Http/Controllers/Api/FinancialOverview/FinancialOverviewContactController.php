<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\Project\ProjectType;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Http\Controllers\Api\Order\OrderController;
use App\Http\Controllers\Controller;
use App\Http\Resources\FinancialOverview\SendFinancialOverviewContact;
use App\Jobs\FinancialOverview\SendAllFinancialOverviewContacts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewContactController extends Controller
{
    public function getFinancialOverviewContact(FinancialOverview $financialOverview, Contact $contact)
    {
        $loanTypeId = ProjectType::where('code_ref', 'loan')->first()->id;
        $obligationTypeId = ProjectType::where('code_ref', 'obligation')->first()->id;
        $capitalTypeId = ProjectType::where('code_ref', 'capital')->first()->id;
        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;

        $financialOverview->load([
            'administration',
            'financialOverviewProjects',
        ]);
        $financialOverviewContactTotalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id);
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->join('project_type', 'projects.project_type_id', '=', 'project_type.id')
            ->select('project_type.code_ref', DB::raw('SUM(quantity_start_value) as total_quantity_start_value'), DB::raw('SUM(quantity_end_value) as total_quantity_end_value'), DB::raw('SUM(amount_start_value) as total_amount_start_value'), DB::raw('SUM(amount_end_value) as total_amount_end_value'))
            ->groupBy('project_type.code_ref')
            ->orderBy('project_type.id')
            ->get();

        $financialOverviewContactLoanProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $loanTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($loanTypeId){
                    $query->where('project_type_id', $loanTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactObligationProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $obligationTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($obligationTypeId){
                    $query->where('project_type_id', $obligationTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactCapitalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $capitalTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($capitalTypeId){
                    $query->where('project_type_id', $capitalTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactPcrProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverview, $pcrTypeId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverview->id)
                ->whereHas('project', function ($query) use($pcrTypeId){
                    $query->where('project_type_id', $pcrTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contact){
                $query->where('contact_id', $contact->id);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContact = collect([
            'financialOverview' => $financialOverview,
            'contact' => $contact,
            'financialOverviewContactTotalProjects' => $financialOverviewContactTotalProjects,
            'financialOverviewContactLoanProjects' => $financialOverviewContactLoanProjects,
            'financialOverviewContactObligationProjects' => $financialOverviewContactObligationProjects,
            'financialOverviewContactCapitalProjects' => $financialOverviewContactCapitalProjects,
            'financialOverviewContactPcrProjects' => $financialOverviewContactPcrProjects,
        ]);
        return $financialOverviewContact;
    }


    public function getFinancialOverviewContactsForSendingEmail(FinancialOverview $financialOverview, Request $request)
    {
        $this->authorize('manage', FinancialOverview::class);

        $financialOverviewContacts = self::getFinancialOverviewContactsForSending($financialOverview, $request, 'email');
        return SendFinancialOverviewContact::collection($financialOverviewContacts);
    }

    public function getFinancialOverviewContactsForSendingPost(FinancialOverview $financialOverview, Request $request)
    {
        $this->authorize('manage', FinancialOverview::class);

        $financialOverviewContacts = self::getFinancialOverviewContactsForSending($financialOverview, $request, 'post');
        return SendFinancialOverviewContact::collection($financialOverviewContacts);
    }

    protected function getFinancialOverviewContactsForSending(FinancialOverview $financialOverview, Request $request, $type)
    {
        if($request->input('ids')){
            $financialOverviewContacts = FinancialOverviewContact::whereIn('status_id', ['to-send', 'error-sending', 'is-resending'])->where('financial_overview_id', $financialOverview->id)->whereIn('id', $request->input('ids'))->get();
        }else{
            $financialOverviewContacts = FinancialOverviewContact::whereIn('status_id', ['to-send', 'error-sending', 'is-resending'])->where('financial_overview_id', $financialOverview->id)->get();
        }

        foreach ($financialOverviewContacts as $financialOverviewContact) {
            $financialOverviewContact->emailed_to = self::getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
        }
        if($type == 'email') {
            $financialOverviewContacts = $financialOverviewContacts->reject(function ($financialOverviewContact) {
                return ( $financialOverviewContact->emailed_to === 'Geen e-mail bekend' );
            });
        }else{
            $financialOverviewContacts = $financialOverviewContacts->reject(function ($financialOverviewContact) {
                return ( $financialOverviewContact->emailed_to !== 'Geen e-mail bekend' );
            });
        }

        return $financialOverviewContacts;
    }

    public function download(FinancialOverviewContact $financialOverviewContact)
    {
        $this->authorize('manage', FinancialOverview::class);

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
//            return FinancialOverviewHelper::createFinancialOverviewContactDocument( $financialOverviewContact->financialOverview, $financialOverviewContact->contact, true);
        }

        return response()->download($filePath, $financialOverviewContact->name);
    }

    public function getEmailPreview(FinancialOverviewContact $financialOverviewContact)
    {
        FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact, true);
//        FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact->financialOverview, $financialOverviewContact->contact, true);
        return FinancialOverviewHelper::send($financialOverviewContact, true);
    }

    public function sendAll(FinancialOverview $financialOverview, Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', FinancialOverview::class);

        $financialOverviewContacts = self::getFinancialOverviewContactsForSending($financialOverview, $request, 'email');

        $response = [];

        if ($financialOverviewContacts->count() > 0) {
//            $administration = $financialOverviewContacts->first()->financialOverview->administration;

            // Eerst hele zet in progress of is resending zetten
            foreach ($financialOverviewContacts as $financialOverviewContact) {
                $financialOverviewContactController = new FinancialOverviewContactController();
                $emailTo = $financialOverviewContactController->getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];

                if ($emailTo === 'Geen e-mail bekend') {
                    abort(404, 'Geen e-mail bekend');
                } else {
                    if($financialOverviewContact->status_id === 'to-send') {
                        FinancialOverviewHelper::financialOverviewContactInProgress($financialOverviewContact);
                    }elseif($financialOverviewContact->status_id === 'error-sending'){
                        FinancialOverviewHelper::financialOverviewContactIsResending($financialOverviewContact);
                    }else{
                        abort(404, "Waardestaat contact met ID " . $financialOverviewContact->id . " heeft geen status Te verzenden of Opnieuw te verzenden");
                    }
                }
            }
            SendAllFinancialOverviewContacts::dispatch($financialOverviewContacts, Auth::id() );
        }

        return $response;
    }

//    public function sendAllPost(FinancialOverview $financialOverview, Request $request)
//    {
//        set_time_limit(0);
//        $this->authorize('manage', Invoice::class);
//
//        $invoices = Invoice::whereIn('id', $request->input('ids'))->with(['order.contact', 'administration'])->get();
//
//        // verwijder alle notas waar twinfield gebruikt wordt en geen ledgercode bekend is
//        $validatedInvoices = $invoices->reject(function ($invoice) {
//            return ($invoice->administration->uses_twinfield && $invoice->invoiceProducts()->whereNull('twinfield_ledger_code')->exists());
//        });
//
//        $html
//            = '<style>
//.page-break {
//    page-break-after: always;
//}
//</style>';
//
//        if ($validatedInvoices->count() > 0) {
//            // Eerst hele zet in progress zetten
//            foreach ($validatedInvoices as $k => $invoice) {
//                if($invoice->status_id === 'to-send') {
//                    InvoiceHelper::invoiceInProgress($invoice);
//                }else{
//                    abort(404, "Nota met ID " . $invoice->id . " heeft geen status Te verzenden");
//                }            }
//
//            $financialOverviewContactController = new FinancialOverviewContactController();
//
//            foreach ($validatedInvoices as $k => $invoice) {
//
//                $invoice->date_sent = Carbon::today();
//                $invoice->date_collection = $request->input('dateCollection');
//                $invoice->save();
//
//                $emailTo = $financialOverviewContactController->getContactInfoForFinancialOverview($invoice->order->contact)['email'];
//                $contactPerson = $financialOverviewContactController->getContactInfoForFinancialOverview($invoice->order->contact)['contactPerson'];
//
//                if ($invoice->order->contact->full_name === $contactPerson) {
//                    $contactPerson = null;
//                }
//
//                $contactName = null;
//
//                if ($invoice->order->contact->type_id == 'person') {
//                    $prefix = $invoice->order->contact->person->last_name_prefix;
//                    $contactName = $prefix ? $invoice->order->contact->person->first_name . ' ' . $prefix . ' '
//                        . $invoice->order->contact->person->last_name
//                        : $invoice->order->contact->person->first_name . ' '
//                        . $invoice->order->contact->person->last_name;
//                } elseif ($invoice->order->contact->type_id == 'organisation') {
//                    $contactName = $invoice->order->contact->full_name;
//                }
//
//                if ($emailTo === 'Geen e-mail bekend') {
//                    $createdOk = InvoiceHelper::createInvoiceDocument($invoice);
//                    if ($createdOk) {
//                        InvoiceHelper::invoiceIsSending($invoice);
//                        InvoiceHelper::invoiceSend($invoice);
//
//                        $img = '';
//                        if ($invoice->administration->logo_filename) {
//                            $path = storage_path('app' . DIRECTORY_SEPARATOR
//                                . 'administrations' . DIRECTORY_SEPARATOR
//                                . $invoice->administration->logo_filename);
//                            $logo = file_get_contents($path);
//
//                            $src = 'data:' . mime_content_type($path)
//                                . ';charset=binary;base64,' . base64_encode($logo);
//                            $src = str_replace(" ", "", $src);
//                            $img = '<img src="' . $src
//                                . '" width="auto" height="156px"/>';
//                        }
//
//                        if ($k !== 0) {
//                            $html .= '<div class="page-break"></div>';
//                        }
//                        $html .= view('invoices.generic')->with([
//                            'invoice' => $invoice,
//                            'contactPerson' => $contactPerson,
//                            'contactName' => $contactName
//                        ])
//                            ->with('logo', $img)->render();
//                    }
//                }
//            }
//        }
//
//        $name = 'Post-notas-' . Carbon::now()->format("Y-m-d-H-i-s") . '.pdf';
//
//        libxml_use_internal_errors(true);
//        $pdfOutput = PDF::loadHTML($html);
//        libxml_use_internal_errors(false);
//
//        header('X-Filename:' . $name);
//        header('Access-Control-Expose-Headers: X-Filename');
//
//        return $pdfOutput->output();
//    }

    public function getContactInfoForFinancialOverview(Contact $contact)
    {
        //Get email/name based on priority:
        //2 - organisation - primary
        //4 - contact person - primary

        $contactInfo = [
            'email' => 'Geen e-mail bekend',
            'contactPerson' => null,
        ];

        if($contact->isOrganisation()){
            $email = $this->getOrganisationEmailAddressFinancialOverview($contact);

            if (!$email && $contact->contactPerson()->exists())
            {
                $contactInfo['email'] = $contact->contactPerson->contact->getOrderEmail() ? $contact->contactPerson->contact->getOrderEmail()->email : 'Geen e-mail bekend';
            }
            else{
                $contactInfo['email'] = $email ? $email->email : 'Geen e-mail bekend';
            }

            if($contact->contactPerson()->exists()){
                $contactPerson = '';
                if ($contact->contactPerson->contact->type_id == 'person') {
                    $initials = $contact->contactPerson->contact->person->initials;
                    $prefix = $contact->contactPerson->contact->person->last_name_prefix;
                    $contactInitialsOrFirstName = $initials ? $initials : $contact->contactPerson->contact->person->first_name;
                    $contactPerson = $prefix ? ($contactInitialsOrFirstName . ' ' . $prefix . ' ' . $contact->contactPerson->contact->person->last_name) : $contactInitialsOrFirstName . ' ' . $contact->contactPerson->contact->person->last_name;
                } elseif ($contact->contactPerson->contact->type_id == 'organisation') {
                    $contactPerson = $contact->contactPerson->contact->full_name;
                }

                $contactInfo['contactPerson'] = $contactPerson;
            }
        }
        else{
            $contactInfo['email'] = $contact->getOrderEmail() ? $contact->getOrderEmail()->email : 'Geen e-mail bekend';
        }

        return $contactInfo;
    }

    protected function getOrganisationEmailAddressFinancialOverview(Contact $contact){
        $emailAddresses = $contact->emailAddresses->reverse();

        foreach($emailAddresses as $emailAddress) {
            if ($emailAddress->type_id === 'invoice') {
                return $emailAddress;
            }
        }

        if($contact->primaryEmailAddress){
            return $contact->primaryEmailAddress;
        }

        return null;
    }

}