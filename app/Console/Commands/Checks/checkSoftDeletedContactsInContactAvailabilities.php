<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckSoftDeletedContactsInContactAvailabilities extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactAvailabilities
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInContactAvailabilities';
    protected string $checkCode = 'soft_deleted_contacts_in_contact_availabilities';
    protected string $checkName = 'Soft deleted contacten in contact availabilities';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact availabilities';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $contactAvailabilitiesWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactAvailabilitiesWithTrashedContact = DB::table('contact_availabilities')
            ->whereIn('contact_id', $contactsTrashed)
            ->get();

        foreach ($contactAvailabilitiesWithTrashedContact as $contactAvailabilityWithTrashedContact) {
            if ($doRecover) {
                Log::info(
                    'Delete van contactAvailabilities met id:'
                    . $contactAvailabilityWithTrashedContact->id
                    . ', contactId '
                    . $contactAvailabilityWithTrashedContact->contact_id
                    . ', from '
                    . $contactAvailabilityWithTrashedContact->from
                    . ', to '
                    . $contactAvailabilityWithTrashedContact->to
                    . ', createdAt '
                    . $contactAvailabilityWithTrashedContact->created_at
                    . ' en updatedAt '
                    . $contactAvailabilityWithTrashedContact->updated_at
                );

                DB::table('contact_availabilities')
                    ->where('id', $contactAvailabilityWithTrashedContact->id)
                    ->delete();
            }

            $contactAvailabilitiesWithTrashedContactReturn[$counter]['contact-availabilities-id'] = $contactAvailabilityWithTrashedContact->id;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['contact-id'] = $contactAvailabilityWithTrashedContact->contact_id;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['from'] = $contactAvailabilityWithTrashedContact->from;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['to'] = $contactAvailabilityWithTrashedContact->to;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['created-at'] = $contactAvailabilityWithTrashedContact->created_at;
            $contactAvailabilitiesWithTrashedContactReturn[$counter]['updated-at'] = $contactAvailabilityWithTrashedContact->updated_at;
            $counter++;
        }

        return $contactAvailabilitiesWithTrashedContactReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Contact availability heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
//        return 'contact_availability';
        return 'contact_availabilities';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['contact-availabilities-id'];
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
            'from' => $item['from'],
            'to' => $item['to'],
            'created_at' => $item['created-at'],
            'updated_at' => $item['updated-at'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' contact availabilities gekoppeld aan soft deleted contacten.';

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