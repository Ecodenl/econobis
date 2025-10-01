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
            ->subject('Uw account is geblokkeerd')
            ->greeting('Beste '.$notifiable->fullNameFnF.',')
            ->line('Uw account is permanent geblokkeerd wegens herhaaldelijk mislukte inlogpogingen.')
            ->line('Neem contact op met onze supportafdeling om uw account opnieuw te laten activeren.');
    }
}
