<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\Email\EmailGroupEmailAddress;
use App\Eco\Email\Jobs\SendEmailsWithVariables;
use App\Eco\Email\Jobs\StoreConceptEmail;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Mailbox\Mailbox;
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\RequestQueries\Email\Grid\RequestQuery;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\Email\GridEmail;
use App\Http\Resources\GenericResource;
use Carbon\Carbon;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EmailController
{

    public function grid(RequestQuery $requestQuery, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        $queryBuilderPagination = $requestQuery->getQuery();
        $queryBuilderNoPagination = $requestQuery->getQueryNoPagination();

        $queryBuilderPagination->whereIn('mailbox_id', $mailboxIds);
        $queryBuilderNoPagination->whereIn('mailbox_id', $mailboxIds);

        if ($folder == 'concept') {
            $queryBuilderPagination->where('folder', $folder)
                ->orderBy('created_at', 'desc');
            $queryBuilderNoPagination->where('folder', $folder)
                ->orderBy('created_at', 'desc');
        }
        else if($folder == 'removed') {
            $queryBuilderPagination->where('folder', $folder)
                ->orderBy('date_sent', 'desc');
            $queryBuilderNoPagination->where('folder', $folder)
                ->orderBy('date_sent', 'desc');
        } else {
            $queryBuilderPagination->where('folder', $folder)
                ->orderBy('date_sent', 'desc');
            $queryBuilderNoPagination->where('folder', $folder)
                ->orderBy('date_sent', 'desc');
        }

        $total = $queryBuilderNoPagination->count();

        $emails = $queryBuilderPagination->get();
        $emails->load('mailbox', 'contacts');

        return GridEmail::collection($emails)
            ->additional([
                'meta' => [
                    'total' => $total,
                ]
            ]);
    }

    public function show(Email $email){
        $email->load('contacts', 'attachments', 'closedBy', 'intake', 'task', 'quotationRequest', 'measure', 'opportunity', 'order', 'invoice',   'responsibleUser',
            'responsibleTeam');

        return FullEmail::make($email);
    }

    public function getReply(Email $email){
        $email->load('contacts', 'attachments');

        //Reply logic:
        //To -> from
        //From -> mailbox email
        //Cc -> empty
        //Bcc -> empty
        $email->to = [$email->from];
        $email->from = $email->mailbox->email;
        $email->cc = [];
        $email->bcc = [];

        //add extra data to html body
        $email->html_body = '<p></p> <p>Oorspronkelijk bericht:</p> ' . $email->html_body;

        return FullEmail::make($email);
    }

    public function getReplyAll(Email $email){
        $email->load('contacts', 'attachments');

        //Reply all logic:
        //To -> (To without own email) + (From)
        //From -> mailbox email
        //Cc -> (Cc without own email)
        //Bcc -> empty

        $to = $email->to;

        $index = array_search($email->mailbox->email, $email->to);
        if($index !== false) {
            unset($to[$index]);
        }
        array_unshift($to, $email->from);
        $to = array_values($to);

        $cc = $email->cc;


        $index = array_search($email->mailbox->email, $email->cc);

        if($index !== false) {
            unset($cc[array_search($email->mailbox->email, $email->cc)]);
        }

        $cc = array_values($cc);

        $email->to = $to;
        $email->from = $email->mailbox->email;
        $email->cc = $cc;
        $email->bcc = [];

        //add extra data to html body
        $email->html_body = '<p></p> <p>Oorspronkelijk bericht:</p> ' . $email->html_body;

        return FullEmail::make($email);
    }

    public function getForward(Email $email){
        $email->load('contacts', 'attachments');

        //Forward logic:
        //To -> empty
        //From -> mailbox email
        //Cc -> empty
        //Bcc -> empty

        $email->to = [];
        $email->from = $email->mailbox->email;
        $email->cc = [];
        $email->bcc = [];

        return FullEmail::make($email);
    }

    public function getEmailGroup(ContactGroup $contactGroup){
        return $contactGroup->name . '(' . $contactGroup->all_contacts->count() . ')';
    }

    public function update(Email $email, RequestInput $input, Request $request)
    {
        $data = $input
            ->integer('intakeId')->validate('exists:intakes,id')->onEmpty(null)->alias('intake_id')->next()
            ->integer('quotationRequestId')->validate('exists:quotation_requests,id')->onEmpty(null)->alias('quotation_request_id')->next()
            ->integer('measureId')->validate('exists:measures,id')->onEmpty(null)->alias('measure_id')->next()
            ->integer('taskId')->validate('exists:tasks,id')->onEmpty(null)->alias('task_id')->next()
            ->integer('opportunityId')->validate('exists:opportunities,id')->onEmpty(null)->alias('opportunity_id')->next()
            ->integer('productionProjectId')->validate('exists:production_projects,id')->onEmpty(null)->alias('production_project_id')->next()
            ->integer('orderId')->validate('exists:orders,id')->onEmpty(null)->alias('order_id')->next()
            ->integer('invoiceId')->validate('exists:invoices,id')->onEmpty(null)->alias('invoice_id')->next()
            ->integer('responsibleUserId')->validate('nullable|exists:users,id')->whenMissing(null)->onEmpty(null)->alias('responsible_user_id')->next()
            ->integer('responsibleTeamId')->validate('nullable|exists:teams,id')->whenMissing(null)->onEmpty(null)->alias('responsible_team_id')->next()
            ->get();

        $email->fill($data);

        $email->save();

        $contactIds = explode(',', $request->contactIds);

        if ($contactIds[0] == '') {
            $contactIds = [];
        }
        else if(!Mailbox::where('email', $email->from)->exists()){
            //if we pair a email to a contact, we insert the email for the contact
            $emailAddress = new EmailAddress();
            $emailAddress->email = $email->from;
            $emailAddress->type_id = 'general';

            foreach ($contactIds as $contactId) {
                if(!EmailAddress::where('contact_id', $contactId)->where('email', $email->from)->exists()) {
                    $contactEmailAddress = $emailAddress->replicate();
                    $contactEmailAddress->contact_id = $contactId;
                    $contactEmailAddress->save();
                }
            }
        }

        $email->contacts()->sync($contactIds);

        return FullEmail::make($email);
    }

    public function send(Mailbox $mailbox, Request $request)
    {
            $sanitizedData = $this->getEmailData($request);

            //add basic html tags for new emails
            $sanitizedData['html_body']
                = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
                . $sanitizedData['subject'] . '</title></head>'
                . $sanitizedData['html_body'] . '</html>';

            //Save as concept, if sending fails we still have the concept
            $email = (new StoreConceptEmail($mailbox,
                $sanitizedData))->handle();

            //Create relations with contact if needed
            $this->createEmailContactRelations($email, $request);

            //Email attachments
            $this->checkStorageDir($mailbox->id);

            //get attachments
            $attachments = $request->file('attachments')
                ? $request->file('attachments') : [];

            $this->storeEmailAttachments($attachments, $mailbox->id,
                $email->id);

            //old attachments(forward,reply etc.)
            $oldAttachments = $request->input('oldAttachments') ? $request->input('oldAttachments') : [];

            //Gaat dit goed bij deleten attachment van oude mail?
            foreach ($oldAttachments as $oldAttachment){
                $oldAttachment = json_decode($oldAttachment);
                $oldAttachment = EmailAttachment::find($oldAttachment->id);
                $replicatedAttachment = $oldAttachment->replicate();
                $replicatedAttachment->email_id = $email->id;
                $replicatedAttachment->save();
            }

        //if we send to group we save in a pivot because they can have alot of members
        if ($sanitizedData['contact_group_id']) {
            $contactGroup = ContactGroup::find($sanitizedData['contact_group_id']);
            foreach ($contactGroup->all_contacts as $contact) {
                if ($contact->primaryEmailAddress) {
                    $email->groupEmailAddresses()->attach($contact->primaryEmailAddress->id);

                    $email->contacts()->attach($contact->id);
                }
            }
        }

            (new SendEmailsWithVariables($email, json_decode($request['to'])))->handle();
    }

    public function storeConcept(Mailbox $mailbox, Request $request)
    {
        $sanitizedData = $this->getEmailData($request);

        $email = (new StoreConceptEmail($mailbox, $sanitizedData))->handle();

        $this->checkStorageDir($mailbox->id);

        //get attachments
        $attachments = $request->file('attachments')
            ? $request->file('attachments') : [];

        $this->storeEmailAttachments($attachments, $mailbox->id, $email->id);
    }

    public function peek(){
        $contacts = Contact::select('id', 'full_name')->with('primaryEmailAddress')->get();
        $users = User::select('id', 'email', 'first_name', 'last_name')->get();

        foreach($contacts as $contact){
            if($contact->primaryEmailAddress) {
                $people[] = [
                    'id' => $contact->id,
                    'name' => $contact->full_name . ' (' . $contact->primaryEmailAddress->email . ')' ,
                    'email' => $contact->primaryEmailAddress->email
                ];
            }
        }

        //Id met @ omdat een email daar niet mee mag beginnen
        foreach($users as $user){
            $people[] = [
                'id' => '@user_' . $user->id,
                'name' => $user->present()->fullName() . ' (' . $user->email . ')',
                'email' => $user->email
            ];
        }

        return $people;
    }

    public function downloadEmailAttachment(EmailAttachment $emailAttachment)
    {
        $filePath = Storage::disk('mail_attachments')->getDriver()->getAdapter()->applyPathPrefix($emailAttachment->filename);

        $contactId = '';
        if($emailAttachment->email->contacts()->count() === 1) {
            $contactId = $emailAttachment->email->contacts()->first()->id;
        }
        header('X-Filename:' . $emailAttachment->name);
        header('X-ContactId:' . $contactId);
        header('Access-Control-Expose-Headers: X-Filename, X-ContactId');
        return response()->download($filePath, $emailAttachment->name);
    }

    public function storeEmailAttachment(Email $email, Request $request)
    {
        //get attachment
        $attachments = $request->file('attachments') ? $request->file('attachments') : [];

        $this->storeEmailAttachments($attachments, $email->mailbox_id, $email->id);

        return GenericResource::collection($email->attachments);
    }

    public function deleteEmailAttachment(EmailAttachment $emailAttachment)
    {
        //delete real file
        Storage::disk('mail_attachments')->delete($emailAttachment->filename);

        //delete db record
        $emailAttachment->delete();
    }

    public function updateConcept(Email $email, Request $request){

        $sanitizedData = $this->getEmailData($request);

        $email->to = $sanitizedData['to'];
        $email->cc = $sanitizedData['cc'];
        $email->bcc = $sanitizedData['bcc'];
        $email->subject = $sanitizedData['subject'];
        $email->html_body = $sanitizedData['html_body'];
        $email->save();
        
        return $email;
    }

    public function sendConcept(Email $email, Request $request){
        $email = $this->updateConcept($email, $request);
        (new SendEmailsWithVariables($email, json_decode($request['to'])))->handle();
        return FullEmail::make($email);
    }

    public function getEmailData(Request $request, $withGroup = false){
        //Get all basic mail info
        $data = $request->validate([
            'to' => 'required',
            'cc' => '',
            'bcc' => '',
            'subject' => '',
            'htmlBody' => '',
            'quotationRequestId' => '',
        ]);

        $data['to'] = json_decode($data['to']);
        $data['cc'] = json_decode($data['cc']);
        $data['bcc'] = json_decode($data['bcc']);

        //to, cc, bcc example data:
        //1,2, fren.dehaan@xaris.nl, @user_1, @user_2, 3, rob.rollenberg@xaris.nl

        $emails = [];
        $groupId = null;
        $sendVariations = ['to'];
        $emails['to'] = [];

        if ($data['cc'] != '') {
            array_push($sendVariations, 'cc');
        }
        else{
            $emails['cc'] = [];
        }
        if ($data['bcc'] != '') {
            array_push($sendVariations, 'bcc');
        }
        else{
            $emails['bcc'] = [];
        }

        foreach ($sendVariations as $sendVariation){
            foreach ($data[$sendVariation] as $emailData) {
                if (is_numeric($emailData)){
                    $primaryEmail = Contact::find($emailData)->primaryEmailAddress()->value('email');
                    if($primaryEmail){
                        $emails[$sendVariation][] = $primaryEmail;
                    }
                }
                else if(substr($emailData, 0, 6 ) === "@user_"){
                    $user_id = str_replace("@user_", "", $emailData);
                    $emails[$sendVariation][] =  User::find($user_id)->email;
                }
                else if(substr($emailData, 0, 7 ) === "@group_"){
                    $groupId = str_replace("@group_", "", $emailData);
                }
                else if(filter_var($emailData, FILTER_VALIDATE_EMAIL)){
                    $emails[$sendVariation][] = $emailData;
            }}
        }

        if(!array_key_exists('quotationRequestId', $data)){
            $data['quotationRequestId'] = null;
        }

        if($data['quotationRequestId'] == ''){
            $data['quotationRequestId'] = null;
        }

        $sanitizedData = [
            'to' => $emails['to'],
            'cc' => $emails['cc'],
            'bcc' => $emails['bcc'],
            'subject' => $data['subject'] ?: '',
            'html_body' => $data['htmlBody'],
            'quotation_request_id' => $data['quotationRequestId'],
            'contact_group_id' => $groupId ? $groupId : null
        ];

        return $sanitizedData;
    }

    public function createEmailContactRelations(Email $email, Request $request)
    {
        $contactIds = [];

        //Get all possible contacts
        $data = $request->validate([
            'to' => 'required',
            'cc' => '',
            'bcc' => '',
        ]);

        $data['to'] = json_decode($data['to']);
        $data['cc'] = json_decode($data['cc']);
        $data['bcc'] = json_decode($data['bcc']);

        //to, cc, bcc example data:
        //1,2, fren.dehaan@xaris.nl, @user_1, @user_2, 3, rob.rollenberg@xaris.nl

        $sendVariations = ['to'];
        if ($data['cc'] != '') {
            array_push($sendVariations, 'cc');
        }
        if ($data['bcc'] != '') {
            array_push($sendVariations, 'bcc');
        }

        foreach ($sendVariations as $sendVariation) {
            foreach ($data[$sendVariation] as $emailData) {
                if (is_numeric($emailData)) {
                    array_push($contactIds, $emailData);
                }
            }
        }

        $email->contacts()->sync(array_unique($contactIds));
    }

    public function storeEmailAttachments($attachments, $mailbox_id, $email_id){
        //store attachments
        foreach ($attachments as $attachment) {
            if(!$attachment->isValid()) abort('422', 'Error uploading file');
            $filename = $attachment->store('mailbox_' . $mailbox_id . DIRECTORY_SEPARATOR . 'outbox', 'mail_attachments');

            $emailAttachment = new EmailAttachment([
                'filename' => $filename,
                'name' => $attachment->getClientOriginalName(),
                'email_id' => $email_id,
            ]);
            $emailAttachment->save();
        }
    }

    public function checkStorageDir($mailbox_id){
        //Check if storage map exists
        $storageDir = Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'mailbox_' . $mailbox_id . DIRECTORY_SEPARATOR . 'outbox';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    public function setEmailStatus(Email $email, $emailStatusId){

        $email->status = $emailStatusId;

        if($emailStatusId == 'closed'){
            $email->closedBy()->associate(Auth::user());
            $email->date_closed = new Carbon();
        }

        $email->save();

        return FullEmail::make($email);
    }

    public function moveEmailToFolder(Request $request, Email $email)
    {
        $folder = $request->input('folder');

        if($folder != 'inbox' && $folder != 'sent' && $folder != 'removed'){
            abort(406, 'Map niet toegestaan.');
        }

        $email->folder = $folder;

        $email->save();

        return FullEmail::make($email);
    }

    public function destroy(Email $email){
        $email->delete();
    }

    public function getAmountOfOpenEmails(){
        $user = Auth::user();
        $userId = Auth::id();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        $teamIds = [];

        foreach($user->teams as $team){
            array_push($teamIds, $team->id);
        }

        $query = Email::whereIn('mailbox_id', $mailboxIds)->where('status', '!=', 'closed')->where('folder', 'inbox');

        $query->where(function($query) use ($userId, $teamIds) {
            $query->where('emails.responsible_user_id', $userId);
            $query->orWhereIn('emails.responsible_team_id', $teamIds);

        });

        return $query->count();
    }
}