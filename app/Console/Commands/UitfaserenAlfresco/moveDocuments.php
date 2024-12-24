<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Document\Document;
use App\Eco\Schedule\CommandRun;
use App\Helpers\Alfresco\AlfrescoHelper;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class moveDocuments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uitfaserenAlfresco:moveDocuments';
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

        $this->moveDocumentFromAlfresco();

        $commandRun->end_at = Carbon::now();
        if($this->hasErrors === false){
            $commandRun->finished = true;
        }
        $commandRun->save();

    }

    private function moveDocumentFromAlfresco(): void
    {
        // Haal alle documents op
        $documents = Document::all();

        foreach ($documents as $document) {
            if($document->file_path_and_name == null && $document->alfresco_node_id != null ) {
                Log::info("Verplaatst document van Alfresco naar Storage map: {$document->id}");

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
                    $this->hasErrors = true;                }

            } elseif ($document->alfresco_node_id == null) {
//                Log::error("Document content niet gevonden!");
//                $this->hasErrors = true;
            } else {
                Log::info("Document reeds verplaatst");
            }
        }

    }


}

