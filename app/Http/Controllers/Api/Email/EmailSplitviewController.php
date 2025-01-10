<?php

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Log;
use JosKolenberg\LaravelJory\Facades\Jory;

class EmailSplitviewController extends Controller
{
    public function selectList(Request $request)
    {
        $this->authorize('view', Email::class);

        $query = Jory::on(Email::class) // Emails worden al uitgefilterd obv autorisatie in EmailJoryResource
            ->apply($request->input('jory'))
            ->getJoryBuilder()
            ->buildQuery();

        $mails = $query->get();

        $mails->load([
            'attachmentsWithoutCids',
            'responsibleUser',
            'responsibleTeam',
            'mailbox',
            'sentByUser',
        ]);
//        \DB::enableQueryLog();
//        Log::info($query->count());
//        Log::info(\DB::getQueryLog());


        return response()->json([
            'items' => $mails->map(function (Email $mail) {
                return [
                    'id' => $mail->id,
                    'date' => $mail->date_sent,
                    'from' => $mail->from,
                    'to' => $mail->getToRecipients()->getEmailAdresses(),
                    'subject' => $mail->subject,
                    'status' => $mail->status,
                    'hasAttachments' => $mail->attachmentsWithoutCids->isNotEmpty(),
                    'responsibleName' => $mail->getResponsibleName(),
                    'mailbox' => [
                        'name' => $mail->mailbox->name,
                    ],
                    'folder' => $mail->folder,
                    'createdAt' => $mail->created_at,
                    'sentByUserName' => $mail->sentByUser ? $mail->sentByUser->present()->fullName() : '',
                ];
            }),
            'total' => 0 // tijdelijk even geen $query->count() doen i.v.m. performance
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
            'manualContacts' => $email->manualContacts->map(function (Contact $contact) {
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
            'contactGroup' => $email->contactGroup ? [
                'id' => $email->contactGroup->id,
                'name' => $email->contactGroup->name,
            ] : null,
        ]);
    }
}