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
            ->orderBy('date_sent', 'desc')->get();

        $emails->load('mailbox');

        return GridEmail::collection($emails);
    }

    public function show(Email $email){
        $email->load('contact', 'attachments');

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

    public function associateContact(Email $email, Contact $contact)
    {
        $email->contact()->associate($contact);
        $email->save();
    }

    public function send(Mailbox $mailbox, Request $request)
    {
        //get attachments
        $attachments = $request->file('attachments') ? $request->file('attachments') : [];

        //Get all basic mail info
        $data = $request->validate([
            'to' => 'required',
            'cc' => '',
            'bcc' => '',
            'subject' => 'string',
            'htmlBody' => 'required|string',
        ]);

        $data['to'] = json_decode($data['to']);
        $data['cc'] = json_decode($data['cc']);
        $data['bcc'] = json_decode($data['bcc']);
        //get emails by contact_id
        $emails = [];

        $sendVariations = ['to'];
        if ($data['cc'] != '') {
            array_push($sendVariations, 'cc');
        }
        else{
            $emails['cc'][0] = '';
        }
        if ($data['bcc'] != '') {
            array_push($sendVariations, 'bcc');
        }
        else{
            $emails['bcc'][0] = '';
        }

        foreach ($sendVariations as $sendVariation){
            foreach ($data[$sendVariation] as $emailData) {
                if (is_numeric($emailData)){
                    $emails[$sendVariation][] =  Contact::find($emailData)->primaryEmailAddress()->value('email');
                }
                else{
                    $emails[$sendVariation][] = $emailData;
                }}
        }

        $santizedData = [
            'to' => $emails['to'],
            'cc' => $emails['cc'],
            'bcc' => $emails['bcc'],
            'subject' => array_key_exists('subject', $data) ? $data['subject'] : 'Econobis',
            'html_body' => $data['htmlBody'],
        ];
        $email = (new StoreConceptEmail($mailbox, $santizedData))->handle();

        //Email attachments
        //Check if storage map exists
        $storageDir = Storage::disk('mail_attachments')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'mailbox_' . $mailbox->id . DIRECTORY_SEPARATOR . 'outbox';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }

        //store attachments
        foreach ($attachments as $attachment) {
            if(!$attachment->isValid()) abort('422', 'Error uploading file');
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

    public function download(EmailAttachment $emailAttachment)
    {
        $filePath = Storage::disk('mail_attachments')->getDriver()->getAdapter()->applyPathPrefix($emailAttachment->filename);

        return response()->download($filePath, $emailAttachment->name);
    }

}