<?php

use App\Eco\Document\Document;
use App\Helpers\Alfresco\AlfrescoHelper;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Haal alle documents op
        $documents = Document::all();

        foreach ($documents as $document) {
            if($document->file_path_and_name == null && $document->alfresco_node_id != null ) {
                Log::info("Verplaatst document van Alfresco naar Storage map: {$document->id}");
                $this->moveDocument($document);
            } elseif ($document->alfresco_node_id == null) {
//                Log::error("Document content niet gevonden!");
            } else {
                Log::info("Document reeds verplaatst");
            }
        }

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
    private function moveDocument($document): void
    {
        Log::info("Start met het verplaatsen van document...");

        // ophalen document uit Alfresco
        try {
            \DB::transaction(function () use ($document) {

                $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                $documentContent =  $alfrescoHelper->downloadFile($document->alfresco_node_id);

                $uniqueName = Str::random(40) . '.' . pathinfo($document->filename, PATHINFO_EXTENSION);;
                $filePathAndName = "{$document->document_group}/" .
                    Carbon::parse($document->created_at)->year .
                    "/{$uniqueName}";
                Storage::disk('documents')->put($filePathAndName, $documentContent);

                $document->file_path_and_name = $filePathAndName;
                $document->save();

//                if(\Config::get('app.ALFRESCO_COOP_USERNAME') != 'local') {
//                    $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//                    $alfrescoHelper->deleteFile($document->alfresco_node_id);
//                }

                Log::info("Verplaatsen van bestand {$document->filename} voltooid! Filepath and name: {$filePathAndName}" );
            });

        } catch (\Exception $e) {
            Log::error("Fout bij het verplaatsen van document {$document->id}: " . $e->getMessage());
        }


    }

};
