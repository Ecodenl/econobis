<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Administration\Administration;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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

        // Move storage/app directories met absolute paden
        $this->moveToNewStructure(storage_path('app/administrations'), base_path('bigstorage/' . env('APP_COOP_NAME') . '/app/administrations'), $proef);
        $this->moveToNewStructure(storage_path('app/documents'), base_path('bigstorage/' . env('APP_COOP_NAME') . '/app/documents'), $proef);
        $this->moveToNewStructure(storage_path('app/mails'), base_path('bigstorage/' . env('APP_COOP_NAME') . '/app/mails'), $proef);

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
            return;
        }

        // Controleer of de oude root-map bestaat
        if (!is_dir($oldRoot)) {
            Log::error("Oude root-map bestaat niet: {$oldRoot}");
            $this->hasErrors = true;
            return;
        }

        try {
            // Zorg dat de doelmap niet al bestaat
            if (is_dir($newRoot)) {
                throw new \Exception("Doelmap bestaat al: {$newRoot}");
            }

            // Zorg dat de parent-directory van de doelmap bestaat
            $newDirPath = dirname($newRoot);
            if (!is_dir($newDirPath)) {
                mkdir($newDirPath, 0755, true); // Recursief mappen aanmaken
                Log::info("Nieuwe directory aangemaakt: {$newDirPath}");
            }

            // Verplaats het directory
            rename($oldRoot, $newRoot);

            Log::info("Bestanden succesvol verplaatst van {$oldRoot} naar {$newRoot}");
        } catch (\Exception $e) {
            Log::error("Fout bij het verplaatsen van {$oldRoot} naar {$newRoot}: " . $e->getMessage());
            $this->hasErrors = true;
        }

        // Controleer of de oude directory leeg is en verwijder deze
        if (is_dir($oldRoot)) {
            $files = array_diff(scandir($oldRoot), ['.', '..']);
            if (empty($files)) {
                rmdir($oldRoot);
                Log::info("Lege storage/app directory verwijderd: {$oldRoot}");
            } else {
                Log::warning("Oude directory niet leeg na poging tot verplaatsen: {$oldRoot}");
            }
        }

    }


}

