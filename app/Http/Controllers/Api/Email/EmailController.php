<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:32
 */

namespace App\Http\Controllers\Api\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\Email\EmailAttachment;
use App\Eco\Email\Jobs\SendEmail;
use App\Eco\Email\Jobs\StoreConceptEmail;
use App\Eco\Mailbox\Mailbox;
use App\Eco\User\User;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Resources\Email\FullEmail;
use App\Http\Resources\Email\GridEmail;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EmailController
{

    public function grid($folder)
    {
        $emails = Email::whereFolder($folder)
            ->get();

        $emails->load('mailbox');

        return GridEmail::collection($emails);
    }

    public function show(Email $email){
        return FullEmail::make($email);
    }

    public function update(Email $email, RequestInput $input)
    {
        $data = $input->string('contactId')->validate('exists:contacts,id')->alias('contact_id')->next()
            ->get();

        $email->fill($data);

        $email->save();

        return FullEmail::make($email);
    }

    public function send(Mailbox $mailbox, RequestInput $input, Request $request)
    {
        //Get all basic mail info
        $data = $input
            ->string('to')->next()
            ->string('cc')->whenMissing('')->onEmpty('')->next()
            ->string('bcc')->whenMissing('')->onEmpty('')->next()
            ->string('subject')->whenMissing('Econobis')->onEmpty('Econobis')->next()
            ->string('htmlBody')->whenMissing('')->onEmpty('')->alias('html_body')->next()
            ->get();

        $email = (new StoreConceptEmail($mailbox, $data))->handle();

        //Email attachments
        //Check if storage map exists
        $storageDir = Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . 'outbox';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }

        //get attachments
        $attachments = $request->file('files');

        //store attachments
        foreach ($attachments as $attachment) {

            $filename = $attachment->store('mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . 'outbox', 'mail_attachments');

            $emailAttachment = new EmailAttachment([
                'filename' => $filename,
                'name' => $attachment->getClientOriginalName(),
                'email_id' => $email->id,
            ]);
            $emailAttachment->save();
        }

        (new SendEmail($email))->handle();
    }

    public function storeConcept(Mailbox $mailbox, RequestInput $input, Request $request)
    {
        //Get all basic mail info
        $data = $input
            ->string('to')->next()
            ->string('cc')->whenMissing('')->onEmpty('')->next()
            ->string('bcc')->whenMissing('')->onEmpty('')->next()
            ->string('subject')->whenMissing('Econobis')->onEmpty('Econobis')->next()
            ->string('htmlBody')->whenMissing('')->onEmpty('')->alias('html_body')->next()
            ->get();

        $email = (new StoreConceptEmail($mailbox, $data))->handle();

        //Email attachments
        //Check if storage map exists
        $storageDir = Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . 'outbox';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }

        //get attachments
        $attachments = $request->file('files');

        //store attachments
        foreach ($attachments as $attachment) {

            $filename = $attachment->store('mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . 'outbox', 'mail_attachments');

            $emailAttachment = new EmailAttachment([
                'filename' => $filename,
                'name' => $attachment->getClientOriginalName(),
                'email_id' => $email->id,
            ]);
            $emailAttachment->save();
        }
    }

    public function peek(){
        $contacts = Contact::select('id', 'full_name')->with('primaryEmailAddress')->get();
//        $users = User::select('id', 'email', 'first_name', 'last_name')->with('lastNamePrefix')->get();

        foreach($contacts as $contact){
            if($contact->primaryEmailAddress) {
                $people[] = [
                    'id' => $contact->id,
                    'name' => $contact->full_name . ' (' . $contact->primaryEmailAddress->email . ')' ,
                    'email' => $contact->primaryEmailAddress->email
                ];
            }
        }

//        foreach($users as $user){
//            $people[] = [
//                'id' => $user->id,
//                'name' => $user->present()->fullName() . ' (' . $user->email . ')',
//                'email' =>
//            ];
//        }

        return $people;
    }
}