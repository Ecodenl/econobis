<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Person\Person;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class EmailGenericController extends Controller
{
    public function __construct()
    {
        $this->middleware(ConvertEmptyStringsToNull::class);
    }

    public function update(Email $email, Request $request)
    {
        $this->authorize('manage', $email);

        $data = $request->validate([
            'status' => ['nullable', 'string'],
            'folder' => ['sometimes', 'required', 'string'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
            'intakeId' => ['nullable', 'exists:intakes,id'],
            'taskId' => ['nullable', 'exists:tasks,id'],
            'quotationRequestId' => ['nullable', 'exists:quotation_requests,id'],
            'measureId' => ['nullable', 'exists:measures,id'],
            'opportunityId' => ['nullable', 'exists:opportunities,id'],
            'orderId' => ['nullable', 'exists:orders,id'],
            'invoiceId' => ['nullable', 'exists:invoices,id'],
            'note' => ['nullable', 'string'],
        ]);

        $contactIds = $request->validate([
            'contactIds' => ['array'],
            'contactIds.*' => ['integer', 'exists:contacts,id'],
        ])['contactIds'] ?? [];

        $email->update(Arr::keysToSnakeCase($data));

        $email->contacts()->sync($contactIds);

        $email->copyEmailAddressToContacts();
    }

    public function deleteMultiple(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:emails,id'],
        ]);

        $emails = Email::whereIn('id', $request->input('ids'))->get();

        foreach ($emails as $email) {
            $this->authorize('manage', $email);
        }

        foreach ($emails as $email) {
            $email->delete();
        }
    }

    public function updateMultiple(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:emails,id'],
        ]);

        $emails = Email::whereIn('id', $request->input('ids'))->get();

        foreach ($emails as $email) {
            $this->authorize('manage', $email);
        }

        $data = $request->validate([
            'status' => ['sometimes', 'required', 'string'],
            'folder' => ['sometimes', 'required', 'string'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
        ]);

        foreach ($emails as $email) {
            $email->update(Arr::keysToSnakeCase($data));
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'to' => ['sometimes', 'array'],
        ]);

        $this->authorize('create', Email::class);

        $mailbox = Auth::user()->defaultMailbox;
        if(!$mailbox){
            $mailbox = Mailbox::getDefault();
        }

        $email = new Email([
            'from' => $mailbox->email,
            'to' => $request->input('to', []),
            'cc' => [],
            'bcc' => [],
            'html_body' => view('emails.new_email_wrapper')->render(),
            'mailbox_id' => $mailbox->id,
            'folder' => 'concept',
        ]);
        $email->save();

        return response()->json([
            'id' => $email->id,
        ]);
    }

    public function storeReply(Email $email)
    {
        $this->authorize('manage', $email);

        $mailbox = Auth::user()->defaultMailbox;
        if(!$mailbox){
            $mailbox = Mailbox::getDefault();
        }

        $reply = $email->generator()->reply([
            'from' => optional($mailbox)->email,
            'mailbox_id' => optional($mailbox)->id,
        ]);

        return response()->json([
            'id' => $reply->id,
        ]);
    }

    public function storeReplyAll(Email $email)
    {
        $this->authorize('manage', $email);

        $mailbox = Auth::user()->defaultMailbox;
        if(!$mailbox){
            $mailbox = Mailbox::getDefault();
        }

        $reply = $email->generator()->replyAll([
            'from' => optional($mailbox)->email,
            'mailbox_id' => optional($mailbox)->id,
        ]);

        return response()->json([
            'id' => $reply->id,
        ]);
    }

    public function storeForward(Email $email)
    {
        $this->authorize('manage', $email);

        $mailbox = Auth::user()->defaultMailbox;
        if(!$mailbox){
            $mailbox = Mailbox::getDefault();
        }

        $forward = $email->generator()->forward([
            'from' => optional($mailbox)->email,
            'mailbox_id' => optional($mailbox)->id,
        ]);

        return response()->json([
            'id' => $forward->id,
        ]);
    }

    public function createContact(Email $email)
    {
        $this->authorize('manage', $email);

        $emailAddress = $email->getToRecipients()->first()->getEmailAddress();

        $contact = new Contact();
        $contact->save();

        $person = new Person([
            'contact_id' => $contact->id,
            'last_name' => Str::before($emailAddress, '@'),
        ]);
        $person->save();

        $emailAddress = new EmailAddress([
            'contact_id' => $contact->id,
            'type_id' => 'general',
            'email' => $emailAddress,
        ]);

        $emailAddress->save();

        $email->contacts()->attach($contact->id);
    }

    public function storeGroupMail(ContactGroup $contactGroup)
    {
        $this->authorize('create', Email::class);

        $mailbox = Auth::user()->defaultMailbox;
        if(!$mailbox){
            $mailbox = Mailbox::getDefault();
        }

        $email = new Email([
            'from' => optional($mailbox)->email,
            'to' => [],
            'cc' => [],
            'bcc' => [],
            'html_body' => view('emails.new_email_wrapper')->render(),
            'mailbox_id' => optional($mailbox)->id,
            'folder' => 'concept',
            'contact_group_id' => $contactGroup->id,
        ]);
        $email->save();

        return response()->json([
            'id' => $email->id,
        ]);
    }

    public function getAmountOfOpenEmails(){
        $this->authorize('view', Email::class);

        return Email::whereEigenOpenstaand(Auth::user())->count();
    }
}