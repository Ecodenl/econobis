<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Administration\Administration;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class moveLogosToNewStructure extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'script:moveLogosToNewStructure';
    protected bool $hasErrors = false;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = 0;
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $this->moveLogosToNewStructure();

        $commandRun->end_at = Carbon::now();
        if($this->hasErrors === false){
            $commandRun->finished = true;
        }
        $commandRun->save();

    }

    private function moveLogosToNewStructure(): void
    {
        Log::info("Start met het verplaatsen van logo's...");

        // Definieer de absolute paden
        $oldRoot = storage_path('app/administrations');
        $newRoot = storage_path('app-intern/administration-logos');

        // Controleer of de oude root-map bestaat
        if (!is_dir($oldRoot)) {
            Log::error("Oude root-map bestaat niet: {$oldRoot}");
            $this->hasErrors = true;
            return;
        }

        // Haal alle administraties op
        $administrations = Administration::all();

        foreach ($administrations as $administration) {
            Log::info("Verplaatst logo's voor administratie ID: {$administration->id}");

            // Bepaal het relatieve pad
            $logosPath = 'administration_' . $administration->id . '/logos';

            if (!is_dir($oldRoot . '/' . $logosPath)) {
                Log::error("Oude root-map bestaat niet: {$oldRoot}/{$logosPath}");
                $this->hasErrors = true;
                return;
            }

            // Verwerk alle bestanden in de huidige directory
            $files = Storage::disk('administrations')->files($logosPath);

            foreach ($files as $file) {
                try {
                    // Bepaal de oude en nieuwe paden
                    $oldFilePath = $oldRoot . DIRECTORY_SEPARATOR . $file;
                    $newFilePath = $newRoot . DIRECTORY_SEPARATOR . $file;

                    // Zorg dat de doelmap bestaat
                    $newDirPath = dirname($newFilePath);
                    if (!is_dir($newDirPath)) {
                        mkdir($newDirPath, 0755, true); // Recursief mappen aanmaken
                        Log::info("Nieuwe directory aangemaakt: {$newDirPath}");
                    }

                    // Verplaats het bestand
                    rename($oldFilePath, $newFilePath);

                    Log::info("Bestand succesvol verplaatst: {$oldFilePath} -> {$newFilePath}");
                } catch (\Exception $e) {
                    Log::error("Fout bij het verplaatsen van bestand {$file}: " . $e->getMessage());
                    $this->hasErrors = true;
                }
            }

            // Controleer of de oude /logos directory leeg is en verwijder deze
            $oldLogosDirectory = $oldRoot . DIRECTORY_SEPARATOR . $logosPath;
            if (is_dir($oldLogosDirectory) && count(scandir($oldLogosDirectory)) === 2) {
                rmdir($oldLogosDirectory);
                Log::info("Lege /logos directory verwijderd: {$oldLogosDirectory}");
            }
        }

        Log::info("Verplaatsen van logo's voltooid!");
    }


}

