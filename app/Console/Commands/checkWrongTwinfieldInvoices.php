<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use App\Http\Resources\Email\Templates\GenericMailWithoutAttachment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class checkWrongTwinfieldInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:checkWrongTwinfieldInvoices';
    protected $mailTo = 'wim.mosman@xaris.nl';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'check for wrong Twinfield invoices';

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
        Log::info('Procedure check op ongeldige twinfield nota\'s gestart');

        $wrongTwinfieldInvoices = Invoice::whereNull('twinfield_number')->where('status_id', 'exported')->orderBy('id')->get();

        if(!$wrongTwinfieldInvoices->isEmpty()) {
            $this->sendMail($wrongTwinfieldInvoices);
            Log::info('Ongeldige twinfield nota\'s gevonden, mail gestuurd');
        } else {
            Log::info('Geen ongeldige twinfield nota\'s gevonden');
        }

        Log::info('Procedure check op ongeldige twinfield nota\'s klaar');
    }

    private function sendMail($wrongTwinfieldInvoices)
    {
        $subject = 'Ongeldige twinfield nota\'s gevonden ! (' . count($wrongTwinfieldInvoices) . ') - ' . \Config::get('app.APP_COOP_NAME');

        $wrongTwinfieldInvoicesHtml = "";
        foreach($wrongTwinfieldInvoices as $wrongTwinfieldInvoice) {
            $wrongTwinfieldInvoicesHtml .=
                "<p>ID: " . $wrongTwinfieldInvoice->id . ", " .
                "Nota nummer: " . $wrongTwinfieldInvoice->invoice_number . ", " .
                "Nummer: " . $wrongTwinfieldInvoice->number . ", " .
                "Nota status: " . $wrongTwinfieldInvoice->status_id . "</p>";
        }

        $mail = Mail::to($this->mailTo);
        $htmlBody = '<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html;charset=UTF-8"/><title>'.$subject.'</title></head><body><p>'.$subject.'</p>' . $wrongTwinfieldInvoicesHtml .'</body></html>';

        $mail->subject = $subject;
        $mail->html_body = $htmlBody;

        $mail->send(new GenericMailWithoutAttachment($mail, $htmlBody));
    }
}
