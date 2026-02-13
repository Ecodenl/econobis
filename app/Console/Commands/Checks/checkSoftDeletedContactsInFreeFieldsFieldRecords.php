<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkSoftDeletedContactsInFreeFieldsFieldRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInFreeFieldsFieldRecords {--recover=false}';
    protected $mailTo = 'xaris@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in free fields fields records';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // met of zonder herstel?
        $doRecover = $this->option('recover') == 'true';

        Log::info('Procedure check op soft deleted contacten (id\'s) in free fields fields records' . ($doRecover ? ' MET HERSTEL!' : ''));

        $freeFieldsFieldRecordssWithDeletedContactIds = $this->getfreeFieldsFieldRecordsWithDeletedContactIds($doRecover);

        if(!empty($freeFieldsFieldRecordssWithDeletedContactIds)) {
            $this->sendMail($freeFieldsFieldRecordssWithDeletedContactIds, $doRecover);
            Log::info('Soft deleted contacten (ids) gevonden in free fields fields records. Mail verzonden,');
        } else {
            Log::info('Geen soft deleted contacten (ids) gevonden in free fields fields records.');
        }

        Log::info('Procedure check op soft deleted contacten (id\'s) in free fields fields records klaar.');

    }

    private function sendMail($freeFieldsFieldRecordssWithDeletedContactIds, $doRecover)
    {
        $subject = 'Soft deleted contacten (ids) gevonden in free fields fields records! (' . count($freeFieldsFieldRecordssWithDeletedContactIds) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $freeFieldsFieldRecordssWithDeletedContactIdsHtml = "<p>De free fields fields record id's hebben soft deleted contacten (ids) :</p>";
        if($doRecover){
            $freeFieldsFieldRecordssWithDeletedContactIdsHtml .= "<p>MET HERSTEL!</p>";
        }
        foreach ($freeFieldsFieldRecordssWithDeletedContactIds as $freeFieldsFieldRecordssWithDeletedContactId) {
            $freeFieldsFieldRecordssWithDeletedContactIdsHtml .=
                "Id: " . $freeFieldsFieldRecordssWithDeletedContactId['free-fields-field-records-id'] . " | " .
                "Veld: " . $freeFieldsFieldRecordssWithDeletedContactId['field-id'] . " | " .
                "Contact: " . $freeFieldsFieldRecordssWithDeletedContactId['table-record-id'] . " | " .
                "Field value text: " . $freeFieldsFieldRecordssWithDeletedContactId['field-value-text'] . " | " .
                "Field value boolean: " . $freeFieldsFieldRecordssWithDeletedContactId['field-value-boolean'] . " | " .
                "Field value integer: " . $freeFieldsFieldRecordssWithDeletedContactId['field-value-int'] . " | " .
                "Field value double: " . $freeFieldsFieldRecordssWithDeletedContactId['field-value-double'] . " | " .
                "Field value datetime: " . $freeFieldsFieldRecordssWithDeletedContactId['field-value-datetime'] . " | " .
                "Created at: " . $freeFieldsFieldRecordssWithDeletedContactId['created-at'] . " | " .
                "Updated at: " . $freeFieldsFieldRecordssWithDeletedContactId['updated-at'] . " | " .
                "Deleted at: " . $freeFieldsFieldRecordssWithDeletedContactId['deleted-at'] . "</br>"
            ;
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'. $subject . '</p>' . $freeFieldsFieldRecordssWithDeletedContactIdsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }

    private function getfreeFieldsFieldRecordsWithDeletedContactIds(bool $doRecover): array
    {
        $counter = 0;
        $freeFieldsFieldRecordsWithTrashedContactReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $freeFieldsFieldRecordsWithTrashedContact = FreeFieldsFieldRecord::
            whereHas('freeFieldsField', function ($query) {
                $query->whereHas('FreeFieldsTable', function ($query2) {
                    $query2->where('table', 'contacts');
                });
            })
            ->whereIn('table_record_id', $contactsTrashed)
            ->get();

        foreach ($freeFieldsFieldRecordsWithTrashedContact as $freeFieldsFieldRecordsWithTrashedContact) {
            if($doRecover) {
                Log::info('Delete van freeFieldsFieldRecords (en freeFieldsFieldLog) met id ' . $freeFieldsFieldRecordsWithTrashedContact->id);

                DB::table('free_fields_field_log')
                    ->where('free_fields_field_record_id', $freeFieldsFieldRecordsWithTrashedContact->id)
                    ->delete();

                DB::table('free_fields_field_records')->where('id', $freeFieldsFieldRecordsWithTrashedContact->id)->update([
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
}

