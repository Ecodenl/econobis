<?php

namespace Tests\Feature\DataCleanup;

use Tests\TestCase;
use App\Eco\Cooperation\Cooperation;
use App\Eco\DataCleanup\CleanupItemSelection;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CleanupDoesNotCreateSelectionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_cleanup_does_not_create_new_selections_or_change_batch_id(): void
    {
        // Arrange
        $cooperation = Cooperation::factory()->create();

        // Kies een bestaand cleanup type dat in CleanupRegistry zit
        $type = 'contacts';

        // TODO: maak/seed eventuele data zodat determine selections maakt
        // (afhankelijk van jullie determine query)

        // Act 1: determine (maakt batch + selections)
        $res1 = $this->postJson("/api/cleanup/update-item/{$type}");
        $res1->assertStatus(200);

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $type)->firstOrFail();
        $batchId = $cleanupItem->current_batch_id;

        $beforeCount = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->count();

        $this->assertNotNull($batchId);
        $this->assertGreaterThanOrEqual(0, $beforeCount);

        // Act 2: cleanup (mag batch niet wijzigen en geen selections toevoegen/verwijderen)
        $res2 = $this->postJson("/api/cleanup/cleanup-item/{$type}");

        // cleanup kan 200 of 412 zijn (als deleter errors geeft), beide zijn oké voor deze invariant
        $this->assertContains($res2->getStatusCode(), [200, 412]);

        $cleanupItem->refresh();
        $afterCount = CleanupItemSelection::where('cooperation_id', $cooperation->id)
            ->where('cleanup_item_id', $cleanupItem->id)
            ->where('batch_id', $batchId)
            ->count();

        // Assert invariants
        $this->assertSame($batchId, $cleanupItem->current_batch_id);
        $this->assertSame($beforeCount, $afterCount);
    }
}
