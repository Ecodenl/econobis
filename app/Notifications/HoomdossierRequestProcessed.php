<?php

namespace App\Notifications;

use App\Eco\Webform\Webform;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class HoomdossierRequestProcessed extends Notification
{
    use Queueable;

    protected $log;
    protected $success;
    protected $webform;
    protected $data;

    public function __construct(array $log, array $data, bool $success, Webform $webform)
    {
        $this->log = $log;
        $this->success = $success;
        $this->webform = $webform;
        $this->data = $data;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->subject('Hoomdossier api log')
            ->greeting(" ")
            ->line('<p style="text-align:center">
            <a href="' . config('app.url') . '" style="box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; position: relative; color: #3d4852; font-size: 19px; font-weight: bold; text-decoration: none; display: inline-block;" target="_blank">
' . config('app.name')  . '</a></p>')
            ->line("<h1>Webformulier log</h1>");

        $webformName = $this->webform ? $this->webform->name : 'Onbekend endpoint';
        if($this->success) $mail->line('Er is een aanroep naar endpoint ' . $webformName . ' succesvol verwerkt.');
        else $mail->line('Een aanroep naar endpoint ' . $webformName . ' kon niet worden verwerkt.');

        $mail->line('&nbsp;');
        $mail->line('Aangeleverde data:');
        foreach ($this->data as $key => $value) {
            $mail->line($key . ": " . $value);
        }
        $mail->line('&nbsp;');
        $mail->line('Log:');
        foreach ($this->log as $item) {
            $mail->line($item);
        }
        $mail->line('&nbsp;');

        return $mail;
    }
}
