<?php

namespace App\Console\Commands;

use App\Eco\Schedule\CommandRun;
use App\Eco\SystemCheck\SystemCheckRun;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ControleScriptsSoftDeletedContacts extends Command
{
    protected $signature = 'check:controleScriptsSoftDeletedContacts {--recover=false}';
    protected $commandRef = 'check:controleScriptsSoftDeletedContacts';
    protected $description = 'Draait alle controlescripts voor soft deleted contacten en verstuurt 1 samenvattende mail.';
    protected $mailTo = 'xaris.software@econobis.nl';

    public function handle(): int
    {
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = config('app.SCHEDULE_RUN_ID');
        $commandRun->scheduled_commands_command_ref = $this->commandRef;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $doRecover = $this->option('recover') == 'true';
        $batchKey = 'soft_deleted_contacts_' . now()->format('Ymd_His');

        $commands = [
            'contact:checkSoftDeletedContactGroupsInContactGroupPivot',
            'contact:checkSoftDeletedContactsInContactGroupPivot',
            'contact:checkSoftDeletedContactsInContactEmail',
            'contact:checkSoftDeletedContactsInContactEmailManual',
            'contact:checkSoftDeletedContactsInContactNotes',
            'contact:checkSoftDeletedContactsInPhoneNumbers',
            'contact:checkSoftDeletedContactsInAdministrationContactTwinfield',
            'contact:checkSoftDeletedContactsInContactAvailabilities',
            'contact:checkSoftDeletedContactsInFinancialOverviewContacts',
            'contact:checkSoftDeletedContactsInFreeFieldsFieldRecords',
            'contact:checkSoftDeletedContactsInTwinfieldLog',
        ];

        foreach ($commands as $command) {
            $result = Artisan::call($command, [
                '--recover' => $doRecover ? 'true' : 'false',
                '--batch-key' => $batchKey,
                '--send-mail' => 'false',
            ]);

            Log::info('Subcommand uitgevoerd.', [
                'command' => $command,
                'result' => $result,
                'batch_key' => $batchKey,
            ]);
        }

        $runs = SystemCheckRun::where('batch_key', $batchKey)
            ->orderBy('check_name')
            ->get();

        $runsWithIssues = $runs->where('issues_found', '>', 0);
        $totalIssues = $runsWithIssues->sum('issues_found');

        Log::info('Soft deleted contact checks batch afgerond.', [
            'batch_key' => $batchKey,
            'runs_count' => $runs->count(),
            'issues_total' => $totalIssues,
        ]);

        if ($runsWithIssues->isNotEmpty()) {
            $this->sendSummaryMail($runs, $batchKey, $doRecover);

            // alle runs in batch markeren als "gemeld"
            SystemCheckRun::where('batch_key', $batchKey)
                ->where('issues_found', '>', 0)
                ->update([
                    'notification_sent' => true,
                ]);

            Log::info('Batch notificatie gemarkeerd voor runs met issues.', [
                'batch_key' => $batchKey,
                'runs_marked' => $runsWithIssues->count(),
            ]);
        }

        $commandRun->end_at = Carbon::now();
        $commandRun->finished = true;
        $commandRun->save();

        return Command::SUCCESS;
    }

    private function sendSummaryMail($runs, string $batchKey, bool $doRecover): void
    {
        $subjectPrefix = $doRecover ? '[ECONOBIS RECOVER] ' : '[ECONOBIS CHECK] ';
        $runsWithIssues = $runs->where('issues_found', '>', 0);
        $totalIssues = $runsWithIssues->sum('issues_found');

        $subject = $subjectPrefix
            . $runsWithIssues->count()
            . ' checks met issues, totaal '
            . $totalIssues
            . ' issues - '
            . config('app.APP_COOP_NAME');

        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/>'
            . '<title>' . e($subject) . '</title></head><body>'
            . '<p>' . e($subject) . '</p>'
            . '<p>De controlescripts voor soft deleted contacten zijn uitgevoerd.</p>'
            . '<p><strong>Coöperatie:</strong> ' . e(config('app.APP_COOP_NAME')) . '</p>'
            . '<p><strong>Batch key:</strong> ' . e($batchKey) . '</p>'
            . '<p><strong>Aantal checks uitgevoerd:</strong> ' . $runs->count() . '</p>'
            . '<p><strong>Aantal checks met issues:</strong> ' . $runsWithIssues->count() . '</p>'
            . '<p><strong>Totaal aantal issues:</strong> ' . $totalIssues . '</p>'
            . '<p><strong>Herstelmodus batch:</strong> ' . ($doRecover ? 'ja' : 'nee') . '</p>'
            . '<br/>'
            . '<p><strong>Overzicht checks met issues:</strong></p>';

        foreach ($runsWithIssues as $run) {
            $htmlBody .= '<p>'
                . e($run->check_name)
                . ': '
                . $run->issues_found
                . ' issues | status: '
                . e($run->status)
                . '</p>';
        }

        $htmlBody .= '<br/><p>Bekijk details in de logging tabel system_check_runs / system_check_run_items.</p>';
        $htmlBody .= '</body></html>';

        $mail = Mail::to($this->mailTo);
        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}