<?php

namespace App\Console\Commands\Checks;

use App\Eco\ContactGroup\ContactGroup;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CheckSoftDeletedContactGroupsInContactGroupPivot extends AbstractSystemCheckCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contact:checkSoftDeletedContactGroupsInContactGroupPivot
                        {--recover=false}
                        {--batch-key=}
                        {--send-mail=true}';

    protected string $commandRef = 'contact:checkSoftDeletedContactGroupsInContactGroupPivot';
    protected string $checkCode = 'soft_deleted_contact_groups_in_contact_group_pivot';
    protected string $checkName = 'Soft deleted contactgroepen in contact_groups_pivot';
    protected ?string $mailTo = 'xaris.software@econobis.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check op soft deleted contacten groepen (id\'s) in contact groepen';

    protected function getItems(bool $doRecover): array
    {
        $counter = 0;
        $contactGroupsReturn = [];

        $contactGroupsTrashed = ContactGroup::onlyTrashed()->pluck('id')->toArray();

        $contactGroupPivots = DB::table('contact_groups_pivot')
            ->join('contact_groups', 'contact_groups.id', '=', 'contact_groups_pivot.contact_group_id')
            ->join('contacts', 'contacts.id', '=', 'contact_groups_pivot.contact_id')
            ->select('contact_group_id', 'contact_groups.name', 'contact_id', 'contacts.full_name')
            ->whereIn('contact_group_id', $contactGroupsTrashed)
            ->get();

        foreach ($contactGroupPivots as $contactGroupPivot) {
            if ($doRecover) {
                DB::table('contact_groups_pivot')
                    ->where('contact_id', $contactGroupPivot->contact_id)
                    ->where('contact_group_id', $contactGroupPivot->contact_group_id)
                    ->delete();
            }

            $contactGroupsReturn[$counter]['group-id'] = $contactGroupPivot->contact_group_id;
            $contactGroupsReturn[$counter]['group-name'] = $contactGroupPivot->name;
            $contactGroupsReturn[$counter]['contact-id'] = $contactGroupPivot->contact_id;
            $contactGroupsReturn[$counter]['contact-name'] = $contactGroupPivot->full_name;
            $counter++;
        }

        return $contactGroupsReturn;
    }

    protected function getItemMessage(array $item): string
    {
        return 'Contactgroep-koppeling heeft soft deleted contactgroep.';
    }

    protected function getEntityType(): ?string
    {
        return 'contact_groups_pivot';
    }

    protected function getEntityId(array $item): ?int
    {
        return $item['contact-id'];
    }

    protected function getRelatedEntityType(): ?string
    {
        return 'contact_group';
    }

    protected function getRelatedEntityId(array $item): ?int
    {
        return $item['group-id'];
    }

    protected function getContext(array $item): array
    {
        return [
            'group_name' => $item['group-name'],
            'contact_name' => $item['contact-name'],
        ];
    }

    protected function getSummary(int $issuesFound, bool $doRecover): string
    {
        $summary = $issuesFound . ' contactgroep-koppelingen gekoppeld aan soft deleted contactgroepen.';

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