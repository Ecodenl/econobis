<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class EmailGenericController extends Controller
{
    public function __construct()
    {
        $this->middleware(ConvertEmptyStringsToNull::class);
    }

    public function update(Email $email, Request $request)
    {
        $this->authorize('view', Email::class);
        $this->checkMailboxAutorized($email->mailbox_id);

        $data = $request->validate([
            'status' => ['sometimes', 'required', 'string'],
            'responsibleUserId' => ['nullable', 'exists:users,id'],
            'responsibleTeamId' => ['nullable', 'exists:teams,id'],
            'intakeId' => ['nullable', 'exists:intakes,id'],
            'taskId' => ['nullable', 'exists:tasks,id'],
            'quotationRequestId' => ['nullable', 'exists:quotation_requests,id'],
            'measureId' => ['nullable', 'exists:measures,id'],
            'opportunityId' => ['nullable', 'exists:opportunities,id'],
            'orderId' => ['nullable', 'exists:orders,id'],
            'invoiceId' => ['nullable', 'exists:invoices,id'],
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