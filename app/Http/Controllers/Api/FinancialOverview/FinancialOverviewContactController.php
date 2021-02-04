<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\FinancialOverview\FinancialOverviewParticipantProject;
use App\Eco\Project\ProjectType;
use App\Helpers\FinancialOverview\FinancialOverviewHelper;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\FinancialOverviewContact\Grid\RequestQuery;
use App\Http\Resources\FinancialOverviewContact\SendFinancialOverviewContact;
use App\Http\Resources\FinancialOverviewContact\GridFinancialOverviewContact;
use App\Jobs\FinancialOverview\CreateAllFinancialOverviewContactsPost;
use App\Jobs\FinancialOverview\SendAllFinancialOverviewContacts;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FinancialOverviewContactController extends Controller
{
    public function grid(RequestQuery $requestQuery)
    {
        $financialOverviewContacts = $requestQuery->get();

        $financialOverviewContacts->load(['financialOverview', 'contact']);

        foreach ($financialOverviewContacts as $financialOverviewContact) {
            $financialOverviewContact->emailToAddress = self::getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
        }

        $selectedFinancialOverviewContacts = new Collection();
        foreach ($requestQuery->totalIds() as $financialOverviewContactId) {
            $financialOverviewContact = FinancialOverviewContact::find($financialOverviewContactId);
            $financialOverviewContact->emailToAddress = self::getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
            $selectedFinancialOverviewContacts->push($financialOverviewContact);
        }


        $totalIds = $selectedFinancialOverviewContacts->pluck("id");

        return GridFinancialOverviewContact::collection($financialOverviewContacts)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                    'financialOverviewContactIdsTotal' => $totalIds,
                ]
            ]);
    }

    public function getFinancialOverviewContact(FinancialOverviewContact $financialOverviewContact, $preview = false)
    {
        $financialOverviewContact->append('status');

        $loanTypeId = ProjectType::where('code_ref', 'loan')->first()->id;
        $obligationTypeId = ProjectType::where('code_ref', 'obligation')->first()->id;
        $capitalTypeId = ProjectType::where('code_ref', 'capital')->first()->id;
        $pcrTypeId = ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;

        $financialOverviewContact->financialOverview->load([
            'administration',
            'financialOverviewProjects',
        ]);

        $contactId = $financialOverviewContact->contact->id;
        $financialOverviewId = $financialOverviewContact->financialOverview->id;

        if($preview){
            $definitiveFilter = [true, false];
        } else {
            $definitiveFilter = [true];
        }
        $financialOverviewContactTotalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $definitiveFilter){
            $query->whereIn('definitive', $definitiveFilter)
                ->where('financial_overview_id', $financialOverviewId);
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->join('project_type', 'projects.project_type_id', '=', 'project_type.id')
            ->select('project_type.code_ref', DB::raw('SUM(quantity_start_value) as total_quantity_start_value'), DB::raw('SUM(quantity_end_value) as total_quantity_end_value'), DB::raw('SUM(amount_start_value) as total_amount_start_value'), DB::raw('SUM(amount_end_value) as total_amount_end_value'))
            ->groupBy('project_type.code_ref')
            ->orderBy('project_type.id')
            ->get();

        $financialOverviewContactLoanProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $loanTypeId, $contactId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverviewId)
                ->whereHas('project', function ($query) use($loanTypeId){
                    $query->where('project_type_id', $loanTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactObligationProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $obligationTypeId, $contactId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverviewId)
                ->whereHas('project', function ($query) use($obligationTypeId){
                    $query->where('project_type_id', $obligationTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactCapitalProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $capitalTypeId, $contactId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverviewId)
                ->whereHas('project', function ($query) use($capitalTypeId){
                    $query->where('project_type_id', $capitalTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactPcrProjects = FinancialOverviewParticipantProject::whereHas('financialOverviewProject', function ($query) use($financialOverviewId, $pcrTypeId, $contactId){
            $query->where('definitive', true)
                ->where('financial_overview_id', $financialOverviewId)
                ->whereHas('project', function ($query) use($pcrTypeId){
                    $query->where('project_type_id', $pcrTypeId);
                });
        })
            ->whereHas('participantProject', function ($query) use($contactId){
                $query->where('contact_id', $contactId);
            })
            ->join('financial_overview_projects', 'financial_overview_project_id', '=', 'financial_overview_projects.id')
            ->join('projects', 'financial_overview_projects.project_id', '=', 'projects.id')
            ->join('participation_project', 'participant_project_id', '=', 'participation_project.id')
            ->select('participant_project_id', 'participation_project.contact_id', 'financial_overview_projects.project_id', 'projects.name', 'quantity_start_value', 'quantity_end_value', 'bookworth_start_value', 'bookworth_end_value', 'amount_start_value', 'amount_end_value')
            ->get();

        $financialOverviewContactData = collect([
            'financialOverviewContact' => $financialOverviewContact,
            'financialOverviewContactTotalProjects' => $financialOverviewContactTotalProjects,
            'financialOverviewContactLoanProjects' => $financialOverviewContactLoanProjects,
            'financialOverviewContactObligationProjects' => $financialOverviewContactObligationProjects,
            'financialOverviewContactCapitalProjects' => $financialOverviewContactCapitalProjects,
            'financialOverviewContactPcrProjects' => $financialOverviewContactPcrProjects,
        ]);
        return $financialOverviewContactData;
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
            return [];
        }

        foreach ($financialOverviewContacts as $financialOverviewContact) {
            $financialOverviewContact->emailed_to = self::getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];
        }
        if($type == 'email') {
            $financialOverviewContacts = $financialOverviewContacts->reject(function ($financialOverviewContact) {
                return ( $financialOverviewContact->emailed_to === 'Geen e-mail bekend' );
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
            $financialOverviewContactNumber = 'WS-' . $financialOverviewContact->financialOverview->year . '-' . $financialOverviewContact->contact->number . '-' . $financialOverviewContact->financialOverview->id;
            header('X-Filename:' . $financialOverviewContactNumber . '.pdf');
            header('Access-Control-Expose-Headers: X-Filename');
            return FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact, true);
//            return FinancialOverviewHelper::createFinancialOverviewContactDocument( $financialOverviewContact->financialOverview, $financialOverviewContact->contact, true);
        }

        return response()->download($filePath, $financialOverviewContact->name);
    }

    public function downloadPreview(FinancialOverviewContact $financialOverviewContact){
        return FinancialOverviewHelper::createFinancialOverviewContactDocument($financialOverviewContact, true);
    }

    public function getEmailPreview(FinancialOverviewContact $financialOverviewContact)
    {
        return FinancialOverviewHelper::send($financialOverviewContact, true);
    }

    public function sendAll(FinancialOverview $financialOverview, Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', FinancialOverview::class);

        $financialOverviewContacts = self::getFinancialOverviewContactsForSending($financialOverview, $request, 'email');

        $response = [];

        if ($financialOverviewContacts->count() > 0) {

            // Eerst hele zet in progress of is resending zetten
            foreach ($financialOverviewContacts as $financialOverviewContact) {
                $emailTo = self::getContactInfoForFinancialOverview($financialOverviewContact->contact)['email'];

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

    public function sendAllPost(FinancialOverview $financialOverview, Request $request)
    {
        set_time_limit(0);
        $this->authorize('manage', FinancialOverview::class);

        $financialOverviewContacts = self::getFinancialOverviewContactsForSending($financialOverview, $request, 'post');

        $response = [];

        if ($financialOverviewContacts->count() > 0) {

            // Eerst hele zet in progress zetten
            foreach ($financialOverviewContacts as $k => $financialOverviewContact) {
                if ($financialOverviewContact->status_id === 'to-send') {
                    FinancialOverviewHelper::financialOverviewContactInProgress($financialOverviewContact);
                } else {
                    abort(404, "Waardestaat contact met ID " . $financialOverviewContact->id . " heeft geen status Te verzenden");
                }
            }

            $chunkNumber = 0;
            $itemsPerChunk = 50;
            $numberOfChunks = ceil($financialOverviewContacts->count() / $itemsPerChunk);
            foreach ($financialOverviewContacts->chunk($itemsPerChunk) as $financialOverviewContactsSet) {
                $chunkNumber = $chunkNumber + 1;
                CreateAllFinancialOverviewContactsPost::dispatch($chunkNumber, $numberOfChunks, $financialOverview->id, $financialOverviewContactsSet, Auth::id());
            }
        }

        return $response;
    }

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