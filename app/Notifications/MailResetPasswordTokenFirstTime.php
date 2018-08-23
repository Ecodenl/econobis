<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MailResetPasswordTokenFirstTime extends Notification
{
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Welkom bij Econobis")
            ->greeting("Hallo! Welkom bij Econobis")
            ->line("Er is een account voor je aangemaakt op de Econobis-omgving van jouw organisatie. Dit account bestaat uit:")
            ->line("<ul>")
            ->line("<li><p>Gebruikersnaam: je e-mailadres</p></li>")
            ->line("<li><p>Wachtwoord: nog in te stellen</p></li>")
            ->line("</ul>")
            ->line("Je gebruikersnaam is het e-mailadres waarop je dit bericht hebt ontvangen. Dit kan je niet aanpassen.")
            ->line("Voordat je met Econobis kunt gaan werken, moet je een wachtwoord aanmaken.")
            ->line("Klik op de knop om je wachtwoord in te stellen.")
            ->action('Stel wachtwoord in', url('/#/wachtwoord-wijzig', $this->token))
            ->line('Nadat je succesvol je wachtwoord hebt ingesteld, ontvang je van ons een e-mail ter bevestiging.');
    }

}