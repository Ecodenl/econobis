<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JosKolenberg\LaravelJory\Facades\Jory;

class EmailSplitviewController extends Controller
{
    public function selectList(Request $request)
    {
        $this->authorize('view', Email::class);

        $baseQuery = Email::whereAuthorized(Auth::user());

        $query = Jory::on($baseQuery)
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
                    'hasAttachments' => $mail->attachmentsWithoutCids->isNotEmpty(),
                    'responsibleName' => $mail->getResponsibleName(),
                    'mailbox' => [
                        'name' => $mail->mailbox->name,
                    ],
                ];
            }),
            'total' => $query->count()
        ]);
    }

    public function show(Email $email)
    {
        $this->authorize('manage', $email);

        return response()->json([
            'id' => $email->id,
            'status' => $email->status,
            'attachments' => $email->attachmentsWithoutCids,
            'responsibleUserId' => $email->responsible_user_id,
            'responsibleTeamId' => $email->responsible_team_id,
            'contacts' => $email->contacts->map(function (Contact $contact) {
                return [
                    'id' => $contact->id,
                    'fullName' => $contact->full_name,
                ];
            }),
            'toAddresses' => $email->getToRecipients()->toReactArray(),
            'ccAddresses' => $email->getCcRecipients()->toReactArray(),
            'htmlBodyWithEmbeddedImages' => $email->inlineImagesService()->getHtmlBodyWithCidsConvertedToEmbeddedImages(),
            'folder' => $email->folder,
            'note' => $email->note,
        ]);
    }
}