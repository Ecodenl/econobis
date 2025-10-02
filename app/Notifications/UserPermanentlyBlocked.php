<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserPermanentlyBlocked extends Notification
{
    use Queueable;

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Jouw account is geblokkeerd')
            ->greeting('Beste '.$notifiable->fullNameFnF.',')
            ->line('Jouw account is permanent geblokkeerd wegens herhaaldelijk mislukte inlogpogingen.')
            ->line('Vraag je beheerder om jouw account te herstellen in Econobis.');
    }
}
