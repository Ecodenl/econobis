<?php

namespace App\Console\Commands\Imports;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class updateEnvFileWithNewField extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'env:updateEnvFileWithNewField';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Voegt een nieuw veld toe aan .env-bestanden als deze nog niet bestaat.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $key = 'OAUTH_CLIENT_KEY';
        $clientId = env('OAUTH_CLIENT_ID', 2);
        $value = DB::table('oauth_clients')->where('id', $clientId)->value('secret');

        if (empty($value)) {
            $this->error("Geen secret gevonden voor OAUTH_CLIENT_ID={$clientId}");
            Log::error("Geen secret gevonden voor OAUTH_CLIENT_ID={$clientId}");
            return self::SUCCESS;
        }

        $envFiles = $this->resolveEnvFiles();

        if (empty($envFiles)) {
            $this->error('Geen .env-bestanden gevonden om bij te werken.');
            Log::error('Geen .env-bestanden gevonden om bij te werken.');
            return self::SUCCESS;
        }

        foreach ($envFiles as $envFile) {
            $this->info("Verwerken van: $envFile");
            Log::info("Verwerken van: $envFile");

            $envContent = File::get($envFile);

            if (!str_contains($envContent, "$key=")) {
                // Voeg de nieuwe key toe, veilig gequote
                $envContent .= "\n{$key}=\"{$value}\"\n";
                File::put($envFile, $envContent);

                $this->info("Toegevoegd: {$key} aan {$envFile}");
                Log::info("Toegevoegd: {$key} aan {$envFile}");
            } else {
                $this->info("Key {$key} bestaat al in {$envFile}");
                Log::info("Key {$key} bestaat al in {$envFile}");
            }
        }

        $this->info('.env-bestand(en) bijgewerkt!');
        Log::info('.env-bestand(en) bijgewerkt!');
        return self::SUCCESS;
    }

    /**
     * Resolveert het pad naar .env-bestanden op basis van de omgeving.
     */
    protected function resolveEnvFiles(): array
    {
        if (env('APP_ENV') === 'local') {
            return [base_path('.env')];
        }

        $coopName = env('APP_COOP_NAME');
        if (!$coopName) {
            $this->error('APP_COOP_NAME ontbreekt in de omgeving. Kan geen pad bepalen.');
            Log::error('APP_COOP_NAME ontbreekt in de omgeving. Kan geen pad bepalen.');
            return [];
        }

        $sharedEnvPath = "/home/econobis/domains/econobis.nl/code/{$coopName}/shared/.env";

        return File::exists($sharedEnvPath) ? [$sharedEnvPath] : [];
    }
}
