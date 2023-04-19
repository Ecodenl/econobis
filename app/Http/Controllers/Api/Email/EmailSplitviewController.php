<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\Email\SplitviewSelectlistEmail;
use Illuminate\Http\Request;
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

        $mails = $query->with('attachmentsWithoutCids')->get();

        return response()->json([
            'items' => $mails->map(function (Email $mail) {
                return [
                    'id' => $mail->id,
                    'date' => $mail->date_sent,
                    'from' => $mail->from,
                    'subject' => $mail->subject,
                    'status' => $mail->status,
                    'hasAttachmentsWithoutCids' => $mail->attachmentsWithoutCids->isNotEmpty(),
                ];
            }),
            'total' => $query->count()
        ]);
    }

    public function show(Email $email)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $email->load('contacts', 'attachments', 'closedBy', 'removedBy', 'intake', 'task', 'quotationRequest', 'measure', 'opportunity', 'order', 'invoice', 'responsibleUser',
            'responsibleTeam');

        return FullEmail::make($email);
    }

    protected function checkMailboxAutorized($mailboxId): void
    {
        if (!Auth::user()->mailboxes()->where('mailboxes.id', $mailboxId)->exists()) {
            abort(403, 'Niet geautoriseerd.');
        }
    }
}