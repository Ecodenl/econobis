<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckSoftDeletedContactsInFreeFieldsFieldRecords extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInFreeFieldsFieldRecords
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInFreeFieldsFieldRecords';
    protected string $checkCode = 'soft_deleted_contacts_in_free_fields_field_records';
    protected string $checkName = 'Soft deleted contacten in free fields field records';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in free fields fields records';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $freeFieldsFieldRecordsWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $freeFieldsFieldRecordsWithTrashedContact = FreeFieldsFieldRecord::whereHas('freeFieldsField', function ($query) {
            $query->whereHas('FreeFieldsTable', function ($query2) {
                $query2->where('table', 'contacts');
            });
        })
            ->whereIn('table_record_id', $contactsTrashed)
            ->get();

        foreach ($freeFieldsFieldRecordsWithTrashedContact as $freeFieldsFieldRecordsWithTrashedContact) {
            if ($doRecover) {
                Log::info('Delete van freeFieldsFieldRecords (en freeFieldsFieldLog) met id ' . $freeFieldsFieldRecordsWithTrashedContact->id);

                DB::table('free_fields_field_log')
                    ->where('free_fields_field_record_id', $freeFieldsFieldRecordsWithTrashedContact->id)
                    ->delete();

                DB::table('free_fields_field_records')
                    ->where('id', $freeFieldsFieldRecordsWithTrashedContact->id)
                    ->update([
                        'deleted_at' => now(),
                    ]);
            }

            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['free-fields-field-records-id'] = $freeFieldsFieldRecordsWithTrashedContact->id;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-id'] = $freeFieldsFieldRecordsWithTrashedContact->field_id;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['table-record-id'] = $freeFieldsFieldRecordsWithTrashedContact->table_record_id;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-value-text'] = $freeFieldsFieldRecordsWithTrashedContact->field_value_text;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-value-boolean'] = $freeFieldsFieldRecordsWithTrashedContact->field_value_boolean;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-value-int'] = $freeFieldsFieldRecordsWithTrashedContact->field_value_int;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-value-double'] = $freeFieldsFieldRecordsWithTrashedContact->field_value_double;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['field-value-datetime'] = $freeFieldsFieldRecordsWithTrashedContact->field_value_datetime;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['created-at'] = $freeFieldsFieldRecordsWithTrashedContact->created_at;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['updated-at'] = $freeFieldsFieldRecordsWithTrashedContact->updated_at;
            $freeFieldsFieldRecordsWithTrashedContactReturn[$counter]['deleted-at'] = $freeFieldsFieldRecordsWithTrashedContact->deleted_at;
            $counter++;
        }

        return $freeFieldsFieldRecordsWithTrashedContactReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Free fields field record heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'free_fields_field_records';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['free-fields-field-records-id'];
    }

    protected function getRelatedEntityType(): ?string
    {
        return 'contact';
    }

    protected function getRelatedEntityId(array $item): ?int
    {
        return $item['table-record-id'];
    }

    protected function getContext(array $item): array
    {
        return [
            'field_id' => $item['field-id'],
            'field_value_text' => $item['field-value-text'],
            'field_value_boolean' => $item['field-value-boolean'],
            'field_value_int' => $item['field-value-int'],
            'field_value_double' => $item['field-value-double'],
            'field_value_datetime' => $item['field-value-datetime'],
            'created_at' => $item['created-at'],
            'updated_at' => $item['updated-at'],
            'deleted_at' => $item['deleted-at'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' free fields field records gekoppeld aan soft deleted contacten.';

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