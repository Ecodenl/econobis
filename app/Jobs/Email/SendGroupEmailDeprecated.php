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
use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Mail;

/**
 * @deprecated
 */
class SendGroupEmailDeprecated implements ShouldQueue {

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $email;
    private $errors = 0;
    private $extraEmailTos;
    private $userId;

    /**
     * Variabele om te bepalen of dit de eerste aanroep
     * is of een opvolgende van een batch.
     *
     * @var bool
     */
    private $firstCall;

    public function __construct(Email $email, $tos, $userId, $firstCall = true) {
        $this->firstCall = $firstCall;
        $this->email = $email;
        $this->userId = $userId;
        $this->extraEmailTos = $tos;

        if ($firstCall) {
            $jobLog = new JobsLog();
            $jobLog->value = 'Start e-mail(s) versturen.';
            $jobLog->user_id = $userId;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
    }

    public function handle() {
        $this->validateRequest();

        $didFinishGroupEmailAddresses = true;

        // Observer
        Auth::setUser(User::find($this->userId));

        $email = $this->email;
        $saveSubject = $email->subject;
        $mailbox = $email->mailbox;

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
                $mail = Mail::fromMailbox($mailbox)
                    ->to($emailAddress->email);
                $subjectWithContactVariables = 'Econobis';

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
                }

                $email->subject = $subjectWithContactVariables;

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
                } catch (\Exception $e) {
                    Log::error('Mail ' . $email->id . ' vanuit groep kon niet worden verzonden naar e-mailadres ' . $emailAddress->email);
                    Log::error($e->getMessage());
                    $jobLog = new JobsLog();
                    $jobLog->value = 'Mail ' . $email->id . ' vanuit groep kon niet worden verzonden naar e-mailadres ' . $emailAddress->email;
                    $this->errors++;
                    $jobLog->user_id = $this->userId;
                    $jobLog->job_category_id = 'email';
                    $jobLog->save();
                }

                /**
                 * Email always detach from table otherwise the jobs
                 * can stay in a loop when error occur in try/catch while sending.
                 */
                $email->groupEmailAddresses()->detach($emailAddress->id);
                $email->subject = $saveSubject;
            }

            /**
             * Check if there are more Group email address to send to.
             *
             * Create a new Job to pick these up.
             */
            if ($email->groupEmailAddresses()->exists()) {
                $didFinishGroupEmailAddresses = false;

                self::dispatch($email, $this->extraEmailTos, $this->userId, false);
            }

        }

        if ($didFinishGroupEmailAddresses) {
            if (!empty($this->extraEmailTos)) {
                $this->sendToExtracontacten();
            }

            // originele subject en html_body weer terugzetten voor opslaan email.
            $email->subject = $saveSubject;
            $email->html_body = $this->email->html_body;
            $email->date_sent = new Carbon();
            $email->folder = 'sent';
            $email->save();

            $jobLog = new JobsLog();
            $jobLog->value = 'E-mail(s) versturen klaar.' . ($this->errors > 0 ? ' (met fouten)' : '');
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
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

    protected function sendToExtracontacten(): void
    {
        $emailsToContact = [];
        $emailsToEmailAddress = [];
        $extraEmailTos = $this->extraEmailTos;
        $saveSubject = $this->email->subject;

        foreach ($extraEmailTos as $to) {
            if (is_numeric($to)) {
                $emailsToContact[] = EmailAddress::find($to);
            } else {
                $emailsToEmailAddress[] = $to;
            }
        }

        /**
         * Send emails to all emails when available.
         */
        if (!empty($emailsToEmailAddress)) {

            foreach ($emailsToEmailAddress as $emailToEmailAddress) {
                /**
                 * Setup
                 */
                $email = $this->email;
                $mail = Mail::fromMailbox($email->mailbox)
                    ->to($emailToEmailAddress);
                $subjectWithVariables = 'Econobis';

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

                $this->email->subject = $saveSubject;
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
                $email = $this->email;
                $mail = Mail::fromMailbox($email->mailbox)
                    ->to($emailToContact->email);
                $subjectWithContactVariables = 'Econobis';

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
                        $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'kansactie', $email->quotationRequest);
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
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'kansactie', $email->quotationRequest);
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
                } catch (\Exception $e) {
                    Log::error('Mail ' . $email->id . ' naar e-mailadres ' . $emailToContact->email . ' kon niet worden verzonden');
                    Log::error($e->getMessage());
                    $jobLog = new JobsLog();
                    $jobLog->value = 'Mail ' . $email->id . ' naar e-mailadres ' . $emailToContact->email . ' kon niet worden verzonden';
                    $this->errors++;
                    $jobLog->user_id = $this->userId;
                    $jobLog->job_category_id = 'email';
                    $jobLog->save();
                }
                $this->email->subject = $saveSubject;
            }
        }
    }
}