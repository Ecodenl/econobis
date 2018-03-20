<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Eco\Email\Jobs;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\User\User;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
use Config;
use Illuminate\Support\Facades\Auth;
use Mail;

class SendEmailsWithVariables
{

    /**
     * @var Email
     */
    private $email;

    public function __construct(Email $email, $tos)
    {
        $this->email = $email;
        $this->tos = $tos;
    }

    public function handle()
    {
        $this->validateRequest();

        $config = Config::get('mail');

        $email = $this->email;
        $mailbox = $email->mailbox;

        $config['driver'] = 'smtp';
        $config['host'] = $mailbox->smtp_host;
        $config['port'] = $mailbox->smtp_port;
        $config['from'] = ['address' => $mailbox->email, 'name' => $mailbox->name];
        $config['encryption'] = $mailbox->smtp_encryption;
        $config['username'] = $mailbox->username;
        $config['password'] = $mailbox->password;

        Config::set('mail', $config);

        //First see if the to's are contact, user or created option
        $emailsToContact = [];
        $emailsToUser = [];
        $emailsToEmailAddress = [];
        $tos = $this->tos;

        foreach ($tos as $to) {
            if (is_numeric($to)) {
                $contact = Contact::find($to);
                $contact->load('primaryEmailAddress');
                if($contact->primaryEmailAddress) {
                    $emailsToContact[] = $contact;
                }
            } elseif (substr($to, 0, 6) === "@user_") {
                $user_id = str_replace("@user_", "", $to);
                $emailsToUser[] = User::find($user_id);
            } else {
                $emailsToEmailAddress[] = $to;
            }
        }
        $ccBccSent = false;

        //First send emails to all emails
        if(!empty($emailsToEmailAddress)){
            $mail = Mail::to($emailsToEmailAddress);

            ($email->cc != []) ? $mail->cc($email->cc) : null;
            ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
            $htmlBodyWithVariables = TemplateVariableHelper::replaceTemplateVariables($email->html_body, 'ik', Auth::user());
            $htmlBodyWithVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithVariables);
            $mail->send(new GenericMail($email, $htmlBodyWithVariables));
            $ccBccSent = true;
        }

        //Send mail to all contacts
        if(!empty($emailsToContact)){
            foreach($emailsToContact as $emailToContact) {
                $mail = Mail::to($emailToContact->primaryEmailAddress->email);
                if (!$ccBccSent) {
                    ($email->cc != []) ? $mail->cc($email->cc) : null;
                    ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
                    $ccBccSent = true;
                } else {
                    $email->cc = [];
                    $email->bcc = [];
                }
                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailToContact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact' ,$emailToContact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                if($email->quotationRequest){
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'offerteverzoek', $email->quotationRequest);
                }
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
            }
        }


        //Send mail to all users
        if(!empty($emailsToUser)){
            foreach($emailsToUser as $emailToUser) {
                $mail = Mail::to($emailToUser->email);
                if (!$ccBccSent) {
                    ($email->cc != []) ? $mail->cc($email->cc) : null;
                    ($email->bcc != []) ? $mail->bcc($email->bcc) : null;
                } else {
                    $email->cc = [];
                    $email->bcc = [];
                }

                $htmlBodyWithUserVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailToUser);
                $htmlBodyWithUserVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithUserVariables, 'gebruiker' ,$emailToUser);
                $htmlBodyWithUserVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithUserVariables, 'ik', Auth::user());
                $htmlBodyWithUserVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithUserVariables);

                $mail->send(new GenericMail($email, $htmlBodyWithUserVariables));
            }
        }

        $email->date_sent = new Carbon();
        $email->folder = 'sent';
        $email->save();
    }

    private function validateRequest()
    {
        if($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }
}