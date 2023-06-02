<?php

namespace App\Jobs\Email;


use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Mail;

class SendEmailsWithVariables implements ShouldQueue
{

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Email $email;

    private User $user;

    private int $errors = 0;

    public function __construct(Email $email, User $user)
    {
        $this->email = $email;
        $this->user = $user;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function handle()
    {
        $this->validateRequest();

        $to = $this->email->getToRecipients();

        $sendToSingleContact = $to->hasSingleContact();
        $emailAddresModel = $sendToSingleContact ? $to->first()->getEmailAddressModel() : null;

        $email = $this->email;

        /**
         * Replace variables subject
         */
        $email->subject = $email->subject ?: 'Econobis';
        $email->subject = $this->replaceDefaultVariables($email->subject);
        if($sendToSingleContact){
            $email->subject = $this->replaceContactVariables($email->subject, $emailAddresModel->contact);
        }

        /**
         * Replace variables body
         */
        $email->html_body = $this->replaceDefaultVariables($email->html_body);
        if($sendToSingleContact){
            $email->html_body = $this->replaceContactVariables($email->html_body, $emailAddresModel->contact);
        }
        $email->html_body = TemplateVariableHelper::stripRemainingVariableTags($email->html_body);

        $email->date_sent = new Carbon();
        $email->folder = 'sent';
        $email->save();

        try {
            (new EmailHelper())->setConfigToMailbox($email->mailbox);

            if($sendToSingleContact){
                $mailManager = Mail::to($emailAddresModel->email);
            }else{
                $mailManager = Mail::to($email->getToRecipients()->getEmailAdresses()->toArray());
            }

            $mailManager->cc($email->getCcRecipients()->getEmailAdresses()->toArray())
                ->bcc($email->getBccRecipients()->getEmailAdresses()->toArray())
                ->send(new GenericMail($email, $email->html_body, null));
        } catch (\Exception $e) {
            Log::error('Mail ' . $email->id . ' naar ' . ($sendToSingleContact ? 'contact' : 'e-mailadres') . ' kon niet worden verzonden');
            Log::error($e->getMessage());

            $jobLog = new JobsLog();
            $jobLog->value = 'Mail ' . $email->id . '  naar e-mailadres(sen) ' ($sendToSingleContact ? $emailAddresModel->email : $to->getEmailAdresses()->implode(', ')) . ' kon niet worden verzonden';
            $this->errors++;
            $jobLog->user_id = $this->user->id;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen klaar.' . ($this->errors > 0 ? ' (met fouten)' : '');
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function failed($exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen mislukt.';
        $jobLog->user_id = $this->user->id;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        Log::error('E-mail maken mislukt:' . $exception->getMessage());
    }

    private function validateRequest()
    {
        if ($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }

    private function replaceDefaultVariables(string $string): string
    {
        $string = TemplateVariableHelper::replaceTemplateVariables($string, 'ik', $this->user);
        if ($this->email->contactGroup) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'groep', $this->email->contactGroup);
        }

        return $string;
    }

    private function replaceContactVariables(string $string, Contact $contact): string
    {
        $email = $this->email;

        $string = str_replace('{contactpersoon}', $contact->full_name, $string);
        $string = TemplateVariableHelper::replaceTemplateVariables($string, 'contact', $contact);
        $string = TemplateVariableHelper::replaceTemplatePortalVariables($string, 'portal');
        $string = TemplateVariableHelper::replaceTemplatePortalVariables($string, 'contacten_portal');
        $string = TemplateVariableHelper::replaceTemplateCooperativeVariables($string, 'cooperatie');

        if ($email->intake) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'intake', $email->intake);
        }
        if ($email->task) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'taak', $email->task);
        }
        if ($email->quotationRequest) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'offerteverzoek', $email->quotationRequest);
        }
        if ($email->opportunity) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'kans', $email->opportunity);
            if ($email->opportunity->intake) {
                $string = TemplateVariableHelper::replaceTemplateVariables($string, 'intake',
                    $email->opportunity->intake);
                if ($email->opportunity->intake->campaign) {
                    $string = TemplateVariableHelper::replaceTemplateVariables($string, 'campagne',
                        $email->opportunity->intake->campaign);
                }
            }
        }
        if ($email->contactGroup) {
            $string = TemplateVariableHelper::replaceTemplateVariables($string, 'groep', $email->contactGroup);
        }

        return $string;
    }
}