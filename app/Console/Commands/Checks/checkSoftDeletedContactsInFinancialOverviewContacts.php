<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CheckSoftDeletedContactsInFinancialOverviewContacts extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInFinancialOverviewContacts
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInFinancialOverviewContacts';
    protected string $checkCode = 'soft_deleted_contacts_in_financial_overview_contacts';
    protected string $checkName = 'Soft deleted contacten in financial overview contacts';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in financial overview contacts';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $financialOverviewContactsWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $financialOverviewContactsWithTrashedContact = DB::table('financial_overview_contacts')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($financialOverviewContactsWithTrashedContact as $financialOverviewContactsWithTrashedContact) {
            Log::info(
                'Delete nog NIET mogelijk van financialOverviewContacts met id:'
                . $financialOverviewContactsWithTrashedContact->id
                . ', financialOverviewId '
                . $financialOverviewContactsWithTrashedContact->financial_overview_id
                . ', contactId '
                . $financialOverviewContactsWithTrashedContact->contact_id
                . ', statusId '
                . $financialOverviewContactsWithTrashedContact->status_id
                . ', filename '
                . $financialOverviewContactsWithTrashedContact->filename
                . ', name '
                . $financialOverviewContactsWithTrashedContact->name
                . ', dateSent '
                . $financialOverviewContactsWithTrashedContact->date_sent
                . ', emailedTo '
                . $financialOverviewContactsWithTrashedContact->emailed_to
                . ', createdAt '
                . $financialOverviewContactsWithTrashedContact->created_at
                . ' en updatedAt '
                . $financialOverviewContactsWithTrashedContact->updated_at
            );

            Log::info('Dit kan pas als tabel softdeletable is gemaakt. Tot die tijd handmatig oplossen door contacts en people/organisations records van dit contact weer van softdeleted af te halen.');

            if ($doRecover) {
                // Automatisch herstel is momenteel nog niet mogelijk.
                // Daarom bewust geen delete/update hier.
            }

            $financialOverviewContactsWithTrashedContactReturn[$counter]['financial-overview-contact-id'] = $financialOverviewContactsWithTrashedContact->id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['financial-overview-id'] = $financialOverviewContactsWithTrashedContact->financial_overview_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['contact-id'] = $financialOverviewContactsWithTrashedContact->contact_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['status-id'] = $financialOverviewContactsWithTrashedContact->status_id;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['filename'] = $financialOverviewContactsWithTrashedContact->filename;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['name'] = $financialOverviewContactsWithTrashedContact->name;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['date-sent'] = $financialOverviewContactsWithTrashedContact->date_sent;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['emailed-to'] = $financialOverviewContactsWithTrashedContact->emailed_to;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['created-at'] = $financialOverviewContactsWithTrashedContact->created_at;
            $financialOverviewContactsWithTrashedContactReturn[$counter]['updated-at'] = $financialOverviewContactsWithTrashedContact->updated_at;
            $counter++;
        }

        return $financialOverviewContactsWithTrashedContactReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Financial overview contact heeft soft deleted contact. Automatisch herstel is nog niet mogelijk.';
    }

    protected function getEntityType(): ?string
    {
        return 'financial_overview_contacts';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['financial-overview-contact-id'];
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
            'financial_overview_id' => $item['financial-overview-id'],
            'status_id' => $item['status-id'],
            'filename' => $item['filename'],
            'name' => $item['name'],
            'date_sent' => $item['date-sent'],
            'emailed_to' => $item['emailed-to'],
            'created_at' => $item['created-at'],
            'updated_at' => $item['updated-at'],
            'auto_recover_possible' => false,
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' financial overview contacts gekoppeld aan soft deleted contacten.';
        $summary .= ' Automatisch herstel is niet mogelijk.';
        return $summary;
    }

    protected function sendSummaryMail(int $issuesFound, bool $doRecover): void
    {
        $subject = '[ECONOBIS CHECK] '
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
            . '<p><strong>Automatisch herstel:</strong> niet mogelijk</p>'
            . '<p>Dit kan pas als tabel financial_overview_contacts softdeletable is gemaakt. Tot die tijd handmatig oplossen door contacts en people/organisations records van dit contact weer van softdeleted af te halen.</p>'
            . '<p>Bekijk de details in de logging tabel system_check_runs / system_check_run_items.</p>'
            . '</body></html>';

        $mail = Mail::to($this->mailTo);
        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    protected function supportsRecover(): bool
    {
        return false;
    }
}