<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Administration\Administration;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class MoveLogosToNewStructure extends Command
{
    protected $signature = 'uitfaserenAlfresco:moveLogosToNewStructure {--proef=true : Voer de operatie uit als test zonder bestanden te verplaatsen}';
    protected bool $hasErrors = false;

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        Log::info("Start met het verplaatsen van logo's...");

        $proef = $this->option('proef') === 'true';
        if ($proef) {
            Log::info("Proef modus ingeschakeld: Geen bestanden worden daadwerkelijk verplaatst.");
        }

        $commandRun = new CommandRun();
        $commandRun->app_cooperation_name = config('app.APP_COOP_NAME');
        $commandRun->schedule_run_id = 0;
        $commandRun->scheduled_commands_command_ref = $this->signature;
        $commandRun->start_at = Carbon::now();
        $commandRun->end_at = null;
        $commandRun->finished = false;
        $commandRun->created_in_shared = false;
        $commandRun->save();

        $this->moveLogosToNewStructure($proef);

        $commandRun->end_at = Carbon::now();
        if (!$this->hasErrors) {
            $commandRun->finished = true;
        }
        $commandRun->save();

        Log::info("Verplaatsen van logo's voltooid!");
    }

    private function moveLogosToNewStructure(bool $proef): void
    {
        $oldRoot = storage_path('app/administrations');
        $newRoot = storage_path('app-intern/administration-logos');

        if (!File::exists($newRoot)) {
            if ($proef) {
                Log::info("Proef: zou nieuwe root directory aanmaken: {$newRoot}");
            } else {
                File::makeDirectory($newRoot, 0755, true);
                Log::info("Nieuwe root directory aangemaakt: {$newRoot}");
            }
        }

        if (!File::isDirectory($oldRoot)) {
            Log::error("Oude root-map bestaat niet: {$oldRoot}");
            $this->hasErrors = true;
            return;
        }

        $administrations = Administration::all();

        foreach ($administrations as $administration) {
            Log::info("Verplaatst logo's voor administratie ID: {$administration->id}");

            $logosPath = 'administration_' . $administration->id . '/logos';
            $fullOldLogosPath = $oldRoot . '/' . $logosPath;

            if (!File::isDirectory($fullOldLogosPath)) {
                Log::error("Oude logos directory bestaat niet: {$fullOldLogosPath}");
                $this->hasErrors = true;
                continue;
            }

            $files = File::files($fullOldLogosPath);

            foreach ($files as $file) {
                try {
                    $relativeFilePath = str_replace($oldRoot . '/', '', $file->getPathname());
                    $oldFilePath = $file->getPathname();
                    $newFilePath = $newRoot . '/' . $relativeFilePath;

                    $newDirPath = dirname($newFilePath);
                    if (!File::exists($newDirPath)) {
                        if ($proef) {
                            Log::info("Proef: zou nieuwe directory aanmaken: {$newDirPath}");
                        } else {
                            File::makeDirectory($newDirPath, 0755, true);
                            Log::info("Nieuwe directory aangemaakt: {$newDirPath}");
                        }
                    }

                    if ($proef) {
                        Log::info("Proef: zou verplaatsen van {$oldFilePath} naar {$newFilePath}");
                    } else {
                        File::move($oldFilePath, $newFilePath);
                        Log::info("Bestand succesvol verplaatst: {$oldFilePath} -> {$newFilePath}");
                    }
                } catch (\Exception $e) {
                    Log::error("Fout bij het verplaatsen van bestand {$file->getFilename()}: " . $e->getMessage());
                    $this->hasErrors = true;
                    continue;
                }
            }

            $this->deleteDirectoryIfEmpty($fullOldLogosPath, $proef);
        }
    }

    private function isDirectoryEmpty(string $directory): bool
    {
        return (count(scandir($directory)) === 2); // '.' en '..'
    }

    private function deleteDirectoryIfEmpty(string $directory, bool $proef): void
    {
        if ($this->isDirectoryEmpty($directory)) {
            if ($proef) {
                Log::info("Proef: zou lege directory verwijderen: {$directory}");
            } else {
                if (rmdir($directory)) {
                    Log::info("Lege directory verwijderd: {$directory}");
                } else {
                    Log::error("Kon lege directory niet verwijderen: {$directory}");
                }
            }
        }
    }
}
