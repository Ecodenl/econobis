<?php

namespace App\Jobs\Email;


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

class SendEmailsWithVariables implements ShouldQueue
{
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

    public function __construct(Email $email, $tos, $userId, $firstCall = true)
    {
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

    public function handle()
    {
        $this->validateRequest();

        // Variabele om vast te leggen of een email helemaal is verwerkt
        // Groupsmails worden in chunks verzonden, als een mail nog niet helemaal is verwerkt
        // kan deze variabele op false worden gezet zodat de mail niet naar "verzonden" wordt verplaatst.
        $didFinishEmail = true;

        //user voor observer
        Auth::setUser(User::find($this->userId));

        $email = $this->email;

        $mailbox = $email->mailbox;

        (new EmailHelper())->setConfigToMailbox($mailbox);

        //First see if the to's are contact, user or created option
        $emailsToContact = [];
        $emailsToEmailAddress = [];
        $tos = $this->tos;

// Bij emailsToContact werd per contact een aparte email gemaakt
// Ze willen nu altijd alle Aan's bij elkaar in 1 email.
// In dat geval (meerdere Aan's, is de email niet persoonlijk en kunnen dus ook contact mergevelden niet gebruikt worden
// Dat willen ze wel behouden als de email voor 1 contact bestemd is.
        if(count($tos) == 1 && is_numeric($tos[0])){
            $emailAddress = EmailAddress::find($tos[0]);
            $emailsToContact[] = $emailAddress;
        }else{
            foreach ($tos as $to) {
                if (is_numeric($to)) {
                    $emailAddress = EmailAddress::find($to);
//                    $emailsToContact[] = $emailAddress;
                    $emailsToEmailAddress[] = $emailAddress->email;
                } elseif (substr($to, 0, 7) === "@group_") {
                    //niets doen nog
                } else {
                    $emailsToEmailAddress[] = $to;
                }
            }
        }

        // Als dit een volgende aanroep in een batch is zijn de cc's  en bcc's al verzonden
        $ccBccSent = !$this->firstCall;

        $amounfOfEmailsSend = 0;
        $mergedSubject = $email->subject;
        $saveSubject = $email->subject;
        $mergedHtmlBody = $email->html_body;
        $saveHtmlBody = $email->html_body;

        //First send emails to all emails
        if (!empty($emailsToEmailAddress)) {
            $mail = Mail::to($emailsToEmailAddress);

            ($this->ccs != []) ? $mail->cc($this->ccs) : null;
            ($this->bccs != []) ? $mail->bcc($this->bccs) : null;
            if(!empty($email->subject) )
            {
                $subjectWithVariables = $email->subject;
                $subjectWithVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithVariables, 'ik', Auth::user());

            }else{
                $subjectWithVariables = 'Econobis';
            }

            $htmlBodyWithVariables = TemplateVariableHelper::replaceTemplateVariables($email->html_body, 'ik', Auth::user());
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
                $jobLog->value = 'Mail ' . $email->id . '  naar e-mailadres(sen) ' . implode(',', $emailsToEmailAddress ) . ' kon niet worden verzonden';
                $jobLog->user_id = $this->userId;
                $jobLog->job_category_id = 'email';
                $jobLog->save();
            }

        }

        //Send mail to all contacts
        if (!empty($emailsToContact)) {
            foreach ($emailsToContact as $emailToContact) {

                $mail = Mail::to($emailToContact->email);
                if (!$ccBccSent) {
                    ($this->ccs != []) ? $mail->cc($this->ccs) : null;
                    ($this->bccs != []) ? $mail->bcc($this->bccs) : null;
                    $ccBccSent = true;
                    $this->ccs = [];
                    $this->bccs = [];
                }
                if(!empty($email->subject) )
                {
                    $subjectWithContactVariables = $email->subject;
                    $subjectWithContactVariables = str_replace('{contactpersoon}', $emailAddress->contact->full_name, $subjectWithContactVariables);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'contact', $emailAddress->contact);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'ik', Auth::user());
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables,'portal' );
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables,'contacten_portal' );
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($subjectWithContactVariables,'cooperatie' );

                }else{
                    $subjectWithContactVariables = 'Econobis';
                }

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'contacten_portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables,'cooperatie' );
                //todo dit moet nog getest worden, maar zie nog niet wanneer je een email hebt met deze relaties voordat er gemaild wordt ?!
                //todo ik zie alleen mogelijkheid tot maken van deze relaties nadat er gemaild is
                if ($email->quotationRequest) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'offerteverzoek', $email->quotationRequest);
                }
                if($email->opportunity) {
                    $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'kans', $email->opportunity);
                    if($email->opportunity->intake) {
                        $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'intake',
                            $email->opportunity->intake);
                        if($email->opportunity->intake->campaign) {
                            $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'campagne',
                                $email->opportunity->intake->campaign);
                        }
                    }
                }

                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
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

        //send mail to group contacts
        // We versturen er een max aantal per keer om een timeout te voorkomen
        $groupEmailAdresses = $email->groupEmailAddresses()
            ->limit(Config::get('queue.email.chunk_size'))
            ->get();

        if ($groupEmailAdresses) {
            foreach ($groupEmailAdresses as $emailAddress) {

                $mail = Mail::to($emailAddress->email);
                if (!$ccBccSent) {
                    ($this->ccs != []) ? $mail->cc($this->ccs) : null;
                    ($this->bccs != []) ? $mail->bcc($this->bccs) : null;
                    $ccBccSent = true;
                    $this->ccs = [];
                    $this->bccs = [];
                }
                if(!empty($email->subject) )
                {
                    $subjectWithContactVariables = $email->subject;
                    $subjectWithContactVariables = str_replace('{contactpersoon}', $emailAddress->contact->full_name, $subjectWithContactVariables);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'contact', $emailAddress->contact);
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($subjectWithContactVariables, 'ik', Auth::user());
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables,'portal' );
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($subjectWithContactVariables,'contacten_portal' );
                    $subjectWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($subjectWithContactVariables,'cooperatie' );

                }else{
                    $subjectWithContactVariables = 'Econobis';
                }

                $htmlBodyWithContactVariables = TemplateTableHelper::replaceTemplateTables($email->html_body, $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'contact', $emailAddress->contact);
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateVariables($htmlBodyWithContactVariables, 'ik', Auth::user());
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplatePortalVariables($htmlBodyWithContactVariables,'contacten_portal' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::replaceTemplateCooperativeVariables($htmlBodyWithContactVariables,'cooperatie' );
                $htmlBodyWithContactVariables = TemplateVariableHelper::stripRemainingVariableTags($htmlBodyWithContactVariables);
                try {
                    $mail->send(new GenericMail($email, $htmlBodyWithContactVariables));
                    $amounfOfEmailsSend++;

                    //  Bij groups email slaan we htmlbody met niet gevulde mergevelden op.
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
                // Email always detach from table otherwise the jobs can stay in a loop when error occur in try/catch while sending
                $email->groupEmailAddresses()->detach($emailAddress->id);
            }

            if ($email->groupEmailAddresses()->exists()) {
                // Er zijn nog meer groepEmailAdressen om naar te versturen; nieuwe Job aanmaken om deze op te pikken
                $didFinishEmail = false;
                self::dispatch($email, [], $this->userId, false);
            }

        }

//        if ($amounfOfEmailsSend === 1) {
//            $email->html_body = $mergedHtmlBody;
//        }

        if ($didFinishEmail) {
            $email->subject = $mergedSubject;
            $email->html_body = $mergedHtmlBody;
            $email->date_sent = new Carbon();
            $email->folder = 'sent';
            $email->save();

            $jobLog = new JobsLog();
            $jobLog->value = 'E-mail(s) verstuurd.';
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'email';
            $jobLog->save();
        }
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'E-mail(s) versturen mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'email';
        $jobLog->save();

        Log::error('E-mail maken mislukt:' . $exception->getMessage());
    }

    private function validateRequest()
    {
        if ($this->email->from != $this->email->mailbox->email) throw new \Exception('A mail can only be send with the same address as the sending mailbox');
    }
}