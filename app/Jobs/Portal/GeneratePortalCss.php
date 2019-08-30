<?php

namespace App\Jobs\Portal;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Spatie\Valuestore\Valuestore;

class GeneratePortalCss implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $store = $this->getStore();

        $html = view('portal.portal_css', [
            'store' => $store
        ])->render();

        Storage::disk('public_portal')->put('portal.css', $html);
    }

    protected function getStore(): Valuestore
    {
        return Valuestore::make(database_path('settings.json'));
    }
}
