<?php

namespace App\Jobs\Email;


use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Helpers\Email\EmailHelper;
use App\Helpers\Settings\PortalSettings;
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
use Config;

class SendEmailsWithVariables implements ShouldQueue {

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $email;
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
    private $firstCall;

    public function __construct(Email $email, $tos, $userId, $firstCall = true) {
        $this->email = $email;
        $this->tos = $tos;
        $this->userId = $userId;
        $this->firstCall = $firstCall;

        // bij 1e call cc's en bcc's bewaren
        if ($firstCall) {
            $this->ccs = ($email->cc != []) ? $email->cc : null;
            $this->bccs = ($email->bcc != []) ? $email->bcc : null;

            $jobLog = new JobsLog();
            $jobLog->value = 'Start e-mail(s) versturen.';
            $jobLog->user_id = $userId;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
    }

    public function handle() {
        $this->validateRequest();

        $didFinishEmail = true;

        // Observer
        Auth::setUser(User::find($this->userId));

        $email = $this->email;
        $mailbox = $email->mailbox;

        (new EmailHelper())->setConfigToMailbox($mailbox);

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

        /**
         * If this is a following job in a batch, then CC's and BCC's are already sent.
         */
        $ccBccSent = !$this->firstCall;

        $amounfOfEmailsSend = 0;
        $mergedSubject = $email->subject;
        $saveSubject = $email->subject;
        $mergedHtmlBody = $email->html_body;
        $saveHtmlBody = $email->html_body;

        /**
         * Send emails to all emails when available.
         */
        if (!empty($emailsToEmailAddress)) {

            /**
             * Setup
             */
            $mail = Mail::to($emailsToEmailAddress);
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

                $email->subject = $subjectWithVariables;
            }

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
                $amounfOfEmailsSend++;

                if ($amounfOfEmailsSend === 1) {
                    $mergedSubject = $subjectWithVariables;
                    $mergedHtmlBody = $htmlBodyWithVariables;
                }

                $ccBccSent = true;
                $this->ccs = [];
                $this->bccs = [];
            } catch (\Exception $e) {
                Log::error('Mail ' . $email->id . '  naar e-mailadres kon niet worden verzonden');
                Log::error($e->getMessage());
                $jobLog = new JobsLog();
                $jobLog->value = 'Mail ' . $email->id . '  naar e-mailadres(sen) ' . implode(',', $emailsToEmailAddress) . ' kon niet worden verzonden';
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

                /**
                 * Setup
                 */
                $mail = Mail::to($emailToContact->email);
                $subjectWithContactVariables = 'Econobis';

                if (!$ccBccSent) {
                    ($this->ccs != []) ? $mail->cc($this->ccs) : null;
                    ($this->bccs != []) ? $mail->bcc($this->bccs) : null;
                    $ccBccSent = true;
                    $this->ccs = [];
                    $this->bccs = [];
                }

                /**
                 * Replace variables subject
                 */
                if (!empty($email->subject)) {
                    $subjectWithContactVariables = $email->subject;
                    $subjectWithContactVariables = str_replace('{contactpersoon}', $emailAddress->contact->full_name, $subjectWithContactVariables);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'contact', $emailAddress->contact);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'ik', Auth::user());
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'contacten_portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($subjectWithContactVariables, 'cooperatie');

                    if ($email->contactGroup) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'groep', $email->contactGroup);
                    }

                    $email->subject = $subjectWithContactVariables;
                }

                /**
                 * Replace variables body
                 */
                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
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
                    $amounfOfEmailsSend++;

                    if ($amounfOfEmailsSend === 1) {
                        $mergedSubject = $subjectWithContactVariables;
                        $mergedHtmlBody = $htmlBodyWithContactVariables;
                    }
                } catch (\Exception $e) {
                    Log::error('Mail ' . $email->id . ' naar contact kon niet worden verzonden');
                    Log::error($e->getMessage());
                    $jobLog = new JobsLog();
                    $jobLog->value = 'Mail ' . $email->id . '  naar e-mailadres ' . $emailToContact->email . ' kon niet worden verzonden';
                    $jobLog->user_id = $this->userId;
                    $jobLog->job_category_id = 'email';
                    $jobLog->save();
                }
            }
        }

        /**
         * Send emails to GroupContacts when available.
         *
         * We send a maximum amount each time to prevent timeouts.
         */
        $groupEmailAdresses = $email->groupEmailAddresses()
            ->limit(Config::get('queue.email.chunk_size'))
            ->get();

        if ($groupEmailAdresses) {
            foreach ($groupEmailAdresses as $emailAddress) {

                /**
                 * Setup
                 */
                $mail = Mail::to($emailAddress->email);
                $subjectWithContactVariables = 'Econobis';

                if (!$ccBccSent) {
                    if($this->ccs != []) $mail->cc($this->ccs);
                    if($this->bccs != []) $mail->bcc($this->bccs);
                    $ccBccSent = true;
                    $this->ccs = [];
                    $this->bccs = [];
                }

                /**
                 * Replace variables subject
                 */
                if (!empty($email->subject)) {
                    $subjectWithContactVariables = $email->subject;
                    $subjectWithContactVariables = str_replace('{contactpersoon}', $emailAddress->contact->full_name, $subjectWithContactVariables);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'contact', $emailAddress->contact);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'ik', Auth::user());
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables, 'contacten_portal');
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($subjectWithContactVariables, 'cooperatie');

                    if ($email->contactGroup) {
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'groep', $email->contactGroup);
                    }

                    $email->subject = $subjectWithContactVariables;
                }

                /**
                 * Replace body subject
                 */
                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables, 'portal');
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables, 'contacten_portal');
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables, 'cooperatie');

                if ($email->contactGroup) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'groep', $email->contactGroup);
                }

                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);

                /**
                 * Execute
                 */
                try {
                    $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
                    $amounfOfEmailsSend++;

                    /**
                     * With Group emails we won't save htmlbody with merged fields.
                     */
                    $mergedSubject = $saveSubject;
                    $mergedHtmlBody = $saveHtmlBody;

                } catch (\Exception $e) {
                    Log::error('Mail ' . $email->id . ' vanuit groep kon niet worden verzonden naar e-mailadres ' . $emailAddress->email);
                    Log::error($e->getMessage());
                    $jobLog = new JobsLog();
                    $jobLog->value = 'Mail ' . $email->id . ' vanuit groep kon niet worden verzonden naar e-mailadres ' . $emailAddress->email;
                    $jobLog->user_id = $this->userId;
                    $jobLog->job_category_id = 'email';
                    $jobLog->save();
                }

                /**
                 * Email always detach from table otherwise the jobs
                 * can stay in a loop when error occur in try/catch while sending.
                 */
                $email->groupEmailAddresses()->detach($emailAddress->id);
            }

            /**
             * Check if there are more Group email address to send to.
             *
             * Create a new Job to pick these up.
             */
            if ($email->groupEmailAddresses()->exists()) {
                $didFinishEmail = false;
                self::dispatch($email, [], $this->userId, false);
            }
        }

        if ($didFinishEmail) {
            $email->subject = $mergedSubject;
            $email->html_body = $mergedHtmlBody;
            $email->date_sent = new Carbon();
            $email->folder = 'sent';
            $email->save();

            $jobLog = new JobsLog();
            $jobLog->value = 'E-mail(s) verstuurd: didFinish.';
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
    }

    public function failed(\Exception $exception) {
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