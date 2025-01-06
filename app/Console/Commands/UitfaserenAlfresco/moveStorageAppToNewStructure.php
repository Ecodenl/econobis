<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class moveStorageAppToNewStructure extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uitfaserenAlfresco:moveStorageAppToNewStructure {--proef=true : Voer de operatie uit als test zonder bestanden te verplaatsen}';
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
        Log::info("Start met het verplaatsen van storage/app bestanden...");

        $proef = $this->option('proef') == 'true';
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

        if(config('app.env') === 'local'){
            $bigStoragePath = '/home/vagrant/code/econobis/bigstorage/' . config('app.APP_COOP_NAME');
        } else {
            $bigStoragePath = '/home/econobis/domains/econobis.nl/bigstorage/' . config('app.APP_COOP_NAME');
        }

        // Move storage/app directories met absolute paden
        $this->moveToNewStructure(storage_path('app/administrations'), $bigStoragePath . '/app/administrations', $proef);
        $this->moveToNewStructure(storage_path('app/documents'), $bigStoragePath . '/app/documents', $proef);
        $this->moveToNewStructure(storage_path('app/mails'), $bigStoragePath . '/app/mails', $proef);

        $commandRun->end_at = Carbon::now();
        if($this->hasErrors === false){
            $commandRun->finished = true;
        }
        $commandRun->save();

        Log::info("Verplaatsen van storage/app bestanden voltooid!");
    }

    private function moveToNewStructure($oldRoot, $newRoot, $proef): void
    {
        // Voeg proef controle toe
        if ($proef) {
            Log::info("Proef: zou verplaatsen van {$oldRoot} naar {$newRoot}");
//            return;
        }

        // Controleer of de oude root-map bestaat
        if (!is_dir($oldRoot)) {
            Log::error("Oude root-map bestaat niet: {$oldRoot}");
            $this->hasErrors = true;
            return;
        }

        try {
            // Zorg dat de doelmap bestaat
            if (!is_dir($newRoot)) {
                if (!$proef) {
                    mkdir($newRoot, 0755, true);
                    Log::info("Nieuwe directory aangemaakt: {$newRoot}");
                } else {
                    Log::info("Proef: zou directory aanmaken: {$newRoot}");
                }
            }

            // Recursief kopiëren
            $files = File::allFiles($oldRoot);
            foreach ($files as $file) {
                $relativePath = $file->getRelativePathname();
                $newPath = $newRoot . '/' . $relativePath;

                $newDirPath = dirname($newPath);
                if (!is_dir($newDirPath)) {
                    if (!$proef) {
                        mkdir(dirname($newPath), 0755, true);
                        Log::info("Directory aangemaakt: {$newDirPath}");
                    } else {
                        Log::info("Proef: zou directory aanmaken: {$newDirPath}");
                    }
                }

                if (!$proef) {
                    copy($file->getRealPath(), $newPath);
                    unlink($file->getRealPath());
                    Log::info("Bestand verplaatst: {$file->getRealPath()} -> {$newPath}");
                } else {
                    Log::info("Proef: zou bestand verplaatsen: {$file->getRealPath()} -> {$newPath}");
                }

            }

            Log::info("Bestanden succesvol gekopieerd van {$oldRoot} naar {$newRoot}");

            // Optioneel: bronmap verwijderen
//            File::deleteDirectory($oldRoot);

        } catch (\Exception $e) {
            Log::error("Fout bij het kopiëren van {$oldRoot} naar {$newRoot}: " . $e->getMessage());
            $this->hasErrors = true;
        }

        // Controleer of de oude directory leeg is en verwijder deze
        if (!$proef && is_dir($oldRoot)) {
            $this->safeDeleteDirectory($oldRoot);
            Log::info("Bronmap verwijderd: {$oldRoot}");
        } elseif ($proef) {
            Log::info("Proef: zou bronmap verwijderen: {$oldRoot}");
        }
    }

    private function safeDeleteDirectory(string $path): void
    {
        $files = array_diff(scandir($path), ['.', '..']);
        foreach ($files as $file) {
            $filePath = $path . '/' . $file;
            if (is_dir($filePath)) {
                $this->safeDeleteDirectory($filePath); // Recursief verwijderen
            } else {
                unlink($filePath);
            }
        }
        rmdir($path); // Verwijder de lege map
    }
}

