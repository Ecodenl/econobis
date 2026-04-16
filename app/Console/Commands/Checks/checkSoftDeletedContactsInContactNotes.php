<?php

namespace App\Console\Commands\Checks;

use App\Eco\Contact\Contact;
use App\Helpers\Mail\MailHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckSoftDeletedContactsInContactNotes extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactsInContactNotes
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactsInContactNotes';
    protected string $checkCode = 'soft_deleted_contacts_in_contact_notes';
    protected string $checkName = 'Soft deleted contacten in contact notes';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten (id\'s) in contact notes';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $contactNotesReturn = [];

        $contactsTrashed = Contact::onlyTrashed()->pluck('id')->toArray();

        $contactNotes = DB::table('contact_notes')
            ->join('contacts', 'contacts.id', '=', 'contact_notes.contact_id')
            ->select('contact_notes.id', 'contact_notes.note', 'contact_notes.contact_id', 'contacts.full_name')
            ->whereIn('contact_id', $contactsTrashed)
            ->whereNull('contact_notes.deleted_at')
            ->get();

        foreach ($contactNotes as $contactNote) {
            if ($doRecover) {
                Log::info('Detach van contactNote contactId ' . $contactNote->contact_id . ' en contactNoteId ' . $contactNote->id);

                DB::table('contact_notes')
                    ->where('id', $contactNote->id)
                    ->update([
                        'deleted_at' => now(),
                    ]);
            }

            $contactNotesReturn[$counter]['note-id'] = $contactNote->id;
            $contactNotesReturn[$counter]['note'] = substr($contactNote->note, 0, 20) . ' (' . strlen($contactNote->note) . ' lang)';
            $contactNotesReturn[$counter]['contact-id'] = $contactNote->contact_id;
            $contactNotesReturn[$counter]['contact-name'] = $contactNote->full_name;
            $counter++;
        }

        return $contactNotesReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Contact note heeft soft deleted contact.';
    }

    protected function getEntityType(): ?string
    {
        return 'contact_notes';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['note-id'];
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
            'note' => $item['note'],
            'contact_name' => $item['contact-name'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' contact notes gekoppeld aan soft deleted contacten.';

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