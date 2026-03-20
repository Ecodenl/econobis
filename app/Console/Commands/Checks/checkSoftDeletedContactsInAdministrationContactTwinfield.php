<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CheckSoftDeletedContactsInAdministrationContactTwinfield extends AbstractSystemCheckCommand
{
    protected $signature = 'contact:checkSoftDeletedContactsInAdministrationContactTwinfield
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInAdministrationContactTwinfield';
    protected string $checkCode = 'soft_deleted_contacts_in_administration_contact_twinfield';
    protected string $checkName = 'Soft deleted contacten in administration contact Twinfield';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    protected $description = 'Check op soft deleted contacten (id\'s) in administration contact Twinfield';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $administrationContactTwinfieldReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $administrationContactTwinfieldsWithTrashedContact = DB::table('administration_contact_twinfield')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($administrationContactTwinfieldsWithTrashedContact as $administrationContactTwinfield) {
            if ($doRecover) {
                Log::info(
                    'Delete van administrationContactTwinfield met id:'
                    . $administrationContactTwinfield->id
                    . ', contactId '
                    . $administrationContactTwinfield->contact_id
                    . ', administrationId '
                    . $administrationContactTwinfield->administration_id
                    . ' en twinfieldNumber '
                    . $administrationContactTwinfield->twinfield_number
                );

                DB::table('administration_contact_twinfield')
                    ->where('id', $administrationContactTwinfield->id)
                    ->delete();
            }

            $administrationContactTwinfieldReturn[$counter]['administration-contact-twinfield-id'] = $administrationContactTwinfield->id;
            $administrationContactTwinfieldReturn[$counter]['contact-id'] = $administrationContactTwinfield->contact_id;
            $administrationContactTwinfieldReturn[$counter]['administration-id'] = $administrationContactTwinfield->administration_id;
            $administrationContactTwinfieldReturn[$counter]['twinfield-number'] = $administrationContactTwinfield->twinfield_number;
            $counter++;
        }

        return $administrationContactTwinfieldReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Administration contact Twinfield heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'administration_contact_twinfield';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['administration-contact-twinfield-id'];
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
            'administration_id' => $item['administration-id'],
            'twinfield_number' => $item['twinfield-number'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' administration contact Twinfield records gekoppeld aan soft deleted contacten.';

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

        $mail = Mail::to($this->mailTo);
        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}