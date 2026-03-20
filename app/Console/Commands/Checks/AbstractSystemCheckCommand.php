<?php

namespace App\Console\Commands\Checks;

use App\Helpers\Checks\SystemCheckLogger;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

abstract class AbstractSystemCheckCommand extends Command
{
    protected string $commandRef;
    protected string $checkCode;
    protected string $checkName;
    protected ?string $mailTo = null;

    public function handle(SystemCheckLogger $systemCheckLogger): int
    {
        $supportsRecover = $this->supportsRecover();
        $requestedRecover = $this->option('recover') == 'true';
        $doRecover = $requestedRecover && $supportsRecover;

        if ($requestedRecover && !$supportsRecover) {
            Log::warning(
                'Recover gevraagd maar niet ondersteund voor check: '
                . $this->commandRef
                . '. Controle wordt zonder herstel uitgevoerd.'
            );
        }

        $batchKey = $this->option('batch-key');
        $sendMail = $this->option('send-mail') == 'true';

        Log::info(
            'Procedure ' . $this->checkName . ($doRecover ? ' MET HERSTEL!' : '')
        );

        $run = $systemCheckLogger->startRun(
            commandRef: $this->commandRef,
            checkCode: $this->checkCode,
            checkName: $this->checkName,
            isRecoverMode: $doRecover,
            mailTo: $this->mailTo,
            batchKey: $batchKey
        );

        try {
            $items = $this->getItems($doRecover);

            foreach ($items as $item) {
                $systemCheckLogger->addItem(
                    run: $run,
                    message: $this->getItemMessage($item),
                    entityType: $this->getEntityType(),
                    entityId: $this->getEntityId($item),
                    relatedEntityType: $this->getRelatedEntityType(),
                    relatedEntityId: $this->getRelatedEntityId($item),
                    context: $this->getContext($item),
                    severity: $doRecover ? 'info' : 'warning'
                );
            }

            $issuesFound = count($items);
            $mailSent = false;
            $notificationSent = false;

            if ($issuesFound > 0) {
                if ($sendMail && $this->mailTo) {
                    $this->sendSummaryMail($issuesFound, $doRecover);
                    $mailSent = true;
                    $notificationSent = true;

                    Log::info($this->checkName . '. Samenvattingsmail verzonden.');
                } else {
                    Log::info($this->checkName . '. Issues gevonden.');
                }
            } else {
                Log::info($this->checkName . '. Geen issues gevonden.');
            }

            $systemCheckLogger->finishRun(
                run: $run,
                issuesFound: $issuesFound,
                summary: $this->getSummary($issuesFound, $doRecover),
                mailSent: $mailSent,
                notificationSent: $notificationSent
            );

            Log::info('Procedure ' . $this->checkName . ' klaar.');

            return Command::SUCCESS;
        } catch (\Throwable $e) {
            $systemCheckLogger->failRun(
                $run,
                'Fout tijdens controle: ' . $e->getMessage()
            );

            Log::error('Fout in ' . $this->commandRef, [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return Command::FAILURE;
        }
    }

    abstract protected function getItems(bool $doRecover): array;

    abstract protected function getItemMessage(array $item): string;

    abstract protected function getEntityType(): ?string;

    abstract protected function getEntityId(array $item): ?int;

    abstract protected function getRelatedEntityType(): ?string;

    abstract protected function getRelatedEntityId(array $item): ?int;

    abstract protected function getContext(array $item): array;

    abstract protected function getSummary(int $issuesFound, bool $doRecover): string;

    protected function sendSummaryMail(int $issuesFound, bool $doRecover): void
    {
        // Optioneel overschrijven in child command.
    }

    protected function supportsRecover(): bool
    {
        return true;
    }
}