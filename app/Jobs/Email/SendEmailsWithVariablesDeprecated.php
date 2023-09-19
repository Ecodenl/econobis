<?php

namespace App\Jobs\Email;


use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Template\TemplateTableHelper;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Resources\Email\Templates\GenericMail;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Mail;

/**
 * @deprecated replaced by SendEmailsWithVariables
 */
class SendEmailsWithVariablesDeprecated implements ShouldQueue {

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $email;
    private $errors = 0;
    private $tos;
    private $ccs;
    private $bccs;
    private $userId;

    /**
     * Variabele om te bepalen of dit de eerste aanroep
     * is of een opvolgende van een batch.
     *
     * @var bool
     */

    public function __construct(Email $email, $tos, $userId) {
        $this->email = $email;
        $this->tos = $tos;
        $this->ccs = $email->cc;
        $this->bccs = $email->bcc;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start e-mail(s) versturen.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function handle() {
        $this->validateRequest();

        // Observer
        Auth::setUser(User::find($this->userId));

        $email = $this->email;
        $mailbox = $email->mailbox;

        $emailsToContact = [];
        $emailsToEmailAddress = [];
        $tos = $this->tos;

        /**
         * Bij emailsToContact werd per contact een aparte email gemaakt
         * Ze willen nu altijd alle Aan's bij elkaar in 1 email.
         * In dat geval (meerdere Aan's, is de email niet persoonlijk en kunnen dus ook contact mergevelden niet gebruikt worden
         * Dat willen ze wel behouden als de email voor 1 contact bestemd is.
         */
        if (!empty($tos)) {
            if (count($tos) == 1 && is_numeric($tos[0])) {
                $emailAddress = EmailAddress::find($tos[0]);
                $emailsToContact[] = $emailAddress;
            } else {
                foreach ($tos as $to) {
                    if (is_numeric($to)) {
                        $emailAddress = EmailAddress::find($to);
                        $emailsToEmailAddress[] = $emailAddress->email;
                    } else {
                        $emailsToEmailAddress[] = $to;
                    }
                }
            }
        }

        $amountOfEmailsSend = 0;
        $mergedSubject = $email->subject;
        $mergedHtmlBody = $email->html_body;

        /**
         * Send emails to all emails when available.
         */
        if (!empty($emailsToEmailAddress)) {

            /**
             * Setup
             */
            $mail = Mail::fromMailbox($mailbox)
                ->to($emailsToEmailAddress);
            $subjectWithVariables = 'Econobis';

            if($this->ccs != []) $mail->cc($this->ccs);
            if($this->bccs != []) $mail->bcc($this->bccs);

            /**
             * Replace variables subject
             */
            if (!empty($email->subject)) {
                $subjectWithVariables = $email->subject;
                $subjectWithVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithVariables, 'ik', Auth::user());

                if ($email->contactGroup) {
                    $subjectWithVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithVariables, 'groep', $email->contactGroup);
                }
            }

            $email->subject = $subjectWithVariables;

            /**
             * Replace variables body
             */
            $htmlBodyWithVariables = TemplateVariableHelper::replaceTemplateVariables($email->html_body, 'ik', Auth::user());

            if ($email->contactGroup) {
                $htmlBodyWithVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithVariables, 'groep', $email->contactGroup);
            }
            $htmlBodyWithVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithVariables);

            try {
                $mail->send(new GenericMail($email, $htmlBodyWithVariables));
                $amountOfEmailsSend++;

                if ($amountOfEmailsSend === 1) {
                    $mergedSubject = $subjectWithVariables;
                    $mergedHtmlBody = $htmlBodyWithVariables;
                }

            } catch (\Exception $e) {
                $value = 'Mail ' . $email->id . ' kon niet worden verzonden naar e-mailadres(sen) ' . implode(',', $emailsToEmailAddress);
                Log::error($value);
                Log::error($e->getMessage());
                $jobLog = new JobsLog();
                $jobLog->value = strlen($value)>191 ? (substr($value,0,188) . '...') : $value;
                $this->errors++;
                $jobLog->user_id = $this->userId;
                $jobLog->job_category_id = 'email';
                $jobLog->save();
            }
        }

        /**
         * Send emails to all contacts when available.
         */
        if (!empty($emailsToContact)) {
            foreach ($emailsToContact as $emailToContact) {

                $mail = Mail::fromMailbox($email->mailbox)
                    ->to($emailToContact->email);
                $subjectWithContactVariables = 'Econobis';

                if($this->ccs != []) $mail->cc($this->ccs);
                if($this->bccs != []) $mail->bcc($this->bccs);

                /**
                 * Replace variables subject
                 */
                if (!empty($email->subject)) {
                    $subjectWithContactVariables = $email->subject;
                    $subjectWithContactVariables = str_replace('{contactpersoon}', $emailToContact->contact->full_name, $subjectWithContactVariables);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'contact', $emailToContact->contact);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'ik', Auth::user());
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'contacten_portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($subjectWithContactVariables, 'cooperatie');

                    if ($email->intake) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'intake', $email->intake);
                    }
                    if ($email->task) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'taak', $email->task);
                    }
                    if ($email->quotationRequest) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'offerteverzoek', $email->quotationRequest);
                    }
                    if ($email->opportunity) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'kans', $email->opportunity);
                        if ($email->opportunity->intake) {
                            $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'intake',
                                $email->opportunity->intake);
                            if ($email->opportunity->intake->campaign) {
                                $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'campagne',
                                    $email->opportunity->intake->campaign);
                            }
                        }
                    }
                    if ($email->contactGroup) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'groep', $email->contactGroup);
                    }
                }

                $email->subject = $subjectWithContactVariables;

                /**
                 * Replace variables body
                 */
                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailToContact->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailToContact->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables, 'portal');
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables, 'contacten_portal');
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables, 'cooperatie');

                if ($email->intake) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'intake', $email->intake);
                }
                if ($email->task) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'taak', $email->task);
                }
                if ($email->quotationRequest) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'offerteverzoek', $email->quotationRequest);
                }
                if ($email->opportunity) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'kans', $email->opportunity);
                    if ($email->opportunity->intake) {
                        $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'intake',
                            $email->opportunity->intake);
                        if ($email->opportunity->intake->campaign) {
                            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'campagne',
                                $email->opportunity->intake->campaign);
                        }
                    }
                }
                if ($email->contactGroup) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'groep', $email->contactGroup);
                }

                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                /**
                 * Execute
                 */
                try {
                    $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
                    $amountOfEmailsSend++;

                    if ($amountOfEmailsSend === 1) {
                        $mergedSubject = $subjectWithContactVariables;
                        $mergedHtmlBody = $htmlBodyWithContactVariables;
                    }
                } catch (\Exception $e) {
                    $value = 'Mail ' . $email->id . ' kon niet worden verzonden naar e-mailadres ' . $emailToContact->email;
                    Log::error($value);
                    Log::error($e->getMessage());
                    $jobLog = new JobsLog();
                    $jobLog->value = strlen($value)>191 ? (substr($value,0,188) . '...') : $value;
                    $this->errors++;
                    $jobLog->user_id = $this->userId;
                    $jobLog->job_category_id = 'email';
                    $jobLog->save();
                }
            }
        }

        $email->subject = $mergedSubject;
        $email->html_body = $mergedHtmlBody;
        $email->date_sent = new Carbon();
        $email->folder = 'sent';
        $email->save();

        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen klaar.' . ($this->errors > 0 ? ' (met fouten)' : '');
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'email';
        $jobLog->save();
    }

    public function failed(\Throwable $exception) {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        Log::error('E-mail maken mislukt:' . $exception->getMessage());
    }

    private function validateRequest() {
        if ($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }
}