<?php

namespace Tests\Unit\DataCleanup;

use App\Eco\Cooperation\CooperationCleanupItem;
use App\Helpers\DataCleanup\CleanupItemHelper;
use Carbon\Carbon;
use Tests\TestCase;

class CleanupFiscalCutoffTest extends TestCase
{
    public function test_fiscal_retention_cutoff_is_january_first(): void
    {
        // Freeze time
        Carbon::setTestNow(
            Carbon::create(2026, 2, 2, 12, 0, 0, 'Europe/Amsterdam')
        );

        $item = new CooperationCleanupItem([
            'code_ref' => 'invoices',   // registry => fiscal-date
            'years_for_delete' => 7,
        ]);

        $helper = new class($item) extends CleanupItemHelper {
            public function publicCutoffDate(): Carbon
            {
                return $this->cutoffDate();
            }
        };

        $cutoff = $helper->publicCutoffDate();

        $this->assertSame('2019-01-01', $cutoff->format('Y-m-d'));
    }

    public function test_has_retention_period_is_true_for_fiscal_types(): void
    {
        $item = new CooperationCleanupItem([
            'code_ref' => 'invoices',
        ]);

        $this->assertTrue($item->has_retention_period);
    }
}
