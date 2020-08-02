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
use App\Eco\EmailAddress\EmailAddress;
use App\Helpers\Settings\PortalSettings;
use App\Jobs\Email\SendEmailsWithVariables;
use App\Eco\Email\Jobs\StoreConceptEmail;
use App\Eco\Mailbox\Mailbox;
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
        $email->load('contacts', 'attachments', 'closedBy', 'removedBy', 'intake', 'task', 'quotationRequest', 'measure', 'opportunity', 'order', 'invoice', 'responsibleUser',
            'responsibleTeam');

        return FullEmail::make($email);
    }

    public function getReply(Email $email){
        //attachments niet laden!
        $email->load('contacts');

        //Reply logic:
        //To -> from
        //From -> mailbox email
        //Cc -> empty
        //Bcc -> empty
        $email->to = [$email->from];
        $email->from = $email->mailbox->email;
        $email->cc = [];
        $email->bcc = [];

        $email->html_body = '<p></p><p>Oorspronkelijk bericht:</p> ' . $email->html_body;

        return FullEmail::make($email);
    }

    public function getReplyAll(Email $email){
        //attachments niet laden!
        $email->load('contacts');

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

        $email->html_body = '<p></p><p>Oorspronkelijk bericht:</p> ' . $email->html_body;

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
            ->integer('projectId')->validate('exists:projects,id')->onEmpty(null)->alias('project_id')->next()
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
                    // If mailadress is in mailbox ignores list then don't add mailaddress to contact
                    $addEmailToContact = true;

                    $mailboxIgnores = $email->mailbox->mailboxIgnores;

                    foreach ($mailboxIgnores as $ignore){
                        switch ($ignore->type_id) {
                            case 'e-mail':
                                if($ignore->value === $email->from){
                                    $addEmailToContact = false;
                                }
                                break;
                            case 'domain':
                                $domain = preg_replace( '!^.+?([^@]+)$!', '$1', $email->from);
                                if ($ignore->value === $domain) {
                                    $addEmailToContact = false;
                                }
                                break;
                        }
                    }

                    if($addEmailToContact) {
                        $contactEmailAddress = $emailAddress->replicate();
                        $contactEmailAddress->contact_id = $contactId;

                        $contactEmailAddress->save();
                    }
                }
            }
        }

        $email->contacts()->sync($contactIds);

        return FullEmail::make($email);
    }

    public function send(Mailbox $mailbox, Email $email, Request $request)
    {
        set_time_limit(0);
        $sanitizedData = $this->getEmailData($request, true);
        $email->to = $sanitizedData['to'];
        $email->cc = $sanitizedData['cc'];
        $email->bcc = $sanitizedData['bcc'];

        //add basic html tags for new emails
        $email->html_body
            = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'
            . $email->subject . '</title></head>'
            . $email->html_body . '</html>';

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
        if ($email->contact_group_id) {
            $contactGroup = ContactGroup::find($email->contact_group_id);
            $contactIds = [];
            foreach ($contactGroup->all_contacts as $contact) {
                if ($contact->primaryEmailAddress) {
                    $email->groupEmailAddresses()->attach($contact->primaryEmailAddress->id);
                    array_push($contactIds, $contact->id);
                }
            }
            $oldEmailContactIds = $email->contacts()->pluck('contacts.id')->toArray();
            $email->contacts()->sync(array_unique(array_merge($contactIds, $oldEmailContactIds)));
        }

        $email->sent_by_user_id = Auth::id();
        $email->save();

        SendEmailsWithVariables::dispatch($email, json_decode($request['to']), Auth::id());
    }

    public function storeConcept(Mailbox $mailbox, RequestInput $requestInput)
    {
        $data = $requestInput
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->get();

        $email = (new StoreConceptEmail($mailbox, $data))->handle();

        return $email->id;
    }

    public function storeConcept2(Mailbox $mailbox, Email $email, Request $request)
    {
        $this->updateConcept2($email, $request);

        $this->checkStorageDir($mailbox->id);

        //get attachments
        $attachments = $request->file('attachments')
            ? $request->file('attachments') : [];

        $this->storeEmailAttachments($attachments, $mailbox->id, $email->id);

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
    }

    public function peek(){
        $contacts = Contact::select('id', 'full_name')->with('emailAddresses')->get();

        foreach($contacts as $contact) {
            foreach ($contact->emailAddresses as $emailAddress) {
                if ($emailAddress->primary) {
                    $people[] = [
                        'id' => $emailAddress->id,
                        'name' => $contact->full_name . ' (' . $emailAddress->email . ')',
                        'email' => $emailAddress->email
                    ];
                }
            }
            foreach ($contact->emailAddresses as $emailAddress) {
                if (!$emailAddress->primary) {
                    $people[] = [
                        'id' => $emailAddress->id,
                        'name' => $contact->full_name . ' (' . $emailAddress->email . ')',
                        'email' => $emailAddress->email
                    ];
                }
            }
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
        //delete real file (only when count on filename is 1, otherwise this attachment is also in use in another email because of a reply or send through)
        $countAttachment = EmailAttachment::where('filename', $emailAttachment->filename)->count();
        if($countAttachment == 1){
            Storage::disk('mail_attachments')->delete($emailAttachment->filename);
        }

        //delete db record
        $emailAttachment->delete();
    }

    public function updateConcept(Email $email, RequestInput $requestInput){

        $data = $requestInput
            ->string('subject')->onEmpty(null)->next()
            ->string('htmlBody')->onEmpty(null)->alias('html_body')->next()
            ->get();

        $email->fill($data);

        $email->save();

        return $email->id;
    }

    public function updateConcept2(Email $email, Request $request){
        $sanitizedData = $this->getEmailData($request, false);
        $email->to = $sanitizedData['to'];
        $email->cc = $sanitizedData['cc'];
        $email->bcc = $sanitizedData['bcc'];
        $email->quotation_request_id = $sanitizedData['quotation_request_id'];
        $email->intake_id = $sanitizedData['intake_id'];
        $email->contact_group_id = $sanitizedData['contact_group_id'];
        $email->save();
    }

    public function sendConcept(Email $email, Request $request){
        $mailbox = Mailbox::find($email->mailbox->id);
        $this->send($mailbox, $email, $request);

        return FullEmail::make($email);
    }

    public function getEmailData(Request $request, $forSend = false){
        //Get all basic mail info
        $data = $request->validate([
            'to' => 'required',
            'cc' => '',
            'bcc' => '',
            'quotationRequestId' => '',
            'intakeId' => '',
        ]);

        $data['to'] = json_decode($data['to']);
        $data['cc'] = json_decode($data['cc']);
        $data['bcc'] = json_decode($data['bcc']);

        //to, cc, bcc example data:
        //1,2, fren.dehaan@xaris.nl, @group_1, 3, rob.rollenberg@xaris.nl

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
                if ($forSend && is_numeric($emailData)){
                    $emails[$sendVariation][] = EmailAddress::find($emailData)->email;
                }
                if (!$forSend && is_numeric($emailData)){
                    $emails[$sendVariation][] = $emailData;
                }
                else if(substr($emailData, 0, 7 ) === "@group_"){
                    $groupId = str_replace("@group_", "", $emailData);
                }
                else if(filter_var($emailData, FILTER_VALIDATE_EMAIL)){
                    $emails[$sendVariation][] = $emailData;
                }
            }
        }

        if(!array_key_exists('quotationRequestId', $data)){
            $data['quotationRequestId'] = null;
        }

        if($data['quotationRequestId'] == ''){
            $data['quotationRequestId'] = null;
        }

        if(!array_key_exists('intakeId', $data)){
            $data['intakeId'] = null;
        }

        if($data['intakeId'] == ''){
            $data['intakeId'] = null;
        }

        $sanitizedData = [
            'to' => $emails['to'],
            'cc' => $emails['cc'],
            'bcc' => $emails['bcc'],
            'quotation_request_id' => $data['quotationRequestId'],
            'intake_id' => $data['intakeId'],
            'contact_group_id' => $groupId ? $groupId : null
        ];

        return $sanitizedData;
    }

    public function createEmailContactRelations(Email $email, Request $request)
    {
        $contactIds = [];
        $oldEmailContactIds = [];

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
        //1,2, fren.dehaan@xaris.nl, 3, rob.rollenberg@xaris.nl

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
                    $contactId = EmailAddress::find($emailData)->contact_id;
                    array_push($contactIds, $contactId);
                }
            }
        }

        //ook contacten van oude email
        if($request->input('oldEmailId')){
            $oldEmail = Email::find($request->input('oldEmailId'));
            $oldEmailContactIds = $oldEmail->contacts()->pluck('contacts.id')->toArray();
        }

        $email->contacts()->sync(array_unique(array_merge($contactIds, $oldEmailContactIds)));
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
        //als hij van afgehandeld terug wordt gezet

        if($email->status === 'closed' && $emailStatusId != 'closed'){
            $email->closedBy()->dissociate();
            $email->date_closed = null;
        }

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
        if($folder == 'removed'){
            $email->removedBy()->associate(Auth::user());
            $email->date_removed = new Carbon();
        }
        if($folder != 'removed'){
            $email->removedBy()->dissociate();
            $email->date_removed = null;
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