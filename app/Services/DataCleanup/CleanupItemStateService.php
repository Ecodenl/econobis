<?php

namespace App\Services\DataCleanup;

use App\Eco\Cooperation\CooperationCleanupItem;
use App\Eco\DataCleanup\CleanupItemSelection;

class CleanupItemStateService
{
    public function batchStats(int $cleanupItemId, string $batchId, ?int $cooperationId = null): array
    {
        $q = CleanupItemSelection::query()
            ->selectRaw('status, COUNT(*) as cnt')
            ->where('cleanup_item_id', $cleanupItemId)
            ->where('batch_id', $batchId);

        if ($cooperationId !== null) {
            $q->where('cooperation_id', $cooperationId);
        }

        $rows = $q->groupBy('status')
            ->pluck('cnt', 'status')
            ->all();

        return [
            'determined' => (int)($rows['determined'] ?? 0),
            'cleaned'    => (int)($rows['cleaned'] ?? 0),
            'failed'     => (int)($rows['failed'] ?? 0),
        ];
    }

    public function setBeforeCleanup(CooperationCleanupItem $item): void
    {
        $item->status = CooperationCleanupItem::STATUS_RUNNING;
    }

    public function syncCountsAndStatusAfterDetermine(CooperationCleanupItem $item): array
    {
        if (! $item->current_batch_id) {
            $item->determined_count = 0;
            $item->cleaned_count = 0;
            $item->failed_count = 0;
            $item->status = CooperationCleanupItem::STATUS_IDLE;
            return ['determined' => 0, 'cleaned' => 0, 'failed' => 0];
        }

        $stats = $this->batchStats($item->id, $item->current_batch_id, $item->cooperation_id);

        $item->determined_count = $stats['determined'];
        $item->cleaned_count = $stats['cleaned'];
        $item->failed_count = $stats['failed'];

        $item->status = $stats['determined'] > 0
            ? CooperationCleanupItem::STATUS_DETERMINED
            : CooperationCleanupItem::STATUS_IDLE;

        return $stats;
    }

    public function syncCountsAndStatusAfterCleanup(CooperationCleanupItem $item, bool $systemFailed = false): array
    {
        if (! $item->current_batch_id) {
            $item->determined_count = 0;
            $item->cleaned_count = 0;
            $item->failed_count = 0;
            $item->status = CooperationCleanupItem::STATUS_IDLE;
            return ['determined' => 0, 'cleaned' => 0, 'failed' => 0];
        }

        $stats = $this->batchStats($item->id, $item->current_batch_id, $item->cooperation_id);

        $item->determined_count = $stats['determined'];
        $item->cleaned_count = $stats['cleaned'];
        $item->failed_count = $stats['failed'];

        if ($systemFailed) {
            $item->status = CooperationCleanupItem::STATUS_FAILED;
            return $stats;
        }

        // jouw afgesproken definitie:
        if ($stats['determined'] === 0 && $stats['failed'] === 0) {
            $item->status = CooperationCleanupItem::STATUS_DONE;
        } elseif ($stats['failed'] > 0) {
            $item->status = CooperationCleanupItem::STATUS_PARTIAL;
        } else {
            // zou normaliter niet gebeuren: no failures, maar determined>0
            $item->status = CooperationCleanupItem::STATUS_PARTIAL;
            // Log::warning('Cleanup klaar, geen failed maar determined>0', [cleanup_item_id, batch_id, en de stats.]);
        }

        return $stats;
    }
}
