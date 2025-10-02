<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class UserTemporarilyBlocked extends Notification
{
    use Queueable;

    protected Carbon $blockedUntil;

    public function __construct(Carbon $blockedUntil)
    {
        $this->blockedUntil = $blockedUntil;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Tijdelijke blokkade van jouw account')
            ->greeting('Beste '.$notifiable->fullNameFnF.',')
            ->line('Jouw account is tijdelijk geblokkeerd wegens meerdere mislukte inlogpogingen.')
            ->line('Je kunt opnieuw proberen in te loggen vanaf: **'.$this->blockedUntil->locale('nl_NL')->isoFormat('dddd D MMMM YYYY HH:mm').'**.')
            ->line('Als je deze pogingen niet zelf heeft gedaan, raden wij je aan om na afloop direct jouw wachtwoord te wijzigen.');
    }
}
