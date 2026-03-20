<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;

class CheckSoftDeletedContactsInContactEmailManual extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactEmailManual
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInContactEmailManual';
    protected string $checkCode = 'soft_deleted_contacts_in_contact_email_manual';
    protected string $checkName = 'Soft deleted contacten in contact emails manual';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact emails manual';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $contactEmailManualsReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactEmailManuals = DB::table('contact_email_manual')
            ->join('emails', 'emails.id', '=', 'contact_email_manual.email_id')
            ->join('contacts', 'contacts.id', '=', 'contact_email_manual.contact_id')
            ->select('email_id', 'emails.subject', 'contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactEmailManuals as $contactEmailManual) {
            if ($doRecover) {
                DB::table('contact_email_manual')
                    ->where('contact_id', $contactEmailManual->contact_id)
                    ->where('email_id', $contactEmailManual->email_id)
                    ->delete();
            }

            $contactEmailManualsReturn[$counter]['email-id'] = $contactEmailManual->email_id;
            $contactEmailManualsReturn[$counter]['email-subject'] = $contactEmailManual->subject;
            $contactEmailManualsReturn[$counter]['contact-id'] = $contactEmailManual->contact_id;
            $contactEmailManualsReturn[$counter]['contact-name'] = $contactEmailManual->full_name;
            $counter++;
        }

        return $contactEmailManualsReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Contact email manual koppeling heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'contact_email_manual';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['email-id'];
    }

    protected function getRelatedEntityType(): ?string
    {
        return 'contact';
    }

    protected function getRelatedEntityId(array $item): ?int
    {
        return $item['contact-id'];
    }

    protected function getContext(array $item): array
    {
        return [
            'email_subject' => $item['email-subject'],
            'contact_name' => $item['contact-name'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' contact email manual koppelingen gekoppeld aan soft deleted contacten.';

        if ($doRecover) {
            $summary .= ' Controle uitgevoerd met herstel.';
        }

        return $summary;
    }

    protected function sendSummaryMail(int $issuesFound, bool $doRecover): void
    {
        $subjectPrefix = $doRecover ? '[ECONOBIS RECOVER] ' : '[ECONOBIS CHECK] ';

        $subject = $subjectPrefix
            . $issuesFound
            . ' issues gevonden bij '
            . $this->checkName
            . ' - '
            . config('app.APP_COOP_NAME');

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/>'
            . '<title>' . e($subject) . '</title></head><body>'
            . '<p>' . e($subject) . '</p>'
            . '<p>Tijdens een automatische controle zijn afwijkingen gevonden.</p>'
            . '<p><strong>Controle:</strong> ' . e($this->checkName) . '</p>'
            . '<p><strong>Coöperatie:</strong> ' . e(config('app.APP_COOP_NAME')) . '</p>'
            . '<p><strong>Aantal issues:</strong> ' . $issuesFound . '</p>'
            . '<p><strong>Herstelmodus:</strong> ' . ($doRecover ? 'ja' : 'nee') . '</p>'
            . '<p>Bekijk de details in de logging tabel system_check_runs / system_check_run_items.</p>'
            . '</body></html>';

        $mail = MailHelper::to($this->mailTo);
        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}