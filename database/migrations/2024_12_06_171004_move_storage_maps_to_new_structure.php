<?php

use App\Eco\Administration\Administration;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Code hier plakken
        $this->moveLogosToNewStructure();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Log::warning("Het terugdraaien van deze migratie is niet geïmplementeerd.");
    }

    /**
     * @return void
     */
    private function moveLogosToNewStructure(): void
    {
        Log::info("Start met het verplaatsen van logo's...");

        // Definieer de absolute paden
        $oldRoot = storage_path('app/administrations');
        $newRoot = storage_path('app-intern/administration-logos');

        // Controleer of de oude root-map bestaat
        if (!is_dir($oldRoot)) {
            Log::warning("Oude root-map bestaat niet: {$oldRoot}");
            return;
        }

        // Haal alle administraties op
        $administrations = Administration::all();

        foreach ($administrations as $administration) {
            Log::info("Verplaatst logo's voor administratie ID: {$administration->id}");

            // Bepaal het relatieve pad
            $logosPath = 'administration_' . $administration->id . '/logos';

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

};
