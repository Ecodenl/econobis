<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;

class CheckSoftDeletedContactsInPhoneNumbers extends AbstractSystemCheckCommand
{
    protected $signature = 'contact:checkSoftDeletedContactsInPhoneNumbers
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInPhoneNumbers';
    protected string $checkCode = 'soft_deleted_contacts_in_phone_numbers';
    protected string $checkName = 'Soft deleted contacten in contact telefoonnummers';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    protected $description = 'Check op soft deleted contacten (id\'s) in contact telefoonnummers niet soft deleted';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $phoneNumbersReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $phoneNumbers = DB::table('phone_numbers')
            ->join('contacts', 'contacts.id', '=', 'phone_numbers.contact_id')
            ->select('phone_numbers.id', 'phone_numbers.number', 'phone_numbers.contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->whereNull('phone_numbers.deleted_at')
            ->get();

        foreach ($phoneNumbers as $phoneNumber) {
            if ($doRecover) {
                DB::table('phone_numbers')
                    ->where('id', $phoneNumber->id)
                    ->update([
                        'deleted_at' => now(),
                    ]);
            }

            $phoneNumbersReturn[$counter]['phonenumber-id'] = $phoneNumber->id;
            $phoneNumbersReturn[$counter]['phonenumber'] = $phoneNumber->number;
            $phoneNumbersReturn[$counter]['contact-id'] = $phoneNumber->contact_id;
            $phoneNumbersReturn[$counter]['contact-name'] = $phoneNumber->full_name;
            $counter++;
        }

        return $phoneNumbersReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Telefoonnummer heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'phone_number';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['phonenumber-id'];
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
            'phone_number' => $item['phonenumber'],
            'contact_name' => $item['contact-name'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' telefoonnummers gekoppeld aan soft deleted contacten.';

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