<?php

namespace App\Helpers\Checks;

use App\Eco\SystemCheck\SystemCheckRun;
use App\Eco\SystemCheck\SystemCheckRunItem;

class SystemCheckLogger
{
    public function startRun(
        string $commandRef,
        string $checkCode,
        string $checkName,
        bool $isRecoverMode = false,
        ?string $mailTo = null,
        ?string $batchKey = null
    ): SystemCheckRun {
        return SystemCheckRun::create([
            'app_cooperation_name' => config('app.APP_COOP_NAME'),
            'command_ref' => $commandRef,
            'check_code' => $checkCode,
            'check_name' => $checkName,
            'batch_key' => $batchKey,
            'start_at' => now(),
            'finished' => false,
            'created_in_shared' => false,
            'status' => 'ok',
            'issues_found' => 0,
            'is_recover_mode' => $isRecoverMode,
            'mail_sent' => false,
            'mail_to' => $mailTo,
        ]);
    }

    public function addItem(
        SystemCheckRun $run,
        string $message,
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $relatedEntityType = null,
        ?int $relatedEntityId = null,
        array $context = [],
        string $severity = 'warning'
    ): SystemCheckRunItem {
        return $run->items()->create([
            'severity' => $severity,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'related_entity_type' => $relatedEntityType,
            'related_entity_id' => $relatedEntityId,
            'message' => $message,
            'context_json' => $context,
        ]);
    }

    public function finishRun(
        SystemCheckRun $run,
        int $issuesFound,
        ?string $summary = null,
        bool $mailSent = false
    ): SystemCheckRun {
        $status = 'ok';

        if ($issuesFound > 0 && $run->is_recover_mode) {
            $status = 'recovered';
        } elseif ($issuesFound > 0) {
            $status = 'warning';
        }

        $run->update([
            'issues_found' => $issuesFound,
            'summary' => $summary,
            'mail_sent' => $mailSent,
            'status' => $status,
            'end_at' => now(),
            'finished' => true,
        ]);

        return $run->fresh();
    }

    public function failRun(SystemCheckRun $run, string $summary): SystemCheckRun
    {
        $run->update([
            'summary' => $summary,
            'status' => 'error',
            'end_at' => now(),
            'finished' => true,
        ]);

        return $run->fresh();
    }
}