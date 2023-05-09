<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\Facades\Jory;

class EmailSplitviewController extends Controller
{
    public function selectList(Request $request)
    {
        $this->authorize('view', Email::class);

        $query = Jory::on(Email::class)
            ->apply($request->input('jory'))
            ->getJoryBuilder()
            ->buildQuery();

        $mails = $query->with([
            'attachmentsWithoutCids',
            'responsibleUser',
            'responsibleTeam',
        ])->get();

        return response()->json([
            'items' => $mails->map(function (Email $mail) {
                return [
                    'id' => $mail->id,
                    'date' => $mail->date_sent,
                    'from' => $mail->from,
                    'subject' => $mail->subject,
                    'status' => $mail->status,
                    'hasAttachmentsWithoutCids' => $mail->attachmentsWithoutCids->isNotEmpty(),
                    'responsibleName' => $mail->getResponsibleName(),
                ];
            }),
            'total' => $query->count()
        ]);
    }

    public function show(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        return response()->json([
            'id' => $email->id,
            'status' => $email->status,
            'attachmentsWithoutCids' => $email->attachmentsWithoutCids,
            'responsibleUserId' => $email->responsible_user_id,
            'responsibleTeamId' => $email->responsible_team_id,
            'contacts' => $email->contacts->map(function (Contact $contact) {
                return [
                    'id' => $contact->id,
                    'fullName' => $contact->full_name,
                ];
            }),
            'ccAddresses' => $email->getCcAddresses(),
            'htmlBodyWithEmbeddedImages' => $email->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
        ]);
    }

    public function update(Email $email, Request $request)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $data = $request->validate([
            'status' => ['sometimes', 'required', 'string'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
        ]);

        $email->update(Arr::keysToSnakeCase($data));
    }

    public function deleteMultiple(Request $request)
    {
        $this->authorize('view', Email::class);

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:emails,id'],
        ]);

        $emails = Email::whereIn('id', $request->input('ids'))->get();

        foreach ($emails->pluck('mailbox_id')->unique() as $mailBoxId) {
            $this->checkMailboxAutorized($mailBoxId);
        }

        foreach ($emails as $email) {
            $email->delete();
        }
    }

    public function updateMultiple(Request $request)
    {
        $this->authorize('view', Email::class);

        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:emails,id'],
        ]);

        $emails = Email::whereIn('id', $request->input('ids'))->get();

        foreach ($emails->pluck('mailbox_id')->unique() as $mailBoxId) {
            $this->checkMailboxAutorized($mailBoxId);
        }

        $data = $request->validate([
            'status' => ['sometimes', 'required', 'string'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
        ]);

        foreach ($emails as $email){
            $email->update(Arr::keysToSnakeCase($data));
        }
    }

    public function storeReply(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $reply = $email->generator()->reply();

        return response()->json([
            'id' => $reply->id,
        ]);
    }

    public function storeReplyAll(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $reply = $email->generator()->replyAll();

        return response()->json([
            'id' => $reply->id,
        ]);
    }

    public function storeForward(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $forward = $email->generator()->forward();

        return response()->json([
            'id' => $forward->id,
        ]);
    }

    protected function checkMailboxAutorized($mailboxId): void
    {
        if (!Auth::user()->mailboxes()->where('mailboxes.id', $mailboxId)->exists()) {
            abort(403, 'Niet geautoriseerd.');
        }
    }
}