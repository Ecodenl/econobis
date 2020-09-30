<?php

namespace App\Notifications;

use Config;
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
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
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
            ->line("Er is een account voor je aangemaakt op de Econobis-omgeving van jouw organisatie. Dit account bestaat uit:")
            ->line("<ul>")
            ->line("<li><p>Gebruikersnaam: je e-mailadres</p></li>")
            ->line("<li><p>Wachtwoord: nog in te stellen</p></li>")
            ->line("</ul>")
            ->line("Je gebruikersnaam is het e-mailadres waarop je dit bericht hebt ontvangen. Dit kan je niet aanpassen.")
            ->line("Voordat je met Econobis kunt gaan werken, moet je een wachtwoord aanmaken.")
            ->line("Klik op de knop om je wachtwoord in te stellen.")
            ->action('Stel wachtwoord in', url('/#/wachtwoord-wijzig', [$this->token, $this->email]))
            ->line('Nadat je succesvol je wachtwoord hebt ingesteld, ontvang je van ons een e-mail ter bevestiging.')
            ->line('De link om je wachtwoord opnieuw in te stellen is maar ' . Config::get('auth.passwords.users.expire'). ' minuten geldig en kan maar één keer worden gebruikt. Als je link verlopen is, vraag dan een nieuwe aan. Als je meerdere keren een link hebt aangevraagd, gebruik dan de link in de meest recente e-mail.');
    }

}