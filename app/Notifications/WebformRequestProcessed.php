<?php

namespace App\Notifications;

use App\Eco\Webform\Webform;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class WebformRequestProcessed extends Notification
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
                    ->subject('Webformulier log')
                    ->greeting('Webformulier log');

        $webformName = $this->webform ? $this->webform->name : 'Onbekend webformulier';
        if($this->success) $mail->line('Er is een aanroep naar webformulier ' . $webformName . ' succesvol verwerkt.');
        else $mail->line('Een aanroep naar webformulier ' . $webformName . ' kon niet worden verwerkt.');

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
