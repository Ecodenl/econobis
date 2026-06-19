<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckSoftDeletedContactsInTwinfieldLog extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInTwinfieldLog
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInTwinfieldLog';
    protected string $checkCode = 'soft_deleted_contacts_in_twinfield_log';
    protected string $checkName = 'Soft deleted contacten in twinfield log met message_type contact';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in twinfield log waar status is contacts';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $twinfieldLogWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $twinfieldLogWithTrashedContact = DB::table('twinfield_log')
            ->where('message_type', 'contact')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($twinfieldLogWithTrashedContact as $twinfieldLogWithTrashedContact) {
            if ($doRecover) {
                Log::info(
                    'Delete van twinfieldLog met id '
                    . $twinfieldLogWithTrashedContact->id
                    . ', invoiceId '
                    . $twinfieldLogWithTrashedContact->invoice_id
                    . ', contactId '
                    . $twinfieldLogWithTrashedContact->contact_id
                    . ', Bericht '
                    . $twinfieldLogWithTrashedContact->message_text
                    . ', userId '
                    . $twinfieldLogWithTrashedContact->user_id
                    . ', isError '
                    . $twinfieldLogWithTrashedContact->is_error
                    . ', createdAt '
                    . $twinfieldLogWithTrashedContact->created_at
                    . ' en updatedAt '
                    . $twinfieldLogWithTrashedContact->updated_at
                );

                DB::table('twinfield_log')
                    ->where('id', $twinfieldLogWithTrashedContact->id)
                    ->delete();
            }

            $twinfieldLogWithTrashedContactReturn[$counter]['twinfield-log-id'] = $twinfieldLogWithTrashedContact->id;
            $twinfieldLogWithTrashedContactReturn[$counter]['invoice-id'] = $twinfieldLogWithTrashedContact->invoice_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['contact-id'] = $twinfieldLogWithTrashedContact->contact_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['message-text'] = $twinfieldLogWithTrashedContact->message_text;
            $twinfieldLogWithTrashedContactReturn[$counter]['user-id'] = $twinfieldLogWithTrashedContact->user_id;
            $twinfieldLogWithTrashedContactReturn[$counter]['is-error'] = $twinfieldLogWithTrashedContact->is_error;
            $twinfieldLogWithTrashedContactReturn[$counter]['created-at'] = $twinfieldLogWithTrashedContact->created_at;
            $twinfieldLogWithTrashedContactReturn[$counter]['updated-at'] = $twinfieldLogWithTrashedContact->updated_at;
            $counter++;
        }

        return $twinfieldLogWithTrashedContactReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Twinfield log heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'twinfield_log';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['twinfield-log-id'];
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
            'invoice_id' => $item['invoice-id'],
            'message_text' => $item['message-text'],
            'user_id' => $item['user-id'],
            'is_error' => $item['is-error'],
            'created_at' => $item['created-at'],
            'updated_at' => $item['updated-at'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' twinfield log records gekoppeld aan soft deleted contacten.';

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