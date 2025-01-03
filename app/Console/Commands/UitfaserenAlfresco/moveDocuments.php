<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Document\Document;
use App\Eco\Schedule\CommandRun;
use App\Helpers\Alfresco\AlfrescoHelper;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class moveDocuments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uitfaserenAlfresco:moveDocuments  {--deleteAlfresco=false}';
    protected $mailTo = 'wim.mosman@xaris.nl';
    protected bool $doDelete = false;
    protected bool $hasErrors = false;
    protected $errors = [];
    protected $description = 'Move documents from Alfreso to Bigstorage';

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
        // met of zonder delete?
        $this->doDelete = $this->option('deleteAlfresco') == 'true';
        Log::info('Start ' . $this->description . ($this->doDelete ? ' MET DELETE!' : '') );

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
        // geen errors bij moven, en doDelete
        if($this->hasErrors === false && $this->doDelete){
            $this->deleteDocumentFromAlfresco();
        }

        $commandRun->end_at = Carbon::now();
        if($this->hasErrors === false){
            $commandRun->finished = true;
        }
        $commandRun->save();

        if($this->hasErrors === true){
            $this->sendMail();
            Log::info('Fouten bij verplaatsen documenten, mail gestuurd');
        }

        Log::info('Einde ' . $this->description . ($this->doDelete ? ' MET DELETE!' : '') );
    }

    private function moveDocumentFromAlfresco(): void
    {
        // Haal alle documents op waar file_path_and_name nog null is en alfresco_node_id is niet null
        $documents = Document::whereNull('file_path_and_name')
            ->whereNotNull('alfresco_node_id')
            ->get();

        foreach ($documents as $document) {
            Log::info("Kopieren document uit Alfresco naar Storage map voor document: {$document->id}");

            // ophalen document uit Alfresco
            try {
                \DB::transaction(function () use ($document) {

                    $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                    $documentContent =  $alfrescoHelper->downloadFile($document->alfresco_node_id);

                    // Controleer op fouten in de response
                    $decodedContent = json_decode($documentContent, true);
                    if (json_last_error() === JSON_ERROR_NONE && isset($decodedContent['error'])) {
                        $briefSummary = $decodedContent['error']['briefSummary'] ?? 'Onbekende fout';
                        throw new \Exception("Alfresco error: {$briefSummary}");
                    }

                    $uniqueName = Str::random(40) . '.' . pathinfo($document->filename, PATHINFO_EXTENSION);;
                    $filePathAndName = "{$document->document_group}/" .
                        Carbon::parse($document->created_at)->year .
                        "/{$uniqueName}";
                    Storage::disk('documents')->put($filePathAndName, $documentContent);

                    $document->file_path_and_name = $filePathAndName;
                    $document->save();

                    Log::info("Kopieren van bestand {$document->filename} voltooid! Filepath and name: {$filePathAndName}" );
                });

            } catch (\Exception $e) {
                Log::error("Fout bij het Kopieren van document {$document->id}: " . $e->getMessage());
                $this->errors[] = "Fout bij het Kopieren van document {$document->id}: " . $e->getMessage();
                $this->hasErrors = true;
            }
        }

    }
    private function deleteDocumentFromAlfresco(): void
    {
        // Haal alle documents op waar file_path_and_name niet null is en alfresco_node_id is ook niet null
        $documents = Document::whereNotNull('file_path_and_name')
            ->whereNotNull('alfresco_node_id')
            ->where('alfresco_node_id', 'NOT LIKE', 'Removed:%')
            ->get();

        foreach ($documents as $document) {
            Log::info("Verwijder document uit Alfresco voor document: {$document->id}");

            // ophalen document uit Alfresco
            try {
                \DB::transaction(function () use ($document) {

                    $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
                    $documentContent = $alfrescoHelper->deleteFile($document->alfresco_node_id);
//                    Log::info('response');
//                    Log::info($documentContent);


                    // Controleer op fouten in de response
                    if (!isset($documentContent['succes']) || $documentContent['succes'] != true) {
                        $briefSummary = $documentContent['message'] ?? 'Onbekende fout';
                        throw new \Exception("Alfresco error: {$briefSummary}");
                    }

                    $document->alfresco_node_id = 'Removed: ' . $document->alfresco_node_id;
                    $document->save();

                    Log::info("Verwijderen van bestand {$document->filename} voltooid! Alfresco: {$document->alfresco_node_id}" );
                });

            } catch (\Exception $e) {
                Log::error("Fout bij het verwijderen van document uit Alfresco {$document->id}: " . $e->getMessage());
                $this->errors[] = "Fout bij het verwijderen van document uit Alfresco {$document->id}: " . $e->getMessage();
                $this->hasErrors = true;
            }
        }

    }

    private function sendMail()
    {
        $subject = $this->description . ' (' . count($this->errors) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $errorsHtml = "";
        if($this->doDelete){
            $errorsHtml .= "<p>MET DELETE!</p>";
        }

        foreach($this->errors as $error) {
            $errorsHtml .= "<p>" . $error . "</p>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>.$subject.</title></head><body><p>'. $subject . '</p>' . $errorsHtml . '</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}