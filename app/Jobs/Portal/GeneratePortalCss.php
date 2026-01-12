<?php

namespace App\Jobs\Portal;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use Config;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
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
        $defaultPortalSettingsLayout = PortalSettingsLayout::where('is_default', true)->first();
        $html = view('portal.portal_css', [
            'defaultPortalSettingsLayout' => $defaultPortalSettingsLayout,
            'imageHash' => time()
        ])->render();

        try{
            if(Config::get('app.env') == "local")
            {
                Storage::disk('public_portal_local')->put('portal.css', $html);
                Storage::disk('customer_portal_app_build_local')->put('portal.css', $html);
                Storage::disk('customer_portal_app_public_local')->put('portal.css', $html);
            }else{
                Storage::disk('public_portal')->put('portal.css', $html);
            }
        }catch (\Exception $exception){
            Log::error('Opslaan gewijzigde portal.css mislukt : ' . $exception->getMessage());
        }
    }

//    protected function getStore(): Valuestore
//    {
//        return Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
//    }
}
