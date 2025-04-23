<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\File;

return new class extends Migration {
    public function up(): void
    {
        $oldPrivate = storage_path('oauth-private.key');
        $oldPublic = storage_path('oauth-public.key');

        $newDir = base_path('secrets/oauth');
        $newPrivate = $newDir . '/oauth-private.key';
        $newPublic = $newDir . '/oauth-public.key';

        // Check if migration is needed
        if (!File::exists($oldPrivate) || !File::exists($oldPublic)) {
            info('[Passport Key Migration] Old keys not found, skipping.');
            return;
        }

        if (!File::isDirectory($newDir)) {
            File::makeDirectory($newDir, 0700, true);
            info('[Passport Key Migration] Created new secrets directory.');
        }

        File::move($oldPrivate, $newPrivate);
        File::move($oldPublic, $newPublic);

        info('[Passport Key Migration] Passport keys moved successfully.');
    }

    public function down(): void
    {
        // Leeg laten of eventueel rollback implementeren (optioneel)
    }
};
